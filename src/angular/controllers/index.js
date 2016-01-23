(function () {
  angular.module('tg.Controllers', ['underscore'])
    .controller('IndexCtrl', IndexCtrl);

  function IndexCtrl($scope, $http, Preset) {
    $scope.message = 'This is the index controller!';
    $scope.presets = Preset.query();
  }
})();
