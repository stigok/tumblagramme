(function () {
  function ConnectButtonDirective() {
    return {
      restrict: 'E',
      scope: {
        provider: '@provider'
      },
      templateUrl: '/templates/connectButton.html'
    };
  }

  angular.module('tg.connectButton', [])
    .directive('connectButton', ConnectButtonDirective);
})();
