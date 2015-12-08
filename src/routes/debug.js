const express = require('express');
const router = express.Router();

router.use('/debug/:after', function (req, res) {
  res.render('error', {
    message: 'Rendered debug!',
    error: JSON.stringify(req.params),
    pwd: req.originalUrl,
    full: JSON.stringify(req.query)
  });
});
