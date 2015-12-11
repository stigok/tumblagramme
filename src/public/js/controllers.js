(function () {
  var app = angular.module('tg.Controllers', []);

  function chunk(arr, size) {
    var newArr = [];
    for (var i = 0; i < arr.length; i += size) {
      newArr.push(arr.slice(i, i + size));
    }
    return newArr;
  }

  app.controller('NavigationController', function ($scope, User) {
    $scope.user = User;

    $scope.tagDropdownOpened = false;
    $scope.tagDropdown = function () {
      $scope.tagDropdownOpened = !$scope.tagDropdownOpened;
    };

    $scope.statsDropdownOpened = false;
    $scope.statsDropdown = function () {
      $scope.statsDropdownOpened = !$scope.tagDropdownOpened;
    };

    $scope.accountDropdownOpened = false;
    $scope.accountDropdown = function () {
      $scope.accountDropdownOpened = !$scope.accountDropdownOpened;
    };
  });

  app.controller('IndexController', function ($scope) {
    $scope.message = 'This is the index controller!';
  });

  app.controller('LoginController', function ($scope) {
    $scope.login = function () {
      console.error('Not implemented');
    };
    $scope.register = function () {
      console.error('Not implemented');
    };
  });

  app.controller('FeedController', ['$scope', 'Instagram', function ($scope, Instagram) {
    $scope.tag = 'bjj';
    $scope.posts = Instagram.query({tag: $scope.tag}, function () {
      $scope.chunkedPosts = chunk($scope.posts, 3);
    });
  }]);
})();
