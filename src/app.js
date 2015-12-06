(function () {
  var app = angular.module('tg', [
    'ngRoute', 'tgControllers', 'tgDirectives', 'tgServices'
  ]);

  app.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'partials/index',
        controller: 'IndexController'
      })
      .when('/feed', {
        templateUrl: 'partials/feed',
        controller: 'FeedController'
      })
      .otherwise({
        redirectTo: '/'
      });
    $locationProvider.html5Mode(true);
  }]);
})();
