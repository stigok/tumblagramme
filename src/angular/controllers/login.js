(function () {
  angular.module('tg.Controllers')
    .controller('LoginCtrl', LoginCtrl);

  function LoginCtrl($rootScope, $scope, $uibModal) {
    $scope.openModal = function () {
      var modal = $uibModal.open({
        templateUrl: '/templates/login.html',
        controller: 'LoginModalCtrl'
      });

      modal.result.then(function (username, password) {
        console.log('on modal closed received', username, password);
      }, function () {
        // do nothing on login dismissed
        console.log('modal dismissed with args; ', arguments);
      });
    };

    $rootScope.$on('event:auth-triggerModal', function () {
      $scope.openModal();
    });
  }
})();
