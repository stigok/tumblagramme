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

    $scope.cancel = function () {
      $uibModalInstance.dismiss('cancel');
    };
  }
})();
