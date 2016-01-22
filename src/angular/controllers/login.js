(function () {
  angular.module('tg.Controllers')
    .controller('LoginCtrl', LoginCtrl);

  function LoginCtrl($rootScope, $scope, $uibModal, AuthEvent, $log) {
    var modalOpened = false;
    $scope.openModal = function () {
      var modal = $uibModal.open({
        templateUrl: '/templates/login.html',
        controller: 'LoginModalCtrl'
      });

      modal.result.then(function () {
        $log.log('on modal closed normally');
      }, function () {
        modal.close();
        $log.log('on modal dismissed by cancel');
      });
    };

    $scope.openConnectModal = function () {
      $uibModal.open({
        templateUrl: '/templates/apiAuth.html',
        controller: function ($route) {
          $scope.refresh = function () {
            $route.reload();
          };
        }
      });
    };

    $rootScope.$on(AuthEvent.loginRequired, function ($event, data) {
      $log.log('login required', data);
      if (!modalOpened) {
        modalOpened = true;
        $scope.openModal();
      }
    });

    $rootScope.$on(AuthEvent.login, function () {
      $scope.openConnectModal();
    });
  }
})();
