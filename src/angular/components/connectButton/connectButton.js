(function () {
  angular.module('tg.connectButton', [])
    .controller('ConnectButtonCtrl', ConnectButtonCtrl);

  function ConnectButtonCtrl($scope, $location, $log) {
    $scope.connect = function (provider) {
      $location.url('/oauth/' + provider);
      $log.log('Redirecting to OAuth provider: %s', provider);
    };
  }
})();
