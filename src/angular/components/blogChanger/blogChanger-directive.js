(function () {
  angular.module('tg.blogChanger')
  .directive('blogChanger', function () {
    return {
      restrict: 'E',
      controller: 'BlogChangerCtrl',
      scope: {},
      templateUrl: '/templates/blogChanger.html'
    };
  });
})();
