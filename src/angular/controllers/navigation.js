(function () {
  angular.module('tg.Controllers')
    .controller('NavigationCtrl', NavigationCtrl);

  function NavigationCtrl($scope, SessionUser) {
    $scope.user = SessionUser.get();
  }
})();
