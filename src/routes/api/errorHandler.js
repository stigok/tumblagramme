module.exports = function (err, req, res, next) {
  console.error('API error for %s', req.path, err);
  return res.status(500).json({error: err.message});
};
