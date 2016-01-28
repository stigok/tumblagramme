const logger = require('winston');

module.exports = function (err, req, res, next) {
  // Err should probably not be necessary to check
  if (err) {
    if (err.name === 'ValidationError') {
      logger.verbose('Model validation failed for mongoose API request', err);
      return res.status(406).json(err);
    }
    return res
      .status(500)
      .json('There was an error processing the request.')
      .end();
  }
};
