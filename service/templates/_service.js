(function() {
  'use strict';

  /**
   * @ngdoc service
   * @name <%=moduleName%>:<%=serviceName%>
   * @description
   * # <%=serviceName%>
   * Service in the <%=moduleName%>.
   */
  angular.module('<%=moduleName%>')
      .service('<%=serviceName%>', function <%=serviceName%>() {

        return {
          doSomething: doSomething
        };

    /**
     * Does something
     * @param param1 {string} - Parameter
     * @returns {string}
     */
        function doSomething(param1){
          return 'Modified:' + param1;
        }
      });
})();
