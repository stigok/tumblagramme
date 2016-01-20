describe('HistoryService', function () {
  let service;

  beforeEach(module('tg'));
  beforeEach(module('tg.Services'));

  beforeEach(inject(function (History) {
    service = History;
  }));

  it('exists', function () {
    service.should.be.a.Function();
  });
});
