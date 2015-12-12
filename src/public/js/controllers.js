(function () {
  var app = angular.module('tg.Controllers', ['underscore']);

  function chunk(arr, size) {
    var newArr = [];
    for (var i = 0; i < arr.length; i += size) {
      newArr.push(arr.slice(i, i + size));
    }
    return newArr;
  }

  function dropdown($scope, name) {
    $scope[name + 'DropdownOpened'] = false;
    $scope[name + 'Dropdown'] = function () {
      $scope[name + 'DropdownOpened'] = !$scope[name + 'DropdownOpened'];
    };
  }

  app.controller('NavigationController', function ($scope, User) {
    $scope.user = User;

    dropdown($scope, 'tags');
    dropdown($scope, 'stats');
    dropdown($scope, 'account');
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
