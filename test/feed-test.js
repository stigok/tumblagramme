describe('FeedController', function () {

  let scope;
  let ctrl;

  beforeEach(module('tg'));

  beforeEach(inject(function ($controller) {
    scope = {};
    ctrl = $controller('FeedController', {$scope: scope});
  }));

  it('should have its scope set', function () {
    scope.should.be.an.Object();
    scope.should.not.be.equal({});
  });

  it('scope should contain a filled posts array', function () {
    scope.posts.should.be.ok();
    scope.posts.should.be.an.Array();
    scope.posts.should.not.equal([]);
    scope.posts.length.should.equal(1);
  });
});
