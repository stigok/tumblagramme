(function () {
  angular.module('tg.Controllers')
    .controller('NavigationCtrl', NavigationCtrl);

  function NavigationCtrl($scope, Tumblr, SessionUser) {
    $scope.user = SessionUser.get();
    $scope.blogs = Tumblr.blogs();
    $scope.setActiveBlog = function (name) {
      $scope.user.tumblr.activeBlogName = name;
      $scope.user.$save();
    };
  }
})();
