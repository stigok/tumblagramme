const express = require('express');
const Model = require('../../../models/preset');
const router = new express.Router();
const _ = require('underscore');
const logger = require('winston');

router.post('/:id', function (req, res, next) {
  // Avoid mongoose validation errors for making _id property touched or dirty
  let updates = _.omit(req.body, '_id', '__v');

  Model.findOne(
    {
      _id: req.params.id,
      userId: req.user._id
    },
    function (err, instance) {
      if (err) {
        return next(err);
      }
      if (instance === null) {
        return res.status(404).end();
      }

      // Copy updated values to source object setting only existing properties
      _.extendOwn(instance, updates);

      instance.save(function (err, updated) {
        if (err) {
          return next(err);
        }
        return res.json(updated);
      });
    }
  );
});

router.post('/', function (req, res, next) {
  let instance = new Model(req.body);
  instance.userId = req.user._id;

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
      userId: req.user._id
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
  Model.find(
    {
      userId: req.user._id
    },
    function (err, collection) {
      if (err) {
        return next(err);
      }
      if (collection === null) {
        return res.json([]);
      }
      return res.json(collection);
    }
  );
});

router.delete('/:id', function (req, res, next) {
  Model.findOneAndRemove(
    {
      _id: req.params.id,
      userId: req.user._id
    },
    function (err) {
      if (err) {
        return next(err);
      }
      return res.end();
    }
  );
});

router.use(require('../../../../lib/mongooseErrorHandler.js'));

module.exports = router;
