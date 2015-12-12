const express = require('express');
const router = new express.Router();
const instagram = require('instagram-node');
const settings = require('../../settings.json');

const testData = require('../../data/media-recent.json');

router.use(function (req, res, next) {
  res.locals.client = instagram.instagram();
  res.locals.client.use({access_token: settings.instagram.accounts[0].accessToken})
  return next();
});

// API Authentication route
router.use('/media/recent/:tag', function (req, res, next) {
  // DEBUG MODE
  return res.json(testData.data);

  let token = req.query.accessToken;
  let tag = req.params.tag;
  let ig = instagram.instagram();

  if (!token) {
    let err = new Error();
    err.status = 403;
    err.message = 'Missing api credentials';
    return next(err);
  }

  if (!tag) {
    return next(new Error('Missing params'));
  }

  ig.use({access_token: token});

  let options = {};
  if (req.query.max_tag_id) {
    options.max_tag_id = req.query.max_tag_id;
  }

  ig.tag_media_recent(tag, options, function (err, result, pagination, remaining, limit) {
    if (err) {
      return next(err);
    }
    return res.json(result);
  });
});

// Like an Instagram resource
router.post('/like', function (req, res, next) {
  res.locals.client.add_like(req.body.id, function (err) {
    if (err) {
      return next(err);
    }
    return res.status(200).json({});
  });
});

router.use(require('./errorHandler'));

module.exports = router;
