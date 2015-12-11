(function () {
  var services = angular.module('tg.Services', ['ngResource']);

  services.service('Instagram', function ($resource) {
    var token = '235624161.1fb234f.15ea2d1d8be7462bbe36088562424e73';
    return $resource('/api/instagram/:tag', {access_token: token}, {
      query: {method: 'GET', params: {}, isArray: true}
    });
  });
})();
