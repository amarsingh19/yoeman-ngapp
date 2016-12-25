(function () {
  'use strict';
  angular.module('<%=moduleName%>', ['ui.router'])
    .config(function () {
      console.log('App Configuration.');
    })
    .run(function () {
      console.log('App running...');
    });

  function initApp() {
   console.log('App initialized...');
  }

  initApp();
})();
