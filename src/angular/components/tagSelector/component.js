(function () {
  function tagSelectorDirective() {
    return {
      restrict: 'E',
      controller: 'TagSelectorCtrl',
      scope: {
        ngModel: '=ngModel',
        tagType: '@tagType'
      },
      templateUrl: '/templates/tagSelector.html'
    };
  }

  function TagSelectorCtrl($scope) {
    $scope.error = '';
    $scope.ngModel = $scope.ngModel || [];

    $scope.addTag = function () {
      if ($scope.tagName.length < 3) {
        $scope.error = 'Tag too short';
        return;
      }
      if ($scope.ngModel.indexOf($scope.tagName) !== -1) {
        $scope.error = 'Tag already exists';
        return;
      }
      if (($scope.tagType === 'instagram' && !$scope.tagName.match(/^[a-zA-Z0-9-_]{3,}$/i)) ||
          ($scope.tagType === 'tumblr' && !$scope.tagName.match(/^[a-zA-Z0-9\-_?!&' ]{3,}$/i))) {
        $scope.error = 'Invalid tag format';
        return;
      }

      // Validation successfull
      $scope.ngModel.push($scope.tagName);
      $scope.tagName = '';
      $scope.error = '';
    };

    $scope.removeTag = function (index) {
      $scope.ngModel = _.filter($scope.ngModel, function (val, i) {
        return (i !== index);
      });
    };

    $scope.onTagInputKeyPress = function ($event) {
      // Treat both enter and comma as submitting the tag
      // 13: enter, 44: comma
      if ([13, 44].indexOf($event.keyCode) >= 0) {
        $event.preventDefault();
        $event.stopPropagation();
        $scope.addTag();
      }
    };
  }

  angular.module('tg.tagSelector', [])
    .controller('TagSelectorCtrl', TagSelectorCtrl)
    .directive('tagSelector', tagSelectorDirective);
})();
