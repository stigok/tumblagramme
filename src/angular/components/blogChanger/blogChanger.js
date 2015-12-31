(function () {
  angular.module('tg.blogChanger', [])
  .controller('BlogChangerCtrl', function ($rootScope, $scope, Tumblr, User, UpdateUser, $log) {
    $scope.blogs = Tumblr.blogs();
    User.get(function (u) {
      $scope.currentBlogName = u.tumblr.activeBlogName;
    });

    $scope.setActiveBlog = function (name) {
      UpdateUser.setActiveBlog(name).success(function () {
        $scope.currentBlogName = name;
        $log.log('Active blog changed to ' + name);
        $rootScope.$broadcast('event:activeBlogChanged', name);
      });
    };
  });
})();
