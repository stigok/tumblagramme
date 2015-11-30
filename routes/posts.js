var express = require('express');
var router = express.Router();
var _ = require('underscore');
var instagram = require('instagram-node').instagram();
var util = require('util');

var quickTags = "bjj,bjjlifestyle,brazilianjiujitsu,jiujitsu,bjjgirls,martialarts".split(",");

// Map Instagram media object into custom object
var mapMedias = function (medias) {
  var posts = _.map(medias, function(el) {
    return {
      id: el.id,
      link: el.link,
      thumbnail: el.images.thumbnail.url,
      image: el.images.standard_resolution.url,
      username: el.user.username,
      userid: el.user.id
    };
  });
  var unique = [];
  for (var i = 0; i < posts.length; i++)
    if (_.where(unique, { id : posts[i].id}).length == 0)
      unique.push(posts[i]);

  console.info("zipped results from ", posts.length, " to ", unique.length);

  return unique;
}

// Set locals
router.get('/*', function(req, res, next) {
  res.locals.quickTags = quickTags;
  res.locals.imageSize = 400;

  // Setup instagram API
  res.locals.instagram = instagram.use({
    client_id: req.app.locals.instagram.clientId,
    client_secret: req.app.locals.instagram.clientSecret
  });
  // TODO: replace with local.activeAccount
  res.locals.instagram = instagram.use({ access_token: req.app.locals.instagram.accounts[0].accessToken });

  return next();
});

router.get('/test', function(req, res) {
  instagram.tag_media_recent("bjj", function(err, medias, pagination, remaining, limit) {
    res.send(util.inspect(pagination));
  });
});

router.get('/tag/:tag', function(req, res, next) {

  // Get base data
  instagram.tag_media_recent(req.params.tag, function(err, medias, pagination, remaining, limit) {
    if (err) return next(err);

    var posts = mapMedias(medias);
    res.render('posts', {
      title: "Instagram posts with tag #" + req.params.tag,
      tag: req.params.tag,
      posts: JSON.stringify(posts)
    });
  });
});

router.get('/user/:username', function(req, res, next) {

  instagram.user_search(req.params.username, function(err, users, remaining, limit) {
    if (err) return next(err);
    if (users.length == 0) return next(new Error("No usernames matched criteria"));

    var user = (users.length > 1) ? users[0] : _.first(users);

    instagram.user_media_recent(user.id, function(err, medias, pagination, remaining, limit) {
      if (err) return next(err);

      var posts = mapMedias(medias);

      res.render('posts', {
        title: "Instagram posts from user @" + user.username,
        userid: user.id,
        username: user.username,
        posts: JSON.stringify(posts)
      });
    });
  });
});

router.get('/quicktags', function(req, res, next) {

  var posts = [];

  // Make function run after being called n times
  // - Render page after all tags has been taken care of
  var done = _.after(quickTags.length, function() {
    res.render('posts', {
      title: "Instagram posts with tags matching the quick tags",
      tag: "[multitag search]",
      posts: JSON.stringify(mapMedias(posts))
    });
  });

  _.each(quickTags, function(tag) {
    instagram.tag_media_recent(tag, function(err, medias, pagination, remaining, limit) {
      if (err) return next(err);

      _.each(_.flatten(medias, true), function(m) {
        posts.push(m);
      });
      done();
    });
  });

});

module.exports = router;
