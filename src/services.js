(function () {
  var app = angular.module('tgServices', ['ngResource']);

  app.factory('Instagram', ['$resource', function ($resource) {
    return $resource('data/media-recent.json', {}, {
      query: {method: 'GET', params: {}, isArray: false}
    });
  }]);

})();
