const express = require('express');
const Model = require('../../../models/preset');
const router = new express.Router();

router.post('/:id', function (req, res, next) {
  Model.findOneAndUpdate(
    {
      _id: req.params.id,
      userId: req.body.userId
    },
    req.body,
    function (err, obj) {
      if (err) {
        return next(err);
      }
      return res.json(obj);
    }
  );
});

router.post('/', function (req, res, next) {
  let instance = new Model(req.body);

  instance.save(function (err, obj) {
    if (err) {
      return next(err);
    }
    return res.json(obj);
  });
});

router.get('/:id', function (req, res, next) {
  Model.findOne(
    {
      _id: req.params.id,
      userId: req.params.userId
    },
    function (err, obj) {
      if (err) {
        return next(err);
      }
      if (obj === null) {
        return res.status(404).end();
      }
      return res.json(obj);
    }
  );
});

router.get('/', function (req, res, next) {
  Model.find(function (err, objects) {
    if (err) {
      return next(err);
    }
    return res.send(objects.length || []);
  });
});

router.delete('/:id', function (req, res, next) {
  Model.findOneAndRemove(
    {
      _id: req.params.id,
      userId: req.user.id
    },
    function (err) {
      if (err) {
        return next(err);
      }
      return res.end();
    }
  );
});

router.use(function (err, req, res, next) {
  if (err) {
    if (err.name === 'ValidationError') {
      // TODO: set proper http status code for error
      return res.status(406).json(err);
    }
    console.error(err);
    return res
      .status(500)
      .json('There was an error processing the request.')
      .end();
  }
});

module.exports = router;
