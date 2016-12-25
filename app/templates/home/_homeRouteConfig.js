(function () {
  'use strict';
  angular.module('<%=moduleName%>').config(function ($stateProvider) {
      $stateProvider.state('home', {
        url: '/home',
        templateUrl: 'home/home.html',
        controller: 'homeCtrl',
        controllerAs: 'home'
      });
    });
})();
