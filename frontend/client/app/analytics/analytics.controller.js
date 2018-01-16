(function() {
  'use strict';

  angular.module('app.analytics')
    .controller('AnalyticsController', [
      '$scope', '$element', 'CustomerService', 'EmployeeService','PurchaseService','ProductService',
      AnalyticsController
    ]);

  function AnalyticsController(
    $scope, $element, CustomerService, EmployeeService, PurchaseService,ProductService
  ) {
    // init
    $scope.companyId = undefined;
    $scope.companies = [];
    $scope.customers = undefined;
    $scope.$promise = [];


    var accountId = 1; // TODO: change this
    var query = EmployeeService.companies({
      accountId: accountId
    });

    query.then(function(data) {
      $scope.companies = data;

      // Select first company
      if (data && data.length) {
        $scope.companyId = data[0].companyid;
      }

      $scope.getAnalytics();
    });



    /**
     * Reloads the customers for the selected company.
     */
    $scope.getAnalytics = function() {
      if (!$scope.companyId) {
        return;
      }

      var customersQuery = PurchaseService.accountsManiacs($scope.companyId);

      $scope.$promise.push(customersQuery);

      customersQuery.then(function(data) {
        $scope.customers = data;
      });

      var MaxQuery = ProductService.maxPrice({
        companyId: $scope.companyId
      });

      MaxQuery.then(function(data) {
        console.log(data);
        $scope.maxPrice = data[0];
      });

      var MinQuery = ProductService.minPrice({
        companyId: $scope.companyId
      });

      MinQuery.then(function(data) {
        console.log(data);
        $scope.minPrice = data[0];
      });

      var AvgQuery = PurchaseService.avgPurchase($scope.companyId);

      AvgQuery.then(function(data) {
        console.log(data);
        $scope.averages = data;
      });

      var MaxAvgQuery = PurchaseService.maxAvgPurchase($scope.companyId);

      MaxAvgQuery.then(function(data) {
        console.log(data);
        $scope.maxAvg = data[0];
      });

    }
  }


})();
