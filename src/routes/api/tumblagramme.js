const express = require('express');
const router = new express.Router();
const passport = require('passport');
const User = require('../../models/user.js');
const authMiddleware = passport.authenticate('local');
const ensureAuth = require('../../../lib/ensureAuth');

router.use('/user', ensureAuth.local, require('../../../lib/userRoute.js'));

// API data models
router.use('/preset', ensureAuth.local, require('./tumblagramme/preset'));
router.use('/history', ensureAuth.local, require('./tumblagramme/history'));

router.post('/activeBlog', ensureAuth.local, function (req, res, next) {
  if (req.body.name) {
    req.user.tumblr.activeBlogName = req.body.name;
    req.user.save(function (err) {
      if (err) {
        return next(err);
      }
      return res.status(200).json({});
    });
  } else {
    return next('invalid arguments');
  }
});

router.get('/ping', ensureAuth.local, function (req, res) {
  return res.status(200).json('pong');
});

router.post('/auth', authMiddleware, function (req, res) {
  // Using passport, unsuccessfull attempts are returned with a 401 (Unauthorized)
  // When auth successfull, return user object and 200 (implicit).
  return res.json(req.user);
});

router.post('/register', function (req, res) {
  User.register(new User({username: req.body.username}), req.body.password, function (err) {
    if (err) {
      console.error(err);
      return res.status(500).json('an error occured');
    }
    return res.status(200).json({});
  });
});

router.get('/logout', function (req, res) {
  req.logout();
  return res.status(200).json({});
});

router.use(function (req, res) {
  return res.status(404).json({error: 'Invalid API method'});
});

module.exports = router;
