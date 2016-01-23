module.exports.local = function (redirectTarget) {
  return function (req, res, next) {
    if (!req.user) {
      if (typeof redirectTarget === 'string') {
        return res.redirect(redirectTarget);
      }
      return res.status(401).json('Authentication required');
    }
    return next();
  };
};

module.exports.tumblr = function (redirectTarget) {
  return function (req, res, next) {
    if (!req.user || !req.user.tumblr || !req.user.tumblr.token || !req.user.tumblr.secret) {
      if (typeof redirectTarget === 'string') {
        return res.redirect(redirectTarget);
      }
      return res.status(401).json('Tumblr authentication required');
    }
    return next();
  };
};

module.exports.instagram = function (redirectTarget) {
  return function (req, res, next) {
    if (!req.user || !req.user.instagram || !req.user.instagram.accessToken) {
      if (typeof redirectTarget === 'string') {
        return res.redirect(redirectTarget);
      }
      return res.status(401).json('Instagram authentication required');
    }
    return next();
  };
};
