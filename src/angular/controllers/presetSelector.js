(function () {
  angular.module('tg.Controllers')
    .controller('PresetSelectorCtrl', PresetSelectorCtrl);

  function PresetSelectorCtrl($scope, SessionUser, Preset, PresetEvents) {
    $scope.user = SessionUser.get();
    $scope.presets = Preset.query();

    $scope.$on(PresetEvents.updated, function () {
      $scope.presets = Preset.query();
    });

    $scope.selectPreset = function (id) {
      $scope.user.activePresetId = id;
      $scope.user.$save();
    };
  }
})();
