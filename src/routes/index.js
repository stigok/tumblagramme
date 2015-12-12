const express = require('express');
const router = new express.Router();
const util = require('util');

// Server partial views for angular
router.use('/partials/:name', function (req, res) {
  let partial = util.format('partials/%s.jade', req.params.name);
  return res.render(partial);
});

// Serve main app
router.use('/', function (req, res) {
  return res.render('angular-template', {
    ngApp: 'tg'
  });
});

module.exports = router;
