(function () {
  'use strict';

  describe('Service: <%=serviceName%>', function () {
    var service;

    // load the controller's module
    beforeEach(module('<%=moduleName%>'));

    beforeEach(inject(function (_<%=serviceName%>_) {
      service = _<%=serviceName%>_;
    }));

    it('to be defined', function () {
      expect(!!service).toBe(true);
    });
  });
})();
