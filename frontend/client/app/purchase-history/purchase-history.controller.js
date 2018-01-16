(function() {
  'use strict';

  angular.module('app.purchase-history')
    .controller('PurchaseHistoryController', [
      '$scope', '$element', 'CustomerService', 'PurchaseService',
      'PurchaseItemService',
      PurchaseHistoryController
    ]);

  function PurchaseHistoryController(
    $scope, $element, CustomerService, PurchaseService, PurchaseItemService
  ) {
    // init
    $scope.companyId = undefined; // Selected companyId
    $scope.selectedPurchases = []; // Selected purchaseIds
    $scope.companies = [];
    $scope.purchases = [];
    $scope.purchaseItems = [];
    $scope.purchasePromise = [];
    $scope.purchaseItemPromise = [];

    var accountId = 1;
    var query = CustomerService.companies({
      accountId: accountId // TODO: change this
    });

    query.then(function(data) {
      $scope.companies = data;

      // Select first company
      if (data && data.length) {
        $scope.companyId = data[0].companyid;
      }

      $scope.getPurchases();
    });

    /**
     * Reloads the purchases for the selected company
     */
    $scope.getPurchases = function() {
      if (!$scope.companyId) {
        $scope.purchases = [];
        return;
      }

      var purchaseQuery = PurchaseService.query({
        companyId: $scope.companyId,
        accountId: accountId
      });

      $scope.purchasePromise.push(purchaseQuery.$promise);

      purchaseQuery.$promise.then(function(data) {
        $scope.purchases = data;
        $scope.selectedPurchases = [];

        // Select first company
        if (data && data.length) {
          $scope.selectedPurchases[0] = data[0].purchaseid;
        }
      });
    }

    /**
     * Reloads the purchase items for the selected purchase.
     */
    $scope.getPurchaseItems = function() {
      if (!$scope.selectedPurchases || !$scope.selectedPurchases.length) {
        $scope.purchaseItems = [];
        return;
      }

      var purchaseId = $scope.selectedPurchases[0];

      var purchaseItemQuery = PurchaseItemService.products({
        purchaseId: purchaseId,
        accountId: accountId
      });

      $scope.purchaseItemPromise.push(purchaseItemQuery);

      purchaseItemQuery.then(function(data) {
        for (var i = 0; i < data.length; i++) {
          data[i].totalprice = '$' + (parseInt(data[i].unitprice.slice(1)) * data[i].quantity);
        }

        $scope.purchaseItems = data;
      });
    }

    /**
     * Delete a purchase
     */
    $scope.deletePurchase = function(purchaseId) {
      if (!purchaseId) {
        return;
      }

      PurchaseService.delete({
          purchaseId: purchaseId
        })
        .$promise.then(function() {
          $scope.getPurchases();
        });
    }

    /**
     * Delete a purchase item
     */
    $scope.deletePurchaseItem = function(purchaseId, productId) {
      if (!purchaseId || !productId) {
        return;
      }

      PurchaseItemService.delete({
          purchaseId: purchaseId,
          productId: productId
        })
        .$promise.then(function() {
          $scope.getPurchaseItems();
        });
    }

    $scope.$watch('selectedPurchases[0]', function() {
      $scope.getPurchaseItems();
    });
  }

})();
