(function () {
  angular.module('tg.Authentication', ['tg.Authentication.Tools'])
    .factory('authService', authService)
    .config(moduleConfig)
    .factory('AuthEvent', function () {
      return {
        login: 'event:auth.login',
        logout: 'event:auth.logout',
        cancelled: 'event:auth.cancelled',
        loginRequired: 'event:auth.loginRequired',
        forbidden: 'event:auth.forbidden'
      };
    });

  angular.module('tg.Authentication.Social', [])
    .run(function ($rootScope, $location, AuthEvent, $log, SessionUser) {
      SessionUser.get(function (user) {
        $rootScope.user = user;
      });
      $log.log('run run');

      $rootScope.$on(AuthEvent.loginRequired, function () {
        $log.log('login required');
        if (!$rootScope.user) {
          return $location.path('/login').replace();
        }
      });
      $rootScope.$on(AuthEvent.login, function ($event, user) {
        $log.log('logged in', user);
        $rootScope.user = user;
        return $location.path('/account').replace();
      });
      $rootScope.$on('$routeChangeStart', function ($event, next) {
        $log.log('routeChangeStart', next.originalPath);
        if (next.skipRedirect) {
          return next;
        }
        if (!$rootScope.user || !$rootScope.user.tumblr || !$rootScope.user.instagram) {
          return $location.path('/account').replace();
        }
      });
    });

  angular.module('tg.Authentication.Tools', [])
    .factory('httpBuffer', httpBuffer);

  function authService($rootScope, $http, httpBuffer, AuthEvent) {
    return {
      /**
       * Call this function to indicate that authentication was successfull and trigger a
       * retry of all deferred requests.
       * @param data an optional argument to pass on to $broadcast which may be useful for
       * example if you need to pass through details of the user that was logged in
       * @param configUpdater an optional transformation function that can modify the
       * requests that are retried after having logged in.  This can be used for example
       * to add an authentication token.  It must return the request.
       */
      loginConfirmed: function (data, configUpdater) {
        var updater = configUpdater || function (config) {
          return config;
        };
        $rootScope.$broadcast(AuthEvent.login, data.data);
        $rootScope.user = data.data;
        $rootScope.isAuthenticated = true;
        httpBuffer.retryAll(updater);
      },

      logoutPerformed: function () {
        $rootScope.$broadcast(AuthEvent.logout);
        $rootScope.user = null;
        $rootScope.isAuthenticated = false;
      },

      /**
       * Call this function to indicate that authentication should not proceed.
       * All deferred requests will be abandoned or rejected (if reason is provided).
       * @param data an optional argument to pass on to $broadcast.
       * @param reason if provided, the requests are rejected; abandoned otherwise.
       */
      loginCancelled: function (data, reason) {
        httpBuffer.rejectAll(reason);
        $rootScope.$broadcast(AuthEvent.cancelled, data);
      }
    };
  }

  /**
   * $http interceptor.
   * On 401 response (without 'ignoreAuthModule' option) stores the request
   * and broadcasts AuthEvent.loginRequired
   * On 403 response (without 'ignoreAuthModule' option) discards the request
   * and broadcasts AuthEvent.forbidden
   */
  function moduleConfig($httpProvider) {
    $httpProvider.interceptors.push(function ($rootScope, $q, httpBuffer, AuthEvent, $log) {
      return {
        responseError: function (rejection) {
          var config = rejection.config || {};
          if (!config.ignoreAuthModule) {
            switch (rejection.status) {
              case 401:
                var deferred = $q.defer();
                httpBuffer.append(config, deferred);
                $rootScope.$broadcast(AuthEvent.loginRequired, rejection);
                return deferred.promise;
              case 403:
                $rootScope.$broadcast(AuthEvent.forbidden, rejection);
                break;
              default:
                break;
            }
          }
          // otherwise, default behaviour
          return $q.reject(rejection);
        }
      };
    });
  }

  function httpBuffer($injector) {
    // Holds all the requests, so they can be re-requested in future.
    var buffer = [];

    // Service initialized later because of circular dependency problem.
    var $http;

    function retryHttpRequest(config, deferred) {
      function successCallback(response) {
        deferred.resolve(response);
      }
      function errorCallback(response) {
        deferred.reject(response);
      }
      $http = $http || $injector.get('$http');
      $http(config).then(successCallback, errorCallback);
    }

    return {
      // Appends HTTP request configuration object with deferred response attached to buffer.
      append: function (config, deferred) {
        buffer.push({
          config: config,
          deferred: deferred
        });
      },

      // Abandon or reject (if reason provided) all the buffered requests.
      rejectAll: function (reason) {
        if (reason) {
          for (var i = 0; i < buffer.length; ++i) {
            buffer[i].deferred.reject(reason);
          }
        }
        buffer = [];
      },

      // Retries all the buffered requests and clears the buffer.
      retryAll: function (updater) {
        for (var i = 0; i < buffer.length; ++i) {
          retryHttpRequest(updater(buffer[i].config), buffer[i].deferred);
        }
        buffer = [];
      }
    };
  }
})();
