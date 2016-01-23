const express = require('express');
const router = new express.Router();
const ensureAuth = require('../../lib/ensureAuth');

router.get('/logout', function (req, res) {
  req.logout();
  return res.redirect('/');
});

router.get('/login', function (req, res) {
  if (req.user) {
    return res.redirect('/account');
  }
  return res.render('views/account/login');
});

router.use('/api/tumblr', require('./oauth/tumblr'));

router.get('/*', function (req, res, next) {
  if (!req.user) {
    return res.redirect('/login');
  }
  return next();
});

router.use('/api/instagram', require('./oauth/instagram'));

router.get('/account', function (req, res) {
  return res.render('views/account/account');
});

router.use(
  ensureAuth.tumblr('/login'),
  ensureAuth.instagram('/account')
);

module.exports = router;
