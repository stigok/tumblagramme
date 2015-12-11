(function () {
  var app = angular.module('tg.Controllers', []);

  function chunk(arr, size) {
    var newArr = [];
    for (var i = 0; i < arr.length; i += size) {
      newArr.push(arr.slice(i, i + size));
    }
    return newArr;
  }

  app.controller('NavigationController', function ($scope) {
    $scope.tagDropdownOpened = false;

    $scope.tagDropdown = function () {
      $scope.tagDropdownOpened = !$scope.tagDropdownOpened;
    };
  });

  app.controller('IndexController', function ($scope) {
    $scope.message = 'This is the index controller!';
  });

  app.controller('FeedController', ['$scope', 'Instagram', function ($scope, Instagram) {
    $scope.tag = 'bjj';
    $scope.posts = Instagram.query({tag: $scope.tag}, function () {
      $scope.chunkedPosts = chunk($scope.posts, 3);
    });
  }]);
})();
