(function () {
  angular.module('tg.Controllers')
    .controller('AccountCtrl', ['$scope', 'Tumblr', AccountCtrl])
    .controller('LogoutCtrl', ['$http', '$location', 'authService', LogoutCtrl]);

  function AccountCtrl($scope, Tumblr) {
    $scope.blogs = Tumblr.blogs();
  }

  function LogoutCtrl($http, $location, authService) {
    $http.get('/api/tumblagramme/logout')
      .success(function () {
        authService.logoutPerformed();
      })
      .error(function (err) {
        console.error('Logout was unsuccessful...', err);
      })
      .finally(function () {
        return $location.url('/');
      });
  }
})();
