describe("IndexController", function () {

  beforeEach(module('tg'))

  it("says hello world", inject(function ($controller) {
    var scope = {}
    var ctrl = $controller("IndexController", {$scope : scope});
    expect(scope.message).to.equal("hello")
  }))
})
