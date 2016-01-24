module.exports.tumblr = function (redirectTarget) {
  return function (req, res, next) {
    if (!req.user || !req.user.tumblr || !req.user.tumblr.token || !req.user.tumblr.secret) {
      if (typeof redirectTarget === 'string') {
        return res.redirect(redirectTarget);
      }
      let err = new Error('Tumblr authentication required');
      err.status = 401;
      return res.next(err);
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
      let err = new Error('Instagram authentication required');
      err.status = 401;
      return res.next(err);
    }
    return next();
  };
};
