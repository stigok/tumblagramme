(function () {
  var app = angular.module('tg.Directives', []);

  app.directive('navigation', function () {
    return {
      restrict: 'E',
      templateUrl: '/www/partials/navigation'
    };
  });

  app.directive('accountChanger', function () {
    return {
      restrict: 'E',
      templateUrl: '/www/partials/accountChanger'
    };
  });
})();
