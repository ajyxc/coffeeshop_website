(function() {
  'use strict';

  angular.module('app.core.services')
    .factory('ProductService', ['$q', '$resource', '$http', '$log', ProductService]);

  function ProductService($q, $resource, $http, $log) {
    var data = $resource('http://localhost:8080/product/:productId', {
      productId: '@productId'
    }, {
      update: {
        method: 'PUT'
      }
    });

    /**
     * Return the customer records joined with their company records.
     *
     * @param  {string}  companyId Target company ID.
     * @return {promise}           A promise that is resolved with an array of
     *                             records.
     */
    data.maxPrice = function(attributes) {
      return $http.get(
          'http://localhost:8080/product/max', {
            params: attributes,
          })
        .then(function(response) {
          return response.data;
        });
    }


    /**
     * Return the customer records joined with their company records.
     *
     * @param  {string}  companyId Target company ID.
     * @return {promise}           A promise that is resolved with an array of
     *                             records.
     */
    data.minPrice = function(attributes) {
      return $http.get(
          'http://localhost:8080/product/min', {
            params: attributes,
          })
        .then(function(response) {
          return response.data;
        });
    }

    return data;
  }
})();
