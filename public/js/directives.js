(function () {
  var app = angular.module('tumblagramme', []);

  app.directive('navigation', function () {
    return {
      restrict: 'E',
      templateUrl: '/partials/navigation'
    };
  });

  app.directive('accountChanger', function () {
    return {
      restrict: 'E',
      templateUrl: '/partials/accountChanger'
    };
  });
})();
