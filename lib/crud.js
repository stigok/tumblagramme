const express = require('express');
const router = new express.Router();

module.exports = function (Model) {
  router.get('/', function (req, res, next) {
    Model.find(function (err, objects) {
      if (err) {
        console.log('error fetching results');
        return next('Error fetching results');
      }
      return res.send(objects);
    });
  });

  router.get('/:id', function (req, res) {
    Model.findById(req.params.id, function (err, obj) {
      if (err) {
        console.error('object with id %s not found', req.params.id);
        return res.status(404).json('Not found');
      }
      return res.json(obj);
    });
  });

  router.post('/:id', function (req, res, next) {
    Model.findById(req.params.id, function (err, obj) {
      if (err) {
        console.error('Failed to save changes to obj', obj);
        return next('Failed to save changes');
      }
      return res.status(200).end();
    });
  });

  router.put('/presets', function (req, res, next) {
    let instance = new Model(req.body);
    instance.save(function (err, obj) {
      if (err) {
        console.error('Failed to save object', req.body);
        return next('Failed to save changes');
      }
      return res.json(obj);
    });
  });

  router.use(function (err, req, res, next) {
    return res
      .status(500)
      .send(err)
      .end();
  });
};
