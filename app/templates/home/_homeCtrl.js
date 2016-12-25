(function() {
  'use strict';

  /**
   * @ngdoc controller
   * @name homeCtrl
   * @description
   * # homeCtrl
   * Controller of the <%=moduleName%>
   */
  angular.module('<%=moduleName%>')
    .controller('homeCtrl', function () {
      var vm = this;
      var _title = '';
      Object.defineProperties(vm, {
        Title: {
          get: function () {
            return _title;
          },
          set: function (val) {
            _title = val;
          }
        }
      });

function initializeCtrl() {
  vm.Title = 'Welcome to the test application!';
}
      initializeCtrl();
    });
})();

