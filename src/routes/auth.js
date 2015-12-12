const express = require('express');
const router = new express.Router();

// Server partial views for angular
router.use(function (req, res, next) {
  req.user = require('../../user.json');
  next();
});

module.exports = router;
