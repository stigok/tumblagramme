const express = require('express');
const router = new express.Router();
const passport = require('passport');
const User = require('../../models/user.js');
const authMiddleware = passport.authenticate('local');
const ensureLoggedIn = require('../../../lib/ensureAuth')('local');

router.get('/user', ensureLoggedIn, function (req, res) {
  res.status(200).json(req.user);
});

router.get('/ping', ensureLoggedIn, function (req, res) {
  res.status(200).json('pong');
});

router.post('/auth', authMiddleware, function (req, res) {
  // Using passport, unsuccessfull attempts are returned with a 401 (Unauthorized)
  // When auth successfull, return user object and 200.
  res.status(200).json(req.user);
});

router.post('/register', function (req, res) {
  User.register(new User({username: req.body.username}), req.body.password, function (err) {
    if (err) {
      res.status(500).json('an error occured');
      console.error(err);
      return;
    }
    res.status(200).json('user registered');
  });
});

module.exports = router;
