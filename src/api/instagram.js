const express = require('express');
const app = express();
const instagram = require('instagram-node');

const testData = require('../../data/media-recent.json');

// API Authentication route
app.use('/:tag', function (req, res, next) {
  // DEBUG MODE
  return res.json(testData.data);

  let token = req.query.access_token;
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

module.exports = app;
