(function () {
  angular.module('tg.tagSelector')
  .directive('tagSelector', function () {
    return {
      restrict: 'E',
      controller: 'TagSelectorCtrl',
      scope: {
        ngModel: '=ngModel'
      },
      templateUrl: '/templates/tagSelector.html'
    };
  });
})();
