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
    $scope.user = User;

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

  module.controller('FeedController', ['$q', '$scope', '$routeParams', 'User', 'Instagram', function ($q, $scope, $routeParams, User, Instagram) {
    $scope.currentTag = $routeParams.tag || null;
    $scope.posts = [];

    if ($scope.currentTag) {
      $scope.tags = [$scope.currentTag];
    } else {
      $scope.tags = User.favoriteTags;
    }

    // Handle incoming posts
    $scope.$watchCollection('posts', function (arr) {
      var unique = _.unique(arr, false, 'id');
      $scope.chunkedPosts = chunk(unique, 3);
      $scope.dupesFiltered = $scope.posts.length - unique.length;
    });

    // Get recent media for each tag
    _.each($scope.tags, function (tag) {
      Instagram.query({tag: tag}, function (results) {
        $scope.posts = $scope.posts.concat(results);
      });
    });
  }]);

    $scope.share = function (id) {
      console.log(id);
      // Tumblr.queue({post: $scope.post})
    };

    $scope.browseUser = function () {
      console.log('browsing');
    };

    $scope.openInstagram = function () {
      console.log('navigateToInstagram');
    };
  }]);
})();
