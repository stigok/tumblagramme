describe('IndexController', function () {
  beforeEach(module('tg'));

  it('says hello world', inject(function ($controller) {
    let scope = {};
    let ctrl = $controller('IndexController', {$scope: scope});
    scope.message.should.equal('Hello, world!');
  }));
});
