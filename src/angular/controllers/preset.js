(function () {
  angular.module('tg.Controllers')
    .controller('PresetCtrl', PresetCtrl);

  function PresetCtrl($scope, $rootScope, $routeParams, Preset, PresetEvents, $log) {
    $scope.presets = Preset.query();

    // Update collection on item update
    $scope.$on(PresetEvents.updated, function () {
      $scope.presets = Preset.query();
    });

    // Determine if it's a new or existing item
    if ($routeParams.id) {
      $scope.preset = Preset.get({id: $routeParams.id});
    } else {
      $scope.preset = new Preset();
    }

    // Schema validation exceptions
    function mongooseErrorCallback(err) {
      if (err.status === 406) {
        $log.log('mongooseErrorCallback', err.data);
        $scope.error = 'Form validation failed. Check all fields for errors.';
        $scope.errors = err.data.errors;
      } else {
        $scope.error = 'An error occured while saving the object';
        $log.error('err on save status %d', err.status, err);
      }
    }

    function successCallback(obj) {
      $scope.error = null;
      $scope.errors = [];
      $rootScope.$broadcast(PresetEvents.updated, obj);
    }

    $scope.saveChanges = function () {
      $scope.preset.$save({id: $routeParams.id || null}, successCallback, mongooseErrorCallback);
    };
  }
})();
