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
          var json = JSON.parse(rejection.data);

          // Replace string 'auth' with check for hostname of this server
          if (rejection.status === 401 && json.provider === 'tumblagramme') {
            $log.log('Login is required');
            $rootScope.$broadcast(AuthEvent.loginRequired, rejection);
          }

          // Otherwise, default behaviour
          return $q.reject(rejection);
        }
      };
    });
  }
})();
