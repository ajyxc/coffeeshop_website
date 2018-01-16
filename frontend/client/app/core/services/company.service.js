(function() {
  'use strict';

  angular.module('app.core.services')
    .factory('CompanyService', [
      '$q', '$resource', '$log',
      CompanyService
    ]);

  function CompanyService($q, $resource, $log) {
    var data = $resource('http://localhost:8080/company/:companyId', {
      companyId: '@companyId'
    }, {
      update: {
        method: 'PUT'
      }
    });

    return data;
  }
})();
