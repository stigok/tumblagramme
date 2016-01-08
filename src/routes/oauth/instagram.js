const express = require('express');
const router = new express.Router();
const OAuth2 = require('oauth').OAuth2;
const crypto = require('crypto');
const util = require('util');
const request = require('request');

const settings = require('../../../settings.json');

const appConsumerKey = settings.instagram.consumerKey;
const appConsumerSecret = settings.instagram.consumerSecret;
const callbackUrl = settings.instagram.callbackUrl;

router.get('/auth', function (req, res) {
  console.log('getOAuthAccessToken');

  // Save generated tokens to session
  req.session.instagramCsrf = crypto.randomBytes(64).toString('hex');

  let params = [
    'client_id=' + appConsumerKey,
    'redirect_uri=' + callbackUrl,
    'response_type=code',
    'state=' + req.session.instagramCsrf
  ];
  let authUrl = util.format('https://api.instagram.com/oauth/authorize?%s', params.join('&'));

  return res.send(util.format('<a href="%s">%s</a>', authUrl, authUrl));
});

router.get('/callback', function (req, res, next) {
  console.log('Received callback', req.query);
  console.log('\tCSRF token ours vs theirs', req.session.instagramCsrf, req.query.state);

  if (!req.session.instagramCsrf || !req.query.state) {
    console.error('\tError: Missing session information');
    return next('No previous session info found');
  }

  console.log('getOAuthAccessToken');
  let postParams = {
    client_id: appConsumerKey,
    client_secret: appConsumerSecret,
    grant_type: 'authorization_code',
    redirect_uri: callbackUrl,
    code: req.query.code
  };

  console.log(postParams);

  request.post({
    url: 'https://api.instagram.com/oauth/access_token',
    formData: postParams
  }, function (err, httpResponse, body) {
    if (err) {
      return res.send('Failed to authorize', err);
    }

    req.user.instagram.accessToken = body.access_token;
    req.user.save();

    return res.json(body);
  });
});

module.exports = router;
