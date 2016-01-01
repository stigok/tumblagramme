(function () {
  angular.module('tg.tagSelector', [])
    .controller('TagSelectorCtrl', TagSelectorCtrl);

  function TagSelectorCtrl($scope) {
    $scope.addTag = function () {
      if ($scope.tagName.length >= 3 && $scope.ngModel.indexOf($scope.tagName) === -1) {
        $scope.ngModel.push($scope.tagName);
        $scope.tagName = '';
      }
    };

    $scope.removeTag = function (index) {
      $scope.ngModel = _.filter($scope.ngModel, function (val, i) {
        return (i !== index);
      });
    };

    $scope.onTagInputKeyPress = function ($event) {
      // 13: enter, 44: comma
      if ([13, 44].indexOf($event.keyCode) >= 0) {
        $event.preventDefault();
        $event.stopPropagation();
        $scope.addTag();
      }
    };
  }
})();
