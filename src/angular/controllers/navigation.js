(function () {
  var module = angular.module('tg.Controllers',
    ['underscore']);

  module.controller('NavigationController', function ($scope, User) {
    $scope.user = User.get();

    dropdown($scope, 'tags');
    dropdown($scope, 'stats');
    dropdown($scope, 'account');
  });

  function dropdown($scope, name) {
    $scope[name + 'DropdownOpened'] = false;
    $scope[name + 'Dropdown'] = function () {
      $scope[name + 'DropdownOpened'] = !$scope[name + 'DropdownOpened'];
    };
  }
})();
