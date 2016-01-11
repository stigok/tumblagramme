module.exports.local = function (req, res, next) {
  if (!req.isAuthenticated || !req.isAuthenticated()) {
    return res.status(401).send('Authentication required');
  }
  next();
};

module.exports.tumblr = function (req, res, next) {
  if (!req.user.tumblr || !req.user.tumblr.token || !req.user.tumblr.secret) {
    return res.status(401).send('Tumblr authentication required');
  }
  next();
};

module.exports.instagram = function (req, res, next) {
  if (!req.user.instagram || !req.user.instagram.accessToken) {
    return res.status(401).send('Instagram authentication required');
  }
  next();
};
