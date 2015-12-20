const express = require('express');
const router = new express.Router();
const User = require('../models/user.js');

router.post('/register', function (req, res, next) {
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

module.exports = router;
