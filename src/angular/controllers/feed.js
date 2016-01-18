(function () {
  angular.module('tg.Controllers')
    .controller('FeedCtrl', FeedCtrl);

  function FeedCtrl($scope, $routeParams, Preset, Instagram, Utils) {
    $scope.posts = [];
    $scope.presetId = $routeParams.presetId;

    Preset.get({id: $scope.presetId}, function (preset) {
      $scope.tags = preset.instagram.tags;

      _.each($scope.tags, function (tag) {
        Instagram.query({tag: tag}, function (results) {
          $scope.posts = $scope.posts.concat(results);
        });
      });
    });

    // Sort and chunk all posts as they are added to the array
    $scope.$watchCollection('posts', function (arr) {
      var unique = _.unique(arr, false, 'id');
      $scope.chunkedPosts = Utils.chunk(unique, 3);
      $scope.dupesFiltered = $scope.posts.length - unique.length;
    });
  }
})();
