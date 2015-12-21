(function () {
  angular.module('tg.Controllers')
    .controller('LoginModalCtrl', ['$scope', '$uibModalInstance', '$http', LoginModalCtrl]);

  function LoginModalCtrl($scope, $uibModalInstance, $http) {
    $scope.ok = function () {
      $http.post('/api/tumblagramme/auth', {
        username: $scope.username || '',
        password: $scope.password || ''
      }, {
        ignoreAuthModule: true
      }).then(authSuccess, authFailed);
    };

    function authSuccess(data) {
      console.log('authSuccess', data);
    }

    function authFailed(data) {
      console.log('authFailed', data);
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
      $uibModalInstance.dismiss('cancel');
    };
  }
})();
