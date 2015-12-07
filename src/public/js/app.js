(function () {
  var app = angular.module('tg', [
    'ngRoute', 'tg.Controllers', 'tg.Directives', 'tg.Services'
  ]);

  app.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/partials/index',
        controller: 'IndexController'
      })
      .when('/feed', {
        templateUrl: 'views/partials/feed',
        controller: 'FeedController'
      })
      .otherwise({
        redirectTo: '/'
      });
    $locationProvider.html5Mode(true);
  }]);
})();
