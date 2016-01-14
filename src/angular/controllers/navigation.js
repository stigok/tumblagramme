(function () {
  angular.module('tg.Controllers')
    .controller('NavigationCtrl', NavigationCtrl);

  function NavigationCtrl($scope, Tumblr, SessionUser, Preset) {
    $scope.user = SessionUser.get(function (user) {
      $scope.activePreset = Preset.get({id: user.activePresetId});
    });
    $scope.blogs = Tumblr.blogs();

    $scope.setActiveBlog = function (name) {
      $scope.user.tumblr.activeBlogName = name;
      $scope.user.$save();
    };
  }
})();
