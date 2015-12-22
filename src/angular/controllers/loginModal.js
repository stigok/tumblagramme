(function () {
  angular.module('tg.Controllers')
    .controller('LoginModalCtrl', ['$scope', '$uibModalInstance', '$http', 'authService', LoginModalCtrl]);

  function LoginModalCtrl($scope, $uibModalInstance, $http, authService) {
    $scope.ok = function () {
      $http.post('/api/tumblagramme/auth', {
        username: $scope.username || '',
        password: $scope.password || ''
      }, {ignoreAuthModule: true})
        .success(authSuccess)
        .error(authFailed);
    };

    function authSuccess(data) {
      authService.loginConfirmed(data);
      $uibModalInstance.dismiss('authSuccess');
    }

    function authFailed(data) {
      console.log('Authentication failed', data);
      $scope.password = '';
      $scope.error = 'Authentication failed. Try again with different credentials.';
    }

    $scope.register = function () {
      $http.post('/api/tumblagramme/register', {
        username: $scope.username,
        password: $scope.password
      }, {
        ignoreAuthModule: true
      }).then(function (res) {
        console.log('reg complete', res);
      }, function (err) {
        $scope.error = 'Registration failed.';
        console.error(err);
      });
    };

    $scope.cancel = function () {
      $scope.error = null;
      $uibModalInstance.dismiss('cancel');
    };
  }
})();
