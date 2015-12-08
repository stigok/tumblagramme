(function () {
  var app = angular.module('tg.Controllers', []);

  app.controller('IndexController', function ($scope) {
    $scope.message = 'This is the index controller!';
  });

  app.controller('MessageViewerController', function ($scope) {
    $scope.message = 'Hello, world!';
  });

  app.controller('TestController', function ($scope, $location) {
    $scope.message = 'This worked out excellent!';
    $scope.goto = function () {
      $location.path('/');
    };
  });

  app.controller('FeedController', ['$scope', '$filter', 'Instagram', function ($scope, $filter, Instagram) {
    // Instagram.get(function (data) {
    //   console.log(data);
    //   $scope.apiResponse = data;
    // });
    $scope.apiResponse = Instagram.query();
    // $scope.orderProp = 'postedDate';
  }]);
})();
