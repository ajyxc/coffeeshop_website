(function() {
  'use strict';

  angular.module('app.core.services')
    .factory('CustomerService', [
      '$q', '$resource', '$http', '$log',
      CustomerService
    ]);

  function CustomerService($q, $resource, $http, $log) {
    var data = $resource(
      'http://localhost:8080/customer/:accountId/:companyId', {
        accountId: '@accountId',
        companyId: '@companyId'
      }, {
        update: {
          method: 'PUT'
        }
      });

    /**
     * Return the customer records joined with their account records.
     *
     * @param  {Object}  attributes Attributes to filter by.
     * @return {Promise}            A promise that is resolved with an array of
     *                              records.
     */
    data.accounts = function(attributes) {
      return $http.get(
          'http://localhost:8080/customer/accounts', {
            params: attributes
          })
        .then(function(response) {
          return response.data;
        });
    }

    /**
     * Return the customer records joined with their company records.
     *
     * @param  {Object}  attributes Attributes to filter by.
     * @return {Promise}            A promise that is resolved with an array of
     *                              records.
     */
    data.companies = function(attributes) {
      return $http.get(
          'http://localhost:8080/customer/companies', {
            params: attributes
          })
        .then(function(response) {
          return response.data;
        });
    }

    return data;
  }
})();
