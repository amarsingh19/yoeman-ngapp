
(function() {
"use strict";


describe('Controller: homeCtrl', function () {
  var homeCtrl, scope;

  beforeEach(module('<%=moduleName%>'));

  
  beforeEach(inject(function ($rootScope, $controller) {
    homeCtrl = $controller('homeCtrl', {$scope:$rootScope.$new()});
  }));

  it('to be defined', function () {
    expect( homeCtrl).toBeDefined();
  });
  });
})();

