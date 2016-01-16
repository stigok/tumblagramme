(function () {
  function imageResourceDirective() {
    return {
      restrict: 'E',
      controller: ImageResourceController,
      templateUrl: '/templates/imageResource.html',
      scope: {
        imageUrl: '@imageUrl'
      }
    };
  }

  function ImageResourceController($scope, $http, $log) {
    $http.get($scope.imageUrl).then(function successCallback() {
      $scope.loadedImageUrl = $scope.imageUrl;
    }, function errorCallback(err) {
      $log.log('imageResource failed to load', err);
    });
  }

  angular.module('tg.imageResource', [])
    .directive('imageResource', imageResourceDirective);
})();
