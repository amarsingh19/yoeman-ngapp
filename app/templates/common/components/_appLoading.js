
(function() {
"use strict";
  

  /**
   * @ngdoc directive
   * @name appLoading
   * @description
   * # appLoading
   * Directive of the <%=moduleName%>
   */
  angular.module('<%=moduleName%>').directive('appLoading', function () {
    console.log('inside appLoading');
      return {
        template: '<div>&nbsp;</div>',
        replace: true,
        restrict: 'E'
      };
    });
})();

