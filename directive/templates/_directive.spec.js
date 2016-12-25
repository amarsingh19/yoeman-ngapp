(function () {
  'use strict';

  describe('Component: <%=directiveMarkup%>', function () {
    var ctrl, scope;

    // load the controller's module
    beforeEach(module('<%=moduleName%>'));

    beforeEach(inject(function ($compile, $controller, $rootScope) {
      scope = $rootScope.$new();
      ctrl = $controller('<%=directiveName%>Ctrl', {
        $scope: scope
      });
    }));

    it('to be defined', function () {
      expect(ctrl).toBeDefined();
    });
  });
})();
