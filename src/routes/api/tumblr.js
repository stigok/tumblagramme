const express = require('express');
const router = new express.Router();
const tumblr = require('tumblr.js');
const settings = require('../../../settings.json');

router.use(function (req, res, next) {
  res.locals.client = tumblr.createClient({
    consumer_key:    settings.tumblr.consumerKey,
    consumer_secret: settings.tumblr.consumerSecret,
    token:           req.query.authToken,
    token_secret:    req.query.authSecret
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

router.get('/stats', function (req, res, next) {

});

router.use(require('./errorHandler'));

module.exports = router;
