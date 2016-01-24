(function () {
  angular.module('tg.Controllers')
    .controller('AuthCtrl', AuthCtrl);

  function AuthCtrl($rootScope, SessionUser, $log, $location) {
    SessionUser.get(function (user) {
      $rootScope.isAuthenticated = true;
      $rootScope.user = user;
    }, function (err) {
      $log.error('Failed to get auth info');

      $rootScope.isAuthenticated = false;
      delete $rootScope.user;

      // Redirect to out of app login
      $location.href = '/login';
      $location.reload();
    });
  }
})();
