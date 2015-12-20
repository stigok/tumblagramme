(function () {
  var app = angular.module('tg', [
    'ngRoute', 'ui.bootstrap',
    'tg.Controllers', 'tg.Directives', 'tg.Services',
    'http-auth-interceptor'
    // 'tg.Auth',
  ]);

  app.config(function ($routeProvider, $locationProvider) {
    $routeProvider
      .when('/', {
        controller: 'IndexCtrl',
        templateUrl: '/templates/index.html'
      })
      .when('/feed/:tag?', {
        controller: 'FeedCtrl',
        templateUrl: '/templates/feed.html'
      })
      .otherwise({
        templateUrl: '/templates/404.html'
      });
    $locationProvider.html5Mode(true);
  });
})();
