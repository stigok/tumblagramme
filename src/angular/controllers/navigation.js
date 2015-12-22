(function () {
  angular.module('tg.Controllers')
    .controller('NavigationCtrl', ['$scope', 'Tumblr', 'User', 'UpdateUser', NavigationCtrl]);

  function NavigationCtrl($scope, Tumblr, User, UpdateUser) {
    bindDropdown($scope, 'tags');
    bindDropdown($scope, 'stats');
    bindDropdown($scope, 'account');

    $scope.user = User.get();
    $scope.blogs = Tumblr.blogs();
    $scope.setActiveBlog = function (name) {
      UpdateUser.setActiveBlog(name).success(function () {
        console.log('active blog set to %s', name);
      });
    };
  }

  function bindDropdown($scope, name) {
    $scope[name + 'DropdownOpened'] = false;
    $scope[name + 'Dropdown'] = function () {
      $scope[name + 'DropdownOpened'] = !$scope[name + 'DropdownOpened'];
    };
  }
})();
