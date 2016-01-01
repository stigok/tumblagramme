const express = require('express');
const router = new express.Router();

router.post('/', function (req, res) {
  for (let prop in req.user) {
    if (req.body[prop]) {
      req.user[prop] = req.body[prop];
    }
  }

  req.user.save(function (err, user) {
    if (err) {
      if (err.name === 'ValidationError') {
        // TODO: set proper http status code for error
        return res.status(406).json(err);
      }
      console.error(err);
      return res.status(500).end();
    }
    // This data should already be in the session header
    return res.status(200).json(user);
  });
});

router.get('/', function (req, res, next) {
  // Response should contain fresh session information
  res.status(200).json(req.user);
});

router.use(function (err, req, res, next) {
  console.error(err);
  return res
    .status(500)
    .send(err)
    .end();
});

module.exports = router;
