(function () {
  var module = angular.module('tg.Controllers', ['underscore']);

  function chunk(arr, size) {
    var newArr = [];
    for (var i = 0; i < arr.length; i += size) {
      newArr.push(arr.slice(i, i + size));
    }
    return newArr;
  }

  function dropdown($scope, name) {
    $scope[name + 'DropdownOpened'] = false;
    $scope[name + 'Dropdown'] = function () {
      $scope[name + 'DropdownOpened'] = !$scope[name + 'DropdownOpened'];
    };
  }

  module.controller('NavigationController', function ($scope, User) {
    $scope.user = User.get();

    dropdown($scope, 'tags');
    dropdown($scope, 'stats');
    dropdown($scope, 'account');
  });

  module.controller('IndexController', function ($scope) {
    $scope.message = 'This is the index controller!';
  });

  module.controller('LoginController', function ($scope) {
    $scope.login = function () {
      console.error('Not implemented');
    };
    $scope.register = function () {
      console.error('Not implemented');
    };
  });

  module.controller('FeedController', ['$scope', '$routeParams', 'User', 'Instagram', function ($scope, $routeParams, User, Instagram) {
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
  }]);

  module.controller('InstagramResourceController', function ($scope) {
    $scope.share = function () {
      Tumblr.queue({post: $scope.post})
    };

    $scope.browseUser = function () {
      console.log('browsing');
    };

    $scope.openInstagram = function () {
      console.log('navigateToInstagram');
    };
  });
})();
