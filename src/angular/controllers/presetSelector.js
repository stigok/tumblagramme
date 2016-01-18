(function () {
  angular.module('tg.Controllers')
    .controller('PresetSelectorCtrl', PresetSelectorCtrl);

  function PresetSelectorCtrl($scope, SessionUser, Preset, PresetEvents, $log) {
    $scope.user = SessionUser.get();
    $scope.presets = Preset.query();

    $scope.$on(PresetEvents.updated, function () {
      $scope.presets = Preset.query();
    });

    $scope.selectPreset = function (id) {
      $log.log('Do something with this result', id);
    };
  }
})();
