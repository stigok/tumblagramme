const express = require('express');
const router = new express.Router();
const tumblr = require('tumblr.js');
const settings = require('../../../settings.json');
const db = require('../../../data/mock-db.js');

// API authentication
// router.get('/auth', passport.authenticate('tumblr'));
// router.get('/callback', passport.authenticate('tumblr'), function (req, res) {
//   console.log('User %s verified with tumblr', req.user.username, req.user.oauth.tumblr.profile);
//   res.status(200).json({});
// });

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

// Add a photo to queue
router.post('/queue', function (req, res, next) {
  res.locals.client.photo(req.body.blogName, req.body.post, function (err) {
    if (err) {
      return next(err);
    }
    res.status(200).json({});
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
  return res.json(db.tumblr.blogs);

  res.locals.client.userInfo(function (err, response) {
    if (err) {
      return next(err);
    }
    res.status(200).json(response.user.blogs);
  });
});

module.exports = router;
