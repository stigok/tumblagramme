(function () {
  var module = angular.module('tg.Services', ['ngResource']);

  module.service('Instagram', function ($resource, SessionUser) {
    var auth = {accessToken: SessionUser.instagramAccessToken};

    return $resource('/api/instagram/media/recent/:tag', auth, {
      query: {method: 'GET', params: {}, isArray: true}
    });
  });

  module.factory('Tumblr', function ($resource) {
    return $resource('/api/tumblr/user', {}, {
      user: {method: 'GET', isArray: false},
      blogs: {method: 'GET', url: '/api/tumblr/blogs', isArray: true, cache: true}
    });
  });

  module.factory('tumblrQueue', function ($http, SessionUser, Tumblr, Preset) {
    return function (post, success, error) {
      SessionUser.get().$promise.then(function (user) {
        return Preset.get({id: user.activePresetId}).$promise;
      }).then(function (preset) {
        var tumblrPostObject = {
          state: 'queue',
          tags: preset.postTags.join(','),
          format: 'markdown',
          caption: preset.caption,
          source: post.images.standard_resolution.url
        };

        return $http.post('/api/tumblr/post/photo', {blogName: preset.blogName, options: tumblrPostObject});
      }).then(success, error);
    };
  });

  module.factory('Preset', function ($resource) {
    return $resource('/api/tumblagramme/preset/:id');
  });

  module.factory('SessionUser', function ($resource) {
    return $resource('/api/tumblagramme/user', null, {
      get: {method: 'GET', cache: true, isArray: false},
      query: {method: 'GET', cache: true, isArray: false},
      nocache: {method: 'GET', cache: false, isArray: false}
    });
  });

  module.factory('ping', function ($http) {
    return $http.get('/api/tumblagramme/ping');
  });

  module.factory('PresetEvents', function () {
    return {
      updated: 'event:preset.updated'
    };
  });
})();
