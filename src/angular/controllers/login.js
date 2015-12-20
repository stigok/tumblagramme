(function () {
  angular.module('tg.Controllers')
    .controller('LoginCtrl', ['$rootScope', '$scope', '$uibModal',
      function ($rootScope, $scope, $uibModal) {
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

        $rootScope.login = $scope.openModal;

        $rootScope.$on('event:auth-triggerModal', function () {
          $scope.openModal();
        });
      }
    ]);
})();
