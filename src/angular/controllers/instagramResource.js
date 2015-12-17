(function () {
  angular.module('tg.Controllers', ['underscore'])
    .controller('InstagramResource', [
      '$scope', 'Tumblr',
      function ($scope, Tumblr) {
        $scope.share = function () {
          Tumblr.queue({post: $scope.post});
        };

        $scope.browseUser = function () {
          console.log('browsing');
        };

        $scope.openInstagram = function () {
          console.log('navigateToInstagram');
        };
      }
    ]);
})();
