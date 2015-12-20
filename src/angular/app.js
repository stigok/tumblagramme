(function () {
  var app = angular.module('tg', [
    'ngRoute', 'ui.bootstrap',
    'tg.Controllers', 'tg.Directives', 'tg.Services',
    'http-auth-interceptor'
    // 'tg.Auth',
  ]);

  app.config(function ($routeProvider, $locationProvider) {
    $routeProvider
      // .when('/', {
      //   controller: 'IndexController',
      //   templateUrl: '/templates/index.html'
      // })
      .when('/login', {
        controller: 'LoginController',
        templateUrl: '/templates/login.html'
      })
      .when('/feed', {
        controller: 'FeedController',
        templateUrl: '/templates/feed.html'
      })
      .when('/feed/:tag', {
        controller: 'FeedController',
        templateUrl: '/templates/feed.html'
      })
      .otherwise({
        redirectTo: '/feed'
      });
    $locationProvider.html5Mode(true);
  });
})();
