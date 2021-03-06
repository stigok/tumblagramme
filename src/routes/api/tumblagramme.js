const express = require('express');
const router = new express.Router();

// API data models
router.use('/preset', require('./tumblagramme/preset'));
router.use('/history', require('./tumblagramme/history'));

router.get('/user', function (req, res) {
  return res.json(req.user);
});

router.get('/ping', function (req, res) {
  return res.json('pong');
});

router.use(require('./errorHandler'));

module.exports = router;
