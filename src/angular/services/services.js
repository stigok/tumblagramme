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
      blogs: {method: 'GET', url: '/api/tumblr/blogs', isArray: true, cache: true},
      queue: {method: 'GET', url: '/api/tumblr/queue', isArray: true, cache: true},
      dequeue: {method: 'DELETE', url: '/api/tumblr/history/rollback/:id', params: {id: '@id', blog: '@blog'}},
      post: {method: 'POST', url: '/api/tumblr/post/:type', params: {type: '@type', blog: '@blog'}}
    });
  });

  module.factory('tumblrQueue', function ($http, Preset, Tumblr) {
    return function (presetId, post, success, error) {
      var linkText = post.user.username + ((post.user.username.slice(-1) === 's') ? '\'' : '\'s') + ' Instagram';
      var attributionLink = '\n\n<p>via <a href="' + post.link + '" target="_blank">' + linkText + '</a></p>';

      Preset.get({id: presetId}, function (preset) {
        Tumblr.post({
          blog: preset.blog.name,
          type: 'photo',
          mediaId: post.id,
          state: preset.post.state,
          tags: preset.post.tags.join(','),
          format: preset.post.format,
          caption: preset.post.caption + attributionLink,
          source: post.images.standard_resolution.url
        }).$promise.then(success, error);
      });
    };
  });

  module.factory('Preset', function ($resource) {
    return $resource('/api/tumblagramme/preset/:id');
  });

  module.factory('PresetEvents', function () {
    return {
      updated: 'event:preset.updated'
    };
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

  module.factory('History', function ($resource) {
    return $resource('/api/tumblagramme/history/:id');
  });
})();
