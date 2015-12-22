(function () {
  angular.module('tg.Controllers')
    .controller('NavigationCtrl', ['$rootScope', '$scope', NavigationCtrl]);

  function NavigationCtrl($rootScope, $scope) {
    bindDropdown($scope, 'tags');
    bindDropdown($scope, 'stats');
    bindDropdown($scope, 'account');
  }

  function bindDropdown($scope, name) {
    $scope[name + 'DropdownOpened'] = false;
    $scope[name + 'Dropdown'] = function () {
      $scope[name + 'DropdownOpened'] = !$scope[name + 'DropdownOpened'];
    };
  }
})();
