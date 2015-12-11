describe("Midway: Testing Modules", function() {
  describe("App Module:", function() {
    let module;

    before('set up module', function () {
      module = angular.module('tg');
    });

    it('should be registered', function () {
      module.should.not.equal(null);
    });

    describe('Dependencies', function () {
      let deps;
      let hasModule = function (m) {
        return deps.indexOf(m) >= 0;
      };

      before(function () {
        deps = module.value('tg').requires;
      });

      it('should depend on Controllers', function () {
        hasModule('tg.Controllers').should.equal(true);
      });

      it('should depend on Directives', function () {
        hasModule('tg.Directives').should.equal(true);
      });

      it('should depend on Services', function () {
        hasModule('tg.Services').should.equal(true);
      });
    });
  });
});
