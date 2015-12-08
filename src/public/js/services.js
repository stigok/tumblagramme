(function () {
  var app = angular.module('tg.Services', ['ngResource']);
  var baseUrl = '/instagram';
  var access_token = '235624161.1fb234f.15ea2d1d8be7462bbe36088562424e73';

  app.factory('Instagram', function ($resource) {
    return $resource(baseUrl + '/starwars', {access_token: access_token}, {
      query: {method: 'GET', params: {}, isArray: true}
    });
  });
})();
