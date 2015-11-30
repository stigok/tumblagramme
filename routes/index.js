var express = require('express');
var router = express.Router();
var helpers = require('utils');
var passport = require('passport');
var Account = require('./models/account');

router.get('/', function(req, res) {

  res.render('index', {
    title: "This is the index page",
    user: req.user
  });

});

router.get('/debug', function(req, res) {
  res.render('debug', {
    req: JSON.stringify(req, helpers.censor(req))
  });
});

module.exports = router;
