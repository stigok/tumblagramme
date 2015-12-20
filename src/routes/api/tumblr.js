const express = require('express');
const router = new express.Router();
const tumblr = require('tumblr.js');
const settings = require('../../../settings.json');

router.use(function (req, res, next) {
  let client = tumblr.createClient({
    consumer_key:    settings.tumblr.consumerKey,
    consumer_secret: settings.tumblr.consumerSecret,
    token:           req.query.authToken,
    token_secret:    req.query.authSecret
  });

  let redirect_uri = 'http://localhost:3000/api/tumblr/auth';
  res.locals.authUrl = 'https://www.tumblr.com/oauth/authorize';
  res.locals.client = client;

  return next();
});

router.get('/auth', function (req, res) {
  //res.redirect(res.locals.authUrl);
  return res.json('auth', res.locals.authUrl);
});

router.get('/endpoint', function (req, res, next) {
  res.locals.client.authorize_user(req.query.code, res.locals.authUrl, function (err, result) {
    if (err) {
      console.log('API auth failed');
      next(err);
    }

    console.log('Yay! Access token is ' + result.access_token);
    return res.status(200).end();
  });
});

// Add a photo to queue
router.post('/queue', function (req, res, next) {
  res.locals.client.photo(req.body.blogName, req.body.post, function (err) {
    if (err) {
      return next(err);
    }
    res.status(200).json({});
  });
});

router.get('/stats', function (req, res, next) {

});

router.use(require('./errorHandler'));

module.exports = router;
