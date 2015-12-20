(function () {
  angular.module('tg.Directives', [])
    .directive('navigation', function () {
      return {
        restrict: 'E',
        templateUrl: '/templates/navigation.html'
      };
    })
    .directive('accountChanger', function () {
      return {
        restrict: 'E',
        templateUrl: '/templates/accountChanger.html'
      };
    })
    .directive('loginModal', function () {
      return {
        restrict: 'E',
        templateUrl: '/templates/login.html'
      };
    })
    .directive('instagramResource', function () {
      return {
        restrict: 'E',
        templateUrl: '/templates/instagramResource.html',
        scope: {
          post: '=post'
        }
      };
    });
})();
