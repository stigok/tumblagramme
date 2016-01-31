const express = require('express');
const router = new express.Router();
const instagram = require('instagram-node');

router.use(function (req, res, next) {
  res.locals.client = instagram.instagram();
  res.locals.client.use({access_token: req.user.instagram.accessToken});
  return next();
});

// API Authentication route
router.get('/media/tag/:tag', function (req, res, next) {
  if (!req.params.tag) {
    return next(new Error('Missing params'));
  }

  let options = {};
  if (req.query.max_tag_id) {
    options.max_tag_id = req.query.max_tag_id;
  }

  res.locals.client.tag_media_recent(req.params.tag, options, function (err, result) {
    if (err) {
      return next(err);
    }
    return res.json(result);
  });
});

router.get('/media/user/:userId', function (req, res, next) {
  if (!req.params.userId) {
    return next(new Error('Missing argument'));
  }

  res.locals.client.user_media_recent(req.params.userId, {}, function (err, result) {
    if (err) {
      return next(err);
    }
    return res.json(result);
  });
});

// Like an Instagram resource
router.post('/likeMedia', function (req, res, next) {
  res.locals.client.add_like(req.body.mediaId, function (err) {
    if (err) {
      return next(err);
    }
    return res.status(200).end();
  });
});

router.use(require('./errorHandler'));

module.exports = router;
