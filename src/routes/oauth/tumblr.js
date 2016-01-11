const express = require('express');
const router = new express.Router();
const OAuth = require('oauth').OAuth;

const settings = require('../../../settings.json');

const appConsumerKey = settings.tumblr.consumerKey;
const appConsumerSecret = settings.tumblr.consumerSecret;
const callbackUrl = settings.tumblr.callbackUrl;

// Tumblr endpoints
const authorizeUrl = 'https://www.tumblr.com/oauth/authorize';
const requestTokenUrl = 'https://www.tumblr.com/oauth/request_token';
const accessTokenUrl = 'https://www.tumblr.com/oauth/access_token';

// OAuth(requestTokenUrl, accessTokenUrl, consumerKey, consumerSecret, OAuthVersion, callbackUrl, digest)
const oa = new OAuth(
  requestTokenUrl,
  accessTokenUrl,
  appConsumerKey,
  appConsumerSecret,
  '1.0A',
  callbackUrl,
  'HMAC-SHA1'
);

router.get('/auth', function (req, res, next) {
  console.log('getOAuthRequestToken');
  oa.getOAuthRequestToken(function (err, token, secret) {
    if (err) {
      console.error('\tFailed with error', err);
      return next(err);
    }
    console.log('\ttoken %s | secret %s', token, secret);

    // Save generated tokens to session
    req.session.requestToken = token;
    req.session.requestTokenSecret = secret;

    let authUrl = authorizeUrl + '?oauth_token=' + token;

    console.log('Direct client to authUrl');
    console.log('\t' + authUrl);
    console.log('\t... waiting for callback');

    return res.redirect(authUrl);
  });
});

router.get('/callback', function (req, res, next) {
  console.log('Received callback');
  console.log('\toauth_token %s | oauth_verifier %s', req.query.oauth_token, req.query.oauth_verifier);
  console.log('\tsession token %s | session secret %s', req.session.requestToken, req.session.requestTokenSecret);

  if (!req.session.requestToken || !req.session.requestTokenSecret) {
    console.error('\tError: Missing session information');
    return next('No previous session info found');
  }

  console.log('getOAuthAccessToken');

  oa.getOAuthAccessToken(
    req.query.oauth_token,
    req.session.requestTokenSecret,
    req.query.oauth_verifier,
    function (err, token, secret, other) {
      if (err) {
        console.error('\tValidation failed with error', err);
        return next('getOAuthAccessToken failed');
      }
      console.log('\ttoken %s | secret %s', token, secret);
      console.log('other', other);

      req.user.tumblr.token = token;
      req.user.tumblr.secret = secret;

      req.user.save(function (err) {
        if (err) {
          return next('Error saving tumblr token', err);
        }
        return res.redirect('/account');
      });
    }
  );
});

module.exports = router;
