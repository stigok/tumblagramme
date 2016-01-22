(function () {
  angular.module('tg.Controllers')
    .controller('LoginModalCtrl', LoginModalCtrl);

  function LoginModalCtrl($scope, $uibModalInstance, $http, authService) {
    $scope.ok = function () {
      $http.post(
        '/api/tumblagramme/auth',
        {
          username: $scope.username || '',
          password: $scope.password || ''
        },
        {
          ignoreAuthModule: true
        }
      ).then(authSuccess, authFailed);
    };

    function authSuccess(data) {
      authService.loginConfirmed(data);
      $uibModalInstance.dismiss('reason');
    }

    function authFailed() {
      $scope.password = '';
      $scope.error = 'Authentication failed. Try again with different credentials.';
    }

    function registrationSuccess() {
      $scope.success = 'Registration successfull. Please re-enter your password.';
    }

    function registrationFailed() {
      $scope.error = 'Registration failed.';
    }

    $scope.register = function () {
      $http.post('/api/tumblagramme/register', {
        username: $scope.username,
        password: $scope.password
      }, {
        ignoreAuthModule: true
      }).then(registrationSuccess, registrationFailed);
    };

    $scope.cancel = function () {
      $scope.error = null;
      $uibModalInstance.dismiss('cancel');
    };
  }
})();
