(function () {
  angular.module('tg.Controllers')
    .controller('FeedCtrl', FeedCtrl);

  function FeedCtrl($scope, $routeParams, SessionUser, Instagram, Utils) {
    $scope.posts = [];

    SessionUser.get(function (user) {
      $scope.user = user;
      $scope.tags = (typeof $routeParams.tag === 'undefined') ? $scope.user.favoriteTags : [$routeParams.tag];
    });

    // Load all media for each tag when $scope.tags is populated
    $scope.$watch('tags', function () {
      _.each($scope.tags, function (tag) {
        Instagram.query({tag: tag}, function (results) {
          $scope.posts = $scope.posts.concat(results);
        });
      });
    });

    // Handle incoming posts
    $scope.$watchCollection('posts', function (arr) {
      var unique = _.unique(arr, false, 'id');
      $scope.chunkedPosts = Utils.chunk(unique, 3);
      $scope.dupesFiltered = $scope.posts.length - unique.length;
    });
  }
})();
