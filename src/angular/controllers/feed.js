(function () {
  function chunk(arr, size) {
    var newArr = [];
    for (var i = 0; i < arr.length; i += size) {
      newArr.push(arr.slice(i, i + size));
    }
    return newArr;
  }

  angular.module('tg.Controllers', ['underscore'])
    .controller('FeedController',
      ['$scope', '$routeParams', 'User', 'Instagram',
      function ($scope, $routeParams, User, Instagram) {
        $scope.posts = [];

        User.get(function (user) {
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
          $scope.chunkedPosts = chunk(unique, 3);
          $scope.dupesFiltered = $scope.posts.length - unique.length;
        });
      }
    ]
  );
})();
