(function () {
  angular.module('tg.Controllers')
    .controller('FeedCtrl', FeedCtrl);

  function FeedCtrl($scope, $routeParams, Preset, Instagram, Utils) {
    $scope.posts = [];

    // Only one of these are set each request
    // Using scope vars to be explicit about it, and for use in the view
    $scope.presetId = $routeParams.presetId;

    $scope.tag = $routeParams.tag || null;
    $scope.userId = $routeParams.userId || null;

    Preset.get({id: $scope.presetId}, function (preset) {
      $scope.tags = preset.instagram.tags;

      if ($scope.userId) {
        Instagram.recentUserMedia({userId: $scope.userId}, function (results) {
          $scope.posts = results;
        });
      } else if ($scope.tag) {
        Instagram.recentTaggedMedia({tag: $scope.tag}, function (results) {
          $scope.posts = results;
        });
      } else {
        // A preset may contain several tags.
        // Loop trough and append to the $scope.posts array
        _.each($scope.tags, function (tag) {
          Instagram.recentTaggedMedia({tag: tag}, function (results) {
            Array.prototype.push.apply($scope.posts, results);
          });
        });
      }
    });

    // Sort and chunk all posts as they are added to the array
    $scope.$watchCollection('posts', function (arr) {
      var unique = _.unique(arr, false, 'id');
      $scope.chunkedPosts = Utils.chunk(unique, 3);
      $scope.dupesFiltered = $scope.posts.length - unique.length;
    });
  }
})();
