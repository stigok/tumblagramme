(function () {
  var app = angular.module('tg', [
    // Vendor
    'ngRoute', 'ui.bootstrap',
    // Etc
    'tg.Controllers', 'tg.Directives', 'tg.Services',
    // Components
    'tg.tagSelector',
    'tg.connectButton',
    'tg.imageResource',
    'tg.instagramResource',
    // interceptors
    'http-auth-interceptor'
    // 'tg.Auth',
  ]);

  app.config(function ($routeProvider, $locationProvider) {
    $routeProvider
      .when('/', {
        controller: 'IndexCtrl',
        templateUrl: '/templates/index.html'
      })
      .when('/feed/:presetId', {
        controller: 'FeedCtrl',
        templateUrl: '/templates/feed.html'
      })
      .when('/preset/:id?', {
        controller: 'PresetCtrl',
        templateUrl: '/templates/preset.html'
      })
      .when('/account', {
        controller: 'AccountCtrl',
        templateUrl: '/templates/account.html'
      })
      .when('/logout', {
        controller: 'LogoutCtrl',
        template: 'Logging out...'
      });
    $locationProvider.html5Mode(true);
  });
})();
