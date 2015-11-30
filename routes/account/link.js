var express = require('express');
var router = express.Router();
var Account = require('../../models/account');

router.get('/', function (req, res) {
  res.render('account/link');
});

router.post('/instagram', function (req, res) {
  console.log('instagram link');
  res.redirect('/account/link');
});

module.exports = router;
