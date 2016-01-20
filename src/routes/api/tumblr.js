const express = require('express');
const router = new express.Router();
const tumblr = require('tumblr.js');
const settings = require('../../../settings.json');
const History = require('../../models/history');

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
  res.locals.client.photo(req.query.blog, req.body, function (err, data) {
    if (err) {
      return next(err);
    }

    // Save history for this call
    let history = new History({
      userId: req.user._id,
      blogName: req.query.blog,
      instagramMediaId: req.body.mediaId,
      tumblrMediaId: data.id
    });
    history.save(function (err) {
      if (err) {
        console.error(err);
      }

      return res.status(200).end();
    });
  });
});

router.delete('/history/rollback/:id', function (req, res, next) {
  // Lookup ID in the history db
  History.findOneAndRemove({_id: req.params.id, userId: req.user._id}, function (err, obj) {
    if (err) {
      return next(err);
    }
    if (obj === null) {
      return res.status(404).end();
    }
    // Delete post from Tumblr whether it's published, queued, draft or whatever
    res.locals.client.deletePost(obj.blogName, obj.tumblrMediaId, function (err) {
      if (err) {
        return next(err);
      }
      return res.status(200).end();
    });
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
  return res.status(500).json(err).end();
});

module.exports = router;
