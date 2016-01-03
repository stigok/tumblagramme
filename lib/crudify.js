const express = require('express');
const _ = require('underscore');

module.exports = function (Model) {
  // TODO: Verify it's a mongoose document
  if (!Model) {
    throw new Error('Invalid arguments', Model);
  }

  const router = new express.Router();

  // function debugRoute(req, res) {
  //   console.log('%s -> request body', req.path, req.body);
  //   res.end();
  // }
  // router.post('/*', debugRoute);
  // router.put('/*', debugRoute);

  router.post('/:id', function (req, res, next) {
    Model.findById(req.params.id, function (err, obj) {
      if (err) {
        next(err);
      }

      console.log('post body', req.body);

      _.each(req.body, function (value, key) {
        obj[key] = value;
      });

      obj.save(function (err) {
        if (err) {
          if (err.name === 'ValidationError') {
            // TODO: set proper http status code for error
            return res.status(406).json(err);
          }
          console.error(err);
          return res.status(500).end();
        }
        return res.status(200).end();
      });
    });
  });

  router.post('/', function (req, res) {
    let instance = new Model(req.body);
    instance.save(function (err, obj) {
      if (err) {
        if (err.name === 'ValidationError') {
          // TODO: set proper http status code for error
          return res.status(406).json(err);
        }
        console.error(err);
        return res.status(500).end();
      }
      return res.status(200).json(obj);
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

  router.get('/', function (req, res, next) {
    Model.find(function (err, objects) {
      if (err) {
        console.log('error fetching results');
        return next('Error fetching results');
      }
      return res.send(objects);
    });
  });

  router.delete('/:id', function (req, res, next) {
    Model.findById(req.params.id, function (err, obj) {
      if (err) {
        console.error('Failed to delete obj invalid id', req.params.id, err);
        return next(err);
      }
      obj.remove(function (err) {
        if (err) {
          console.error('Failed to delete object', obj, err);
          return next(err);
        }
        return res.status(200).json();
      });
    });
  });

  router.use(function (err, req, res, next) {
    console.error(err);
    return res
      .status(500)
      .send(err)
      .end();
  });

  return router;
};
