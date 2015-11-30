var express = require('express');
var router = express.Router();
var settings = require('../../settings.json');
var _ = require('underscore');
var superagent = require('superagent');
var instagram = require('instagram-node').instagram();

// Setups Tumblr API
var tumblrjs = require('tumblr.js');

router.all('/*', function(req, res, next) {
  //if (!req.user.tumblrAuthToken || !req.user.tumblrAuthSecret)
  //  return next(new Error("Tumblr auth token/secret undefined"));

  // Set up Tumblr client for all subsequent handlers
  res.locals.tumblr = tumblrjs.createClient({
    consumer_key:    settings.tumblr.consumerKey,
    consumer_secret: settings.tumblr.consumerSecret,
    token:           req.user.activeAccount.authToken,
    token_secret:    req.user.activeAccount.authSecret
  });

  next();
});

router.get('/', function(req, res, next) {
  var tumblr = res.locals.tumblr;

  tumblr.blogInfo(req.user.activeAccount.name, function(err, blogInfo) {
    if (err) return next(err);

    tumblr.queue(blogInfo.blog.name, function(err, queue) {
      if (err) return next(err);

      res.render('tumblr-info', {
        blog : blogInfo.blog,
        queue : queue
      });
    });
  });
});

router.get('/setActiveAccount/:accountIndex', function(req, res, next) {
  req.user.obj.activeAccountIndex = req.params.accountIndex;
  req.user.obj.save(function(err) {
    if (err) return next(err);
  });
  res.redirect(req.query.returnPath || '/');
  res.end();
});

router.get('/musicpost', function(req, res, next) {
  var tumblr = res.locals.tumblr;
  res.render('musicpost', {
    account : tumblr
  });
});

router.post('/musicpost', function(req, res, next) {

  var spotifyTrack;
  if (req.body.spotifyTrack && req.body.spotifyTrack.length > 0) {
    var trackId = _.last(req.body.spotifyTrack.split(':track:'));
    superagent.get('https://api.spotify.com/v1/tracks/' + trackId)
      .send()
      .set('Accept', 'application/json')
      .end(function(err, data) {
        // TODO: needs to wait for completion
        // waterfall shit?
        if (err) return next(err);
        spotifyTrack = data;
      })
  }

  var tumblr = res.locals.tumblr;
  var post = {
    type: "music",
    state: "queue",
    tags: req.body.tags,
    format: "markdown",
    caption: req.body.caption,
    "external_url": req.body.source,
    //link: req.body.link
  };

  tumblr.audio(req.user.activeAccount.name, post, function(err, data) {
    if (err) return next(err);
    res.send(data);
  });
});

router.post('/post', function(req, res, next) {
  var tumblr = res.locals.tumblr;
  tumblr.photo(req.user.activeAccount.name, req.body, function(err, data) {
    if (err) return next(err);
    res.send(data);
  });
});

router.post('/like', function(req, res, next) {
  instagram.use({ access_token: req.app.locals.instagram.accounts[0].accessToken });
  instagram.add_like(req.body.mediaId, function(err, remaining, limit) {
    if (err) return next(err);
    return res.status(200).send("<3 " + req.body.mediaId);
  });
})

module.exports = router;
