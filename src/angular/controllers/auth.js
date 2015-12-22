(function () {
  angular.module('tg.Controllers')
    .controller('AuthCtrl', ['$rootScope', '$http', AuthCtrl]);

  function AuthCtrl($rootScope, $http) {
    $rootScope.isAuthenticated = false;
    $http.get('/api/tumblagramme/ping')
      .success(function (res) {
        $rootScope.isAuthenticated = (res.status === 200);
      })
      .error(function () {
        $rootScope.isAuthenticated = false;
      })
      .finally(function () {
        $rootScope.$broadcast('event:auth-stateChanged', $rootScope.isAuthenticated);
      });
  }
})();
