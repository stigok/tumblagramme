(function () {
  angular.module('tg.Controllers')
    .controller('PresetCtrl', PresetCtrl);

  function PresetCtrl($scope, User, Preset, $routeParams, $log) {
    // var presets = Preset.query();
    // $scope.presets = presets;

    // if ($routeParams.id) {
    //   var preset = Preset.get({id: $routeParams.id});
    //   $scope.preset = preset;
    //   $scope.openPreset(preset.id);
    // }

    // $scope.newPreset = function () {
    //   $scope.preset = {};
    //   $scope.openPreset();
    // };

    // $scope.openPreset = function (id) {
    //   $log.log('opening preset', id);
    // };

    $scope.savePreset = function () {
      var preset = new Preset({
        name: $scope.name,
        blogId: $scope.blogId,
        instagramAccountId: $scope.instagramAccountId,
        autoLike: $scope.autoLike,
        caption: $scope.caption,
        instagramTags: $scope.instagramTags,
        defaultTags: $scope.defaultTags
      });

      preset.$save(function (p) {
        $log.log('save success', p);
      }, function (err) {
        $scope.error = err;
        $log.error('save preset failed with err', err);
      });
    };
  }
})();
