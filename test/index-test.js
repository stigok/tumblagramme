describe('IndexCtrl', function () {
  beforeEach(module('tg'));

  it('says hello world', inject(function ($controller) {
    let scope = {};
    let ctrl = $controller('IndexCtrl', {$scope: scope});
    scope.message.should.equal('Hello, world!');
  }));
});
