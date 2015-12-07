const express = require('express');
const router = express.Router();
const _ = require('underscore');
const db = require('../../data/mock-db.js');
const util = require('util');

// Database calls
router.use('/json/:table.json', function (req, res) {
  res.json(req.params.table === 'db' ? db : db[req.params.table]);

  let table = db[req.params.table];
  if (req.query.prop) {
    return res.json(table[req.query.prop]);
  }
  return res.json(table);
});

// Server partial views for angular
router.use('/partials/:name', function (req, res) {
  let partial = util.format('partials/%s.jade', req.params.name);
  return res.render(partial);
});

// Serve main app
router.use('/', function (req, res) {
  return res.render('index');
});

module.exports = router;
