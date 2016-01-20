(function () {
  function ConnectButtonDirective() {
    return {
      restrict: 'E',
      scope: {
        provider: '@provider'
      },
      controller: 'ConnectButtonCtrl',
      templateUrl: '/templates/connectButton.html'
    };
  }

  function ConnectButtonCtrl($scope, $location, $log) {
    $scope.connect = function (provider) {
      $location.url('/api/' + provider + '/auth');
      $log.log('Redirecting to OAuth provider: %s', provider);
    };
  }

  angular.module('tg.connectButton', [])
    .controller('ConnectButtonCtrl', ConnectButtonCtrl)
    .directive('connectButton', ConnectButtonDirective);
})();
