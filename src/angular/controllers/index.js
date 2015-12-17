(function () {
  angular.module('tg.Controllers', ['underscore'])
    .controller('IndexController', ['$scope',
      function ($scope) {
        $scope.message = 'This is the index controller!';
      }
    ]);
})();
