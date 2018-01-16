(function() {
  'use strict';

  angular.module('app.core.services')
    .factory('EmployeeService', [
      '$q', '$resource', '$http', '$log',
      EmployeeService
    ]);

  function EmployeeService($q, $resource, $http, $log) {
    var data = $resource(
      'http://localhost:8080/employee/:accountId/:companyId', {
        accountId: '@accountId',
        companyId: '@companyId'
      }, {
        update: {
          method: 'PUT'
        }
      });

    /**
     * Return the employee records joined with their account records.
     *
     * @param  {Object}  attributes Attributes to filter by.
     * @return {Promise}            A promise that is resolved with an array of
     *                              records.
     */
    data.accounts = function(attributes) {
      return $http.get(
          'http://localhost:8080/employee/accounts', {
            params: attributes
          })
        .then(function(response) {
          return response.data;
        });
    }

    /**
     * Return the employee records joined with their company records.
     *
     * @param  {Object}  attributes Attributes to filter by.
     * @return {Promise}            A promise that is resolved with an array of
     *                              records.
     */
    data.companies = function(attributes) {
      return $http.get(
          'http://localhost:8080/employee/companies', {
            params: attributes
          })
        .then(function(response) {
          return response.data;
        });
    }

    return data;
  }
})();
