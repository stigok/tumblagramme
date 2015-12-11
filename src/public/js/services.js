(function () {
  var services = angular.module('tg.Services', ['ngResource']);

  services.service('Instagram', function ($resource, User) {
    // TODO: rename access_token to accessToken
    return $resource('/api/instagram/:tag', {access_token: User.instagramAccessToken}, {
      query: {method: 'GET', params: {}, isArray: true}
    });
  });

  services.factory('User', function () {
    return {
      email: 'stig@stigok.com',
      favoriteTags: [
        {name: 'bjj'},
        {name: 'martialarts'},
        {name: 'surfbrasil'},
        {name: 'pokemon'}
      ],
      instagramAccessToken: '235624161.1fb234f.15ea2d1d8be7462bbe36088562424e73'
    };
  });
})();
