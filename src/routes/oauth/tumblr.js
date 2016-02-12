const express = require('express');
const router = new express.Router();
const passport = require('passport');
// const settings = require('../../../settings.json');

router.get('/auth', passport.authenticate('tumblr'));

router.get('/callback',
  passport.authenticate('tumblr', {failureRedirect: '/login?loginSuccess=false'}),
  function (req, res) {
    return res.redirect('/login?loginSuccess=true');
  }
);

module.exports = router;
