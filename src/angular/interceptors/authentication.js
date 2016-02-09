(function () {
  angular.module('tg.Authentication', [])
    .config(moduleConfig)
    .factory('AuthEvent', AuthEvent);

  function AuthEvent() {
    return {
      loginRequired: 'event:auth.loginRequired',
      forbidden: 'event:auth.forbidden'
    };
  }

  function moduleConfig($httpProvider) {
    $httpProvider.interceptors.push(function ($rootScope, $q, AuthEvent, $log) {
      return {
        responseError: function (rejection) {
          $log.error('Response error', rejection.data);

          // Replace string 'auth' with check for hostname of this server
          if (rejection.status === 401) {
            $log.error('Login is required');
            $rootScope.$broadcast(AuthEvent.loginRequired, rejection);
          }

          // Otherwise, default behaviour
          return $q.reject(rejection);
        }
      };
    });
  }
})();
