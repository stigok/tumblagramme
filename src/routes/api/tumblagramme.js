const express = require('express');
const router = new express.Router();
const passport = require('passport');
const authMiddleware = passport.authenticate('local');
const ensureLoggedIn = require('../../../lib/ensureAuth');

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

module.exports = router;
