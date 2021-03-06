const express = require('express');
const router = new express.Router();
const tumblr = require('tumblr.js');
const settings = require('../../../settings.json');

// Set up API client
router.use(function (req, res, next) {
  res.locals.client = tumblr.createClient({
    consumer_key:    settings.tumblr.consumerKey,
    consumer_secret: settings.tumblr.consumerSecret,
    token:           req.user.tumblr.token,
    token_secret:    req.user.tumblr.secret
  });
  return next();
});

// Queue photo
router.post('/post/photo', function (req, res, next) {
  res.locals.client.photo(req.query.blog, req.body, function (err) {
    if (err) {
      return next(err);
    }
    return res.status(200).end();
  });
});

router.get('/blogs', function (req, res, next) {
  res.locals.client.userInfo(function (err, response) {
    if (err) {
      return next(err);
    }
    res.status(200).json(response.user.blogs);
  });
});

router.use(require('./errorHandler'));

module.exports = router;
