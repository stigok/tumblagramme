(function () {
  angular.module('tg.Controllers', ['underscore'])
    .controller('IndexCtrl', [
      '$scope',
      function ($scope) {
        $scope.message = 'This is the index controller!';
      }
    ]);
})();
