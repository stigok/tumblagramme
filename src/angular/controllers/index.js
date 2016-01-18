(function () {
  angular.module('tg.Controllers', ['underscore'])
    .controller('IndexCtrl', IndexCtrl);

  function IndexCtrl($scope, $http, Preset) {
    $scope.message = 'This is the index controller!';
    $scope.autoLogin = function () {
      $http.post('/api/tumblagramme/auth', {username: 'user', password: 'user'});
    };

    $scope.presets = Preset.query();
  }
})();
