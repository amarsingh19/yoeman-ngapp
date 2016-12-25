(function () {
  'use strict';
  var app = angular.module('<%=moduleName%>').config(function ($stateProvider) {
      $stateProvider.state('about', {
        url: '/about',
        templateUrl: 'about/about.html',
        controller: 'aboutCtrl',
        controllerAs: 'about'
      });
    });
})();
