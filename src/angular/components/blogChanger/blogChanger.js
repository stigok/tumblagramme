(function () {
  angular.module('tg.blogChanger', [])
  .controller('BlogChangerCtrl', function ($rootScope, $scope, Tumblr, User, UpdateUser, $log) {
    $scope.blogs = Tumblr.blogs();
    $scope.current = User.get().activeBlogName;

    $scope.setActiveBlog = function (name) {
      UpdateUser.setActiveBlog(name).success(function () {
        $log.log('active blog changed to ' + name);
        $rootScope.$broadcast('event:activeBlogChanged', name);
      });
    };
  });
})();
