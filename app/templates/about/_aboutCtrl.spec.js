
(function() {
"use strict";



describe('Controller: aboutCtrl', function () {
  var aboutCtrl, scope;

  beforeEach(module('<%=moduleName%>'));

  
  beforeEach(inject(function ($rootScope, $controller) {
    aboutCtrl = $controller('aboutCtrl', {$scope:$rootScope.$new()});
  }));

  it('to be defined', function () {
    expect( aboutCtrl).toBeDefined();
  });
});
})();

