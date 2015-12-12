(function () {
  var module = angular.module('tg.Services', ['ngResource']);

  module.service('Instagram', function ($resource, User) {
    var auth = {accessToken: User.instagramAccessToken};

    return $resource('/api/instagram/media/recent/:tag', auth, {
      query: {method: 'GET', params: {}, isArray: true}
    });
  });

  module.service('Tumblr', function ($resource, User) {
    var auth = {
      authToken: User.tumblrAuthToken,
      authSecret: User.tumblrAuthSecret
    };

    return $resource('/api/tumblr/stats', auth, {
      query: {method: 'GET', params: {}, isArray: false}
    });
  });

  module.factory('User', function ($resource) {
    return $resource('/api/tumblagramme/user', {}, {
      get: {
        method: 'GET',
        cache: true
      }
    }).get();
  });
})();
