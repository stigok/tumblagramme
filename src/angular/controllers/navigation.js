(function () {
  angular.module('tg.Controllers')
    .controller('NavigationCtrl', ['$scope', 'Tumblr', 'SessionUser', NavigationCtrl]);

  function NavigationCtrl($scope, Tumblr, SessionUser) {
    bindDropdown($scope, 'tags');
    bindDropdown($scope, 'stats');
    bindDropdown($scope, 'account');

    $scope.user = SessionUser.get();
    $scope.blogs = Tumblr.blogs();
    $scope.setActiveBlog = function (name) {
      $scope.user.tumblr.activeBlogName = name;
      $scope.user.$save();
    };
  }

  function bindDropdown($scope, name) {
    $scope[name + 'DropdownOpened'] = false;
    $scope[name + 'Dropdown'] = function () {
      $scope[name + 'DropdownOpened'] = !$scope[name + 'DropdownOpened'];
    };
  }
})();
