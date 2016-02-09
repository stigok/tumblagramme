(function () {
  angular.module('tg.Controllers')
    .controller('PresetCtrl', PresetCtrl);

  function PresetCtrl($scope, $rootScope, $routeParams, Preset, PresetEvents, $log, Tumblr, $location) {
    $scope.blogs = Tumblr.blogs();

    // Determine if it's a new or existing item
    if ($routeParams.presetId) {
      $scope.preset = Preset.get({id: $routeParams.presetId});
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

      // Redirect only if it's a new object
      // if (!$routeParams.presetId) {
      //   $location.url('/preset/' + obj._id);
      // }
      $location.url('/');
    }

    $scope.saveChanges = function () {
      $scope.preset.$save({id: $routeParams.presetId}, successCallback, mongooseErrorCallback);
    };
  }
})();
