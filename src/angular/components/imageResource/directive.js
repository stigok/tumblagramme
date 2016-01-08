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
    $log.log($scope.imageUrl);
    $http.get($scope.imageUrl).then(function successCallback(data) {
      $scope.loadedImageUrl = $scope.imageUrl;
      $log.log('imageResource loading complete', data);
    }, function errorCallback(err) {
      $log.log('imageResource failed to load', err);
    });
  }

  angular.module('tg.imageResource', [])
    .directive('imageResource', imageResourceDirective);
})();
