var express = require('express');
var router = express.Router();
var passport = require('passport');
var Account = require('../models/account');
var connectEnsureLogin = require('connect-ensure-login');
var ensureLoggedIn = connectEnsureLogin.ensureLoggedIn;
var ensureLoggedOut = connectEnsureLogin.ensureLoggedOut;

// For every request made
router.all('*', function(req, res, next) {
  if (req.user) {
    res.locals.user = req.user;
  }
  next();
});

router.get('/', function(req, res) {
  res.render('index');
});

router.get('/account', ensureLoggedIn('/login'), function(req, res) {
  res.render('account', {
    sessionDump : JSON.stringify(req.session, null, 2),
    userDump    : JSON.stringify(res.locals.user, null, 2)
  })
})

router.post('/register', ensureLoggedOut('/account'), function(req, res, next) {

  Account.register(new Account({ username: req.body.username }), req.body.password, function(err) {
    if (err) {
      console.log('error while user register!', err);
      return next(err);
    }

    res.redirect('/');
  });

});

router.get('/register', ensureLoggedOut('/account'), function(req, res) {
  res.render('register');
});

router.get('/login', ensureLoggedOut('/'), function(req, res) {
  res.render('login');
});

router.post('/login', ensureLoggedOut('/account'), passport.authenticate('local-auth', { successReturnToOrRedirect: '/', failureRedirect: '/login' }));

router.get('/logout', function(req, res) {
  if (!req.user) {
    console.log('Hit logout without being authenticated');
  }
  req.logout();
  res.redirect('/');
});

module.exports = router;
