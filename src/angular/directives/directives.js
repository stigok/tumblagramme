(function () {
  var module = angular.module('tg.Directives', []);

  module.directive('navigation', function () {
    return {
      restrict: 'E',
      templateUrl: '/templates/navigation.html'
    };
  });

  module.directive('accountChanger', function () {
    return {
      restrict: 'E',
      templateUrl: '/templates/accountChanger.html'
    };
  });

  module.directive('instagramResource', function () {
    return {
      restrict: 'E',
      templateUrl: '/templates/instagramResource.html',
      scope: {
        post: '=post'
      }
    };
  });
})();
