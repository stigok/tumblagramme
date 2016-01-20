(function () {
  angular.module('tg.Controllers')
    .controller('HistoryCtrl', HistoryCtrl);

  function HistoryCtrl($scope, $rootScope, History, Tumblr) {
    $scope.history = History.query();

    $scope.rollback = function (id) {
      Tumblr.dequeue({id: id}, function () {
        $scope.history = History.query();
      });
    };
  }
})();
