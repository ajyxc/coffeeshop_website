(function() {
  'use strict';

  angular.module('app.core.services')
    .factory('PurchaseItemService', [
      '$q', '$resource', '$http', '$log', PurchaseItemService
    ]);

  function PurchaseItemService($q, $resource, $http, $log) {
    var data = $resource(
      'http://localhost:8080/purchaseitem/:purchaseId/:productId', {
        purchaseId: '@purchaseId',
        productId: '@productId'
      }, {
        update: {
          method: 'PUT'
        }
      });

    /**
     * Return the purchase items joined with their product records.
     *
     * @param  {Object}  attributes Attributes to filter by.
     * @return {Promise}            A promise that is resolved with an array of
     *                              records.
     */
    data.products = function(attributes) {
      return $http.get(
          'http://localhost:8080/purchaseitem/products', {
            params: attributes
          })
        .then(function(response) {
          return response.data;
        });
    }

    return data;
  }
})();
