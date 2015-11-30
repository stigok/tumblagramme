var express = require('express');
var router = express.Router();

router.get('/', function (req, res) {
  res.render('index', {
    title: 'This is the index page, brother',
    user: req.user
  });
});

router.get('/partials/:name', function (req, res) {
  res.render('partials/' + req.params.name);
});

module.exports = router;
