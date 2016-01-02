(function () {
  angular.module('tg.Controllers')
    .controller('PresetCtrl', PresetCtrl);

  function PresetCtrl($scope, User, Preset, $routeParams, $log) {
    $scope.presets = Preset.query();

    if ($routeParams.id) {
      $scope.preset = Preset.get({id: $routeParams.id});
    } else {
      $scope.preset = new Preset();
    }

    $scope.saveChanges = function () {
      if ($routeParams.id) {
        Preset.update({id: $scope.preset._id}, $scope.preset);
      } else {
        Preset.save($scope.preset, function (obj) {
          $scope.presets.push(obj);
        }, function (err) {
          if (err.status === 406) {
            $scope.errors = err.data.errors;
          } else {
            $scope.error = err.data.name;
          }
          $log.error(err);
        });
      }
    };
  }
})();
