const express = require('express');
const router = new express.Router();
const passport = require('passport');
// const settings = require('../../../settings.json');

router.get('/auth', passport.authenticate('tumblr'));

router.get('/callback',
  passport.authenticate('tumblr', {failureRedirect: '/login?from=tumblr_auth_failure'}),
  function (req, res) {
    return res.redirect('/account?from=tumblr_auth');
  }
);

module.exports = router;
