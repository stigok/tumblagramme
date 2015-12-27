(function () {
  angular.module('tg.blogChanger')
  .controller('BlogChangerCtrl', function ($rootScope, $scope, Tumblr, User, $log) {
    $scope.status = {
      isOpen: false
    };
    $scope.blogs = Tumblr.blogs();
    $scope.current = User.get().activeBlog;

    $scope.setActiveBlog = function (name) {
      User.setActiveBlog(name).success(function () {
        $log.log('active blog changed to ' + name);
        $rootScope.$broadcast('event:activeBlogChanged', name);
      });
    };

    $scope.openDropdown = function ($event) {
      $event.preventDefault();
      $event.stopPropagation();
      $scope.status.isOpen = !$scope.status.isOpen;
    };
  });
})();
