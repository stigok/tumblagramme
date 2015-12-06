(function () {
  var app = angular.module('tgControllers', []);

  app.controller('IndexController', function ($scope) {
    $scope.message = 'Hello, world!';
  });

  app.controller('FeedController', ['$scope', 'Instagram', function ($scope, Instagram) {
    $scope.posts = Instagram.query();
    // $scope.orderProp = 'postedDate';
  }]);

})();
