(function () {
  var module = angular.module('tg.Services');

  module.factory('Utils', function () {
    return {
      chunk: function (arr, size) {
        var newArr = [];
        for (var i = 0; i < arr.length; i += size) {
          newArr.push(arr.slice(i, i + size));
        }
        return newArr;
      }
    };
  });
})();
