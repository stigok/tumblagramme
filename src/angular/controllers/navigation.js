(function () {
  angular.module('tg.Controllers')
    .controller('NavigationCtrl', [
      '$rootScope', '$scope',
      function ($rootScope, $scope) {
        $rootScope.$on('auth:stateChanged', function (status) {
          $scope.isAuthenticated = status;
        });

        bindDropdown($scope, 'tags');
        bindDropdown($scope, 'stats');
        bindDropdown($scope, 'account');
      }
    ]);

  function bindDropdown($scope, name) {
    $scope[name + 'DropdownOpened'] = false;
    $scope[name + 'Dropdown'] = function () {
      $scope[name + 'DropdownOpened'] = !$scope[name + 'DropdownOpened'];
    };
  }
})();
