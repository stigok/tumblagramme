const logger = require('winston');

module.exports = function (err, req, res, next) {
  logger.error('API error on request to %s', req.path, err);
  return res.status(500).json({error: err.message});
};
