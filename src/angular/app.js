(function () {
  var app = angular.module('tg', [
    // Vendor
    'ngRoute', 'ui.bootstrap',
    // General
    'tg.Controllers', 'tg.Directives', 'tg.Services',
    // Components
    'tg.tagSelector',
    'tg.imageResource',
    'tg.instagramResource',
    // interceptors
    'tg.Authentication'
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
      .when('/preset/:presetId', {
        controller: 'PresetCtrl',
        templateUrl: '/templates/preset.html'
      })
      .when('/new', {
        controller: 'PresetCtrl',
        templateUrl: '/templates/preset.html'
      })
      .when('/queue', {
        controller: 'HistoryCtrl',
        templateUrl: '/templates/history.html'
      })
      .when('/account', {
        controller: 'AccountCtrl',
        templateUrl: '/templates/account.html'
      })
      .otherwise('/', {
        redirectTo: '/'
      });
    $locationProvider.html5Mode(true);
  });
})();
