const express = require('express');
const app = express();
const instagram = require('instagram-node');

// API Authentication route
app.use('/:tag', function (req, res, next) {
  let token = req.query.access_token;
  console.log(req.query);

  if (!token) {
    let err = new Error();
    err.status = 403;
    err.message = 'Missing api credentials';
    return next(err);
  }

  res.locals.auth = {access_token: token};
  res.locals.tag = req.params.tag || 'pokemon';
  next();
});

app.use(apiRoute);

function apiRoute(req, res, next) {
  let ig = instagram.instagram();

  // Authenticate client
  ig.use(res.locals.auth);

  ig.tag_media_recent(res.locals.tag, (err, result, pagination, remaining, limit) => {
    if (err) {
      return next(err);
    }

    if (pagination.next) {
      pagination.next(apiRoute);
    }

    return res.json(result);
  });
}

module.exports = app;
