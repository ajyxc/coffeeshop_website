(function() {
  'use strict';

  angular.module('app.core.services')
    .factory('PurchaseService', ['$q', '$resource','$http', '$log', PurchaseService]);

  function PurchaseService($q, $resource,$http, $log) {
    var data = $resource('http://localhost:8080/purchase/:purchaseId', {
      purchaseId: '@purchaseId'
    }, {
      update: {
        method: 'PUT'
      }
    });


    data.accountsManiacs = function(companyId) {
      return $http.get(
          'http://localhost:8080/purchase/top-buyers/' + companyId)
        .then(function(response) {
          return response.data;
        });
    }


    /**
     * Return the average purchases for each customer
     */
    data.avgPurchase = function(companyId) {
      return $http.get(
        'http://localhost:8080/purchase/avg/' + companyId)
        .then(function(response) {
          return response.data;
        });
    }

    data.maxAvgPurchase = function(companyId) {
      return $http.get(
          'http://localhost:8080/purchase/maxAvg/' + companyId)
        .then(function(response) {
          return response.data;
        });
    }

    return data;
  }
})();
