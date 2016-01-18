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
router.post('/:blog/post/photo', function (req, res, next) {
  res.locals.client.photo(req.params.blog, req.body.options, function (err) {
    if (err) {
      return next(err);
    }
    return res.status(200).end();
  });
});

router.get('/user', function (req, res, next) {
  res.locals.client.userInfo(function (err, response) {
    if (err) {
      return next(err);
    }
    res.status(200).json(response.user);
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

router.use(function (err, req, res, next) {
  console.error('api err', err);
  return res.json(err).end(500);
});

module.exports = router;
