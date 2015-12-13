const express = require('express');
const router = new express.Router();

router.get('/user', function (req, res) {
  return res.json(require('../../../user.json'));
});

router.use(require('./errorHandler'));

module.exports = router;
