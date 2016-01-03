(function () {
  angular.module('tg.connectButton')
    .directive('connectButton', ConnectButtonDirective);

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
})();
