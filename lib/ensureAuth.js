module.exports = function (type) {
  switch (type) {
    case 'tumblr':
      return tumblrAuth;
    default:
      return localAuth;
  }

  function localAuth(req, res, next) {
    if (!req.isAuthenticated || !req.isAuthenticated()) {
      return res.status(401).send('Authentication required');
    }
    next();
  }

  function tumblrAuth(req, res, next) {
    if (!req.user.tumblr || !req.user.tumblr.token || !req.user.tumblr.secret) {
      return res.status(401).send('Tumblr authentication required');
    }
    next();
  }
};
