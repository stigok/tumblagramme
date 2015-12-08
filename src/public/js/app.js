(function () {
  var app = angular.module('tg', [
    'ngRoute', 'tg.Controllers', 'tg.Directives', 'tg.Services'
  ]);

  app.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
    $routeProvider
      .when('/', {
        controller: 'IndexController',
        templateUrl: '/www/partials/index'
      })
      .when('/feed', {
        controller: 'FeedController',
        templateUrl: '/www/partials/feed'
      })
      .when('/message', {
        controller: 'MessageViewerController',
        templateUrl: '/www/partials/message'
      });
      // .otherwise({
      //   redirectTo: '/'
      // });
    $locationProvider.html5Mode(true);
  }]);
})();
