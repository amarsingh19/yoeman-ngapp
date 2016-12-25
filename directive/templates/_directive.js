(function () {
  'use strict';

  /**
   * @ngdoc directive
   * @name <%=moduleName%>:<%=directiveName%>
   * @description
   * A component for module <%=moduleName%>
   *
   * <b>directive:</b> <%=directiveName%>
   *
   * <b>controller:</b> <%=directiveName%>Ctrl
   *
   * <b>view:</b> <%=directiveMarkup%>
   *
   * @example
   <example module="<%=moduleName%>">
   <file name="index.html">
   <<%=directiveMarkup%>></<%=directiveMarkup%>>
   </div>
   </file>
   </example>
   */
  angular.module('<%=moduleName%>')
    .directive('<%=directiveName%>', function () {
      return {
        templateUrl: 'common/components/<%=directiveFileName%>/<%=directiveFileName%>.html',
        replace: true,
        restrict: 'E',
        controller: '<%=directiveName%>Ctrl',
        controllerAs: 'ctrl',
        bindToController: true
      };
    })
    .controller('<%=directiveName%>Ctrl', function () {
      var vm = this;

      function activate() {
        vm.test = 'test';
      }

      activate();
    });
})();

