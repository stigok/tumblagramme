(function () {
  angular.module('tg.blogChanger', [])
    .controller('BlogChangerCtrl', BlogChangerCtrl);

  function BlogChangerCtrl($rootScope, $scope, Tumblr, SessionUser, $log) {
    $scope.blogs = Tumblr.blogs();
    var user = SessionUser.get(function (u) {
      $scope.currentBlogName = u.tumblr.activeBlogName;
    });

    $scope.setActiveBlog = function (name) {
      user.tumblr.activeBlogName = name;
      user.$save(function () {
        $scope.currentBlogName = name;
        $log.log('Active blog changed to ' + name);
        $rootScope.$broadcast('event:activeBlogChanged', name);
      });
    };
  }
})();
