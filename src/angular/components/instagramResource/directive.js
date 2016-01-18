(function () {
  function instagramResourceDirective() {
    return {
      restrict: 'E',
      controller: InstagramResourceController,
      templateUrl: '/templates/instagramResource.html',
      scope: {
        post: '=post'
      }
    };
  }

  function InstagramResourceController($scope, $location, $log, tumblrQueue) {
    $scope.share = function () {
      // TODO: this is mos def not a good way to get presetId
      tumblrQueue($scope.$parent.$parent.$parent.presetId, $scope.post, function success(data) {
        $scope.isQueued = true;
        $log.log('queue complete', data);
      }, function error(err) {
        $log.error('queueing failed', err);
      });
    };

    $scope.browseUser = function () {
      $location.url('/feed/user/' + $scope.post.username);
    };
  }

  angular.module('tg.instagramResource', [])
    .directive('instagramResource', instagramResourceDirective);
})();
