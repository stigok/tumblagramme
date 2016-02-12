const express = require('express');
const router = new express.Router();

router.use(function (req, res, next) {
  // req.user is an object representing the user model fetched from the database by passport auth middleware
  // to simplify things and keeping a minimal res.locals.user object, create a custom one here
  res.locals.user = {};

  if (!req.user || !req.user.tumblr.profile) {
    // Not authenticated
    return next();
  }

  // Set tumblr profile data
  res.locals.user.tumblr = req.user.tumblr.profile;

  if (!req.user.instagram.profile) {
    // Instagram not authenticated
    return next();
  }

  // Set Instagram profile data;
  res.locals.user.instagram = req.user.instagram.profile;
  return next();
});

router.get('/logout', function (req, res) {
  req.logout();
  return res.redirect('/');
});

router.get('/login', function (req, res) {
  // If user has authenticated with both Instagram and Tumblr
  if (res.locals.user.tumblr && res.locals.user.instagram) {
    return res.redirect('/account');
  }

  // If user has authenticated only with Tumblr, render Instagram auth page
  if (res.locals.user.tumblr) {
    return res.render('views/account/login-step2');
  }

  // If user isn't authenticated at all, render initial Tumblr auth page
  return res.render('views/account/login-step1');
});

router.use('/api/tumblr', require('./oauth/tumblr'));

// Protect all routes beyond this point
router.use(function (req, res, next) {
  if (!res.locals.user.tumblr) {
    return res.redirect('/login');
  }
  return next();
});

router.use('/api/instagram', require('./oauth/instagram'));

router.use(function (req, res, next) {
  if (!res.locals.user.instagram) {
    return res.redirect('/login');
  }
  return next();
});

router.get('/account', function (req, res) {
  return res.render('views/account/account');
});

module.exports = router;
