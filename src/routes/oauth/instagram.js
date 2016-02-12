const express = require('express');
const router = new express.Router();
const crypto = require('crypto');
const util = require('util');
const request = require('request');
const logger = require('winston');
const settings = require('../../../settings.json');

const appConsumerKey = settings.instagram.consumerKey;
const appConsumerSecret = settings.instagram.consumerSecret;
const callbackUrl = settings.instagram.callbackUrl;

router.get('/auth', function (req, res) {
  logger.verbose('getOAuthAccessToken');

  // Save generated tokens to session
  req.session.instagramCsrf = crypto.randomBytes(64).toString('hex');

  let params = [
    'client_id=' + appConsumerKey,
    'redirect_uri=' + callbackUrl,
    'response_type=code',
    'state=' + req.session.instagramCsrf
    // 'scope=basic+public_content+relationships+likes'
  ];
  let authUrl = util.format('https://api.instagram.com/oauth/authorize?%s', params.join('&'));

  return res.redirect(authUrl);
});

router.get('/callback', function (req, res, next) {
  logger.verbose('Received callback', req.query);
  logger.verbose('\tCSRF token ours vs theirs', req.session.instagramCsrf, req.query.state);

  if (!req.session.instagramCsrf || !req.query.state) {
    logger.error('Missing session information');
    return next('No previous session info found');
  }

  logger.verbose('getOAuthAccessToken');
  let postParams = {
    client_id: appConsumerKey,
    client_secret: appConsumerSecret,
    grant_type: 'authorization_code',
    redirect_uri: callbackUrl,
    code: req.query.code
  };

  logger.verbose('postParams', postParams);

  request.post({
    url: 'https://api.instagram.com/oauth/access_token',
    formData: postParams
  }, function (err, httpResponse, body) {
    if (err) {
      return res.send('Failed to authorize', err);
    }

    let json = JSON.parse(body);
    req.user.instagram.accessToken = json.access_token;
    req.user.instagram.profile = json.user;

    req.user.save(function (err) {
      if (err) {
        return next('Error saving instagram token', err);
      }
      return res.redirect('/login?instagramAuthSuccess=true');
    });
  });
});

module.exports = router;
