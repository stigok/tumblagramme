(function () {
  var directives = angular.module('tg.Directives', []);

  directives.directive('navigation', function () {
    return {
      restrict: 'E',
      templateUrl: 'partials/navigation'
    };
  });

  directives.directive('accountChanger', function () {
    return {
      restrict: 'E',
      templateUrl: 'partials/accountChanger'
    };
  });

})();
