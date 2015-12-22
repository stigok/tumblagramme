(function () {
  angular.module('tg.Controllers', ['underscore'])
    .controller('IndexCtrl', ['$scope', '$http', IndexCtrl]);

  function IndexCtrl($scope, $http) {
    $scope.message = 'This is the index controller!';
    $scope.autoLogin = function () {
      $http.post('/api/tumblagramme/auth', {username: 'stig', password: 'stig'});
    };
  }
})();
