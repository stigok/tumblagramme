(function () {
  var module = angular.module('tg.Services', ['ngResource']);

  module.service('Instagram', function ($resource, User) {
    var auth = {accessToken: User.instagramAccessToken};

    return $resource('/api/instagram/media/recent/:tag', auth, {
      query: {method: 'GET', params: {}, isArray: true}
    });
  });

  module.factory('Tumblr', function ($resource) {
    return $resource('/api/tumblr/user', {}, {
      user: {method: 'GET', isArray: false},
      blogs: {method: 'GET', url: '/api/tumblr/blogs', isArray: true}
    });
  });

  module.factory('User', function ($resource) {
    return $resource('/api/tumblagramme/user', {}, {
      get: {method: 'GET', cache: true}
    });
  });

  module.service('UpdateUser', function ($http) {
    return {
      setActiveBlog: function (name) {
        return $http.post('/api/tumblagramme/activeBlog', {blog: name});
      }
    };
  });

  module.factory('ping', function ($http) {
    return $http.get('/api/tumblagramme/ping');
  });
})();
