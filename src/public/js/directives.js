(function () {
  var module = angular.module('tg.Directives', []);

  module.directive('navigation', function () {
    return {
      restrict: 'E',
      templateUrl: 'partials/navigation'
    };
  });

  module.directive('accountChanger', function () {
    return {
      restrict: 'E',
      templateUrl: 'partials/accountChanger'
    };
  });

  module.directive('instagramResource', function () {
    return {
      restrict: 'E',
      templateUrl: 'partials/instagramResource',
      scope: {
        post: '=post'
      }
    };
  });
})();
