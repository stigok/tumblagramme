(function () {
  function instagramResourceDirective() {
    return {
      restrict: 'E',
      controller: 'InstagramResourceCtrl',
      templateUrl: '/templates/instagramResource.html',
      scope: {
        post: '=post'
      }
    };
  }

  function InstagramResourceCtrl($scope, $location, $log, tumblrQueue, Instagram) {
    // TODO: this is mos def not a good way to get presetId
    $scope.presetId = $scope.$parent.$parent.$parent.presetId;

    $scope.share = function () {
      tumblrQueue($scope.presetId, $scope.post, function success(data) {
        $scope.isQueued = true;
        $log.log('queue complete', data);
      }, function error(err) {
        $log.error('queueing failed', err);
      });
    };

    $scope.browseUser = function () {
      $location.url('/feed/user/' + $scope.post.username);
    };

    $scope.like = function () {
      Instagram.likeMedia({mediaId: $scope.post.id});
    };
  }

  angular.module('tg.instagramResource', [])
    .controller('InstagramResourceCtrl', InstagramResourceCtrl)
    .directive('instagramResource', instagramResourceDirective);
})();
