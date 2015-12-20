const express = require('express');
const router = new express.Router();
const passport = require('passport');
const User = require('../models/user.js');

router.use(function (req, res, next) {
  res.locals.user = req.user;
  res.locals.userString = JSON.stringify(req.user, null, 2);
  next();
});

router.get('/account', function (req, res) {
  return res.render('views/account/index', {
    dump: JSON.stringify({
      userDump: req.user,
      sessionDump: req.session
    }, null, 2)
  });
});

router.get('/login', function (req, res) {
  return res.render('views/account/login', {
    title: 'Login',
    action: '/login'
  });
});

router.post('/login',
  passport.authenticate('local', {failureRedirect: '/login'}),
  function (req, res) {
    res.redirect('/account');
  }
);

router.get('/register', function (req, res) {
  return res.render('views/account/login', {
    title: 'Register',
    action: '/register'
  });
});

router.post('/register', function (req, res, next) {
  console.log('User register attempt...');
  User.register(new User({username: req.body.username}), req.body.password, function (err) {
    if (err) {
      console.log('\tError while user register!', err);
      return next(err);
    }
    console.log('\tUser registered!');
    res.redirect('/account');
  });
});

router.get('/logout', function (req, res) {
  req.logout();
  res.redirect('/');
});

router.get('/', function (req, res) {
  return res.redirect('/login');
});

module.exports = router;
