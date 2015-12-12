const express = require('express');
const router = new express.Router();

// Server partial views for angular
router.use(function (req, res, next) {
  let user = {
    email: 'stig@stigok.com',
    favoriteTags: [
      {name: 'bjj'},
      {name: 'martialarts'},
      {name: 'surfbrasil'},
      {name: 'pokemon'}
    ],
    instagramAccessToken: '235624161.1fb234f.15ea2d1d8be7462bbe36088562424e73'
  };

  req.user = user;
  next();
});

module.exports = router;
