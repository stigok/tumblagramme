(function () {
  var app = angular.module('tg', [
    'ngRoute', 'tgControllers', 'tgDirectives'
  ]);

  app.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'partials/index',
        controller: 'IndexController'
      })
      .otherwise({
        redirectTo: '/'
      });
    $locationProvider.html5Mode(true);
  }]);
})();
