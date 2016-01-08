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

  function InstagramResourceController($scope, $location, $log, Tumblr) {
    $scope.share = function () {
      // Tumblr.queue({post: $scope.post}, function successCallback() {
      //   $scope.isQueued = true;
      // });
      $scope.isQueued = true;
    };

    $scope.browseUser = function () {
      $location.url('/feed/user/' + $scope.post.username);
    };
  }

  angular.module('tg.instagramResource', [])
    .directive('instagramResource', instagramResourceDirective);
})();
