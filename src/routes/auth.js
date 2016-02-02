const express = require('express');
const router = new express.Router();

router.get('/logout', function (req, res) {
  req.logout();
  return res.redirect('/');
});

router.get('/login', function (req, res) {
  // If user has authenticated with Instagram, send to account page
  if (req.user.instagram) {
    return res.redirect('/account');
  }

  // If user has authenticated with Tumblr, render Instagram auth page
  if (req.user) {
    return res.render('views/account/login-step2');
  }

  // If user isn't authenticated at all, render initial Tumblr auth page
  return res.render('views/account/login-step1');
});

router.use('/api/tumblr', require('./oauth/tumblr'));

router.get('/*', function (req, res, next) {
  if (!req.user) {
    return res.redirect('/login');
  }
  return next();
});

router.use('/api/instagram', require('./oauth/instagram'));

// Prevent users without Instagram auth to proceed past this middleware
router.get('/*', function (req, res, next) {
  if (!req.user.instagram) {
    return res.redirect('/login');
  }
  return next();
});

router.get('/account', function (req, res) {
  return res.render('views/account/account');
});

module.exports = router;
