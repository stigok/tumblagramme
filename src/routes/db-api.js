const express = require('express');
const router = new express.Router();
const db = require('../../data/mock-db.js');

// Database calls
router.use('/:table.json', function (req, res) {
  res.json(req.params.table === 'db' ? db : db[req.params.table]);

  let table = db[req.params.table];
  if (req.query.prop) {
    return res.json(table[req.query.prop]);
  }
  return res.json(table);
});

module.exports = router;
