(function () {
  var services = angular.module('tg.Services', ['ngResource']);

  services.service('Instagram', function ($resource, User) {
    return $resource('/api/instagram/:tag', {accessToken: User.instagramAccessToken}, {
      query: {method: 'GET', params: {}, isArray: true}
    });
  });

  services.factory('User', function () {
    return {
      email: 'stig@stigok.com',
      favoriteTags: ['bjj', 'martialarts', 'surfeurope'],
      instagramAccessToken: '235624161.1fb234f.15ea2d1d8be7462bbe36088562424e73'
    };
  });
})();
