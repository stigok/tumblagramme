(function () {
  var auth = angular.module('tg.Auth', ['ngCookies']);

  auth.config(function ($httpProvider) {
    $httpProvider.interceptors.push(function ($q, $location) {
      return {
        'response': function (response) {
          return response;
        },
        'response-error': function (response) {
          if (response.status === 401) {
            $location.path('/login');
            return $q.reject(response);
          }

          return $q.reject(response);
        }
      };
    });
  });
})();
