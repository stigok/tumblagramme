(function () {
  var app = angular.module('tg', [
    'ngRoute',
    'tg.Controllers', 'tg.Directives', 'tg.Services',
    // 'tg.Auth',
    'ui.bootstrap'
  ]);

  app.config(function ($routeProvider, $locationProvider) {
    $routeProvider
      .when('/', {
        controller: 'IndexController',
        templateUrl: '/www/partials/index'
      })
      .when('/login', {
        controller: 'LoginController',
        templateUrl: '/www/partials/login'
      })
      .when('/feed', {
        controller: 'FeedController',
        templateUrl: '/www/partials/feed'
      })
      .when('/feed/:tag', {
        controller: 'FeedController',
        templateUrl: '/www/partials/feed'
      })
      .when('/message', {
        controller: 'MessageViewerController',
        templateUrl: '/www/partials/message'
      })
      .otherwise({
        redirectTo: '/'
      });
    $locationProvider.html5Mode(true);
  });
})();
