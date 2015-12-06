describe('FeedController', function () {

  let scope;
  let ctrl;

  beforeEach(module('tg'));

  beforeEach(inject(function ($controller) {
    scope = {};
    ctrl = $controller('FeedController', {$scope: scope});
  }));

  it('should have its scope set', function () {
    scope.should.not.be.equal({});
  });

  it('gets the latest posts', function () {
    scope.posts.should.be.ok();
    scope.posts.should.be.an.Array();
    scope.posts.length.should.equal(1);
  });
});
