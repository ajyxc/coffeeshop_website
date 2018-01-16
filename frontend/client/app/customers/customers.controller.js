(function() {
  'use strict';

  angular.module('app.customers')
    .controller('CustomersController', [
      '$scope', '$element', 'CustomerService', 'EmployeeService',
      CustomersController
    ]);

  function CustomersController(
    $scope, $element, CustomerService, EmployeeService
  ) {
    // Init variables
    $scope.companyId = undefined;
    $scope.companies = [];
    $scope.customers = [];
    $scope.$promise = [];

    var accountId = 1;
    var query = EmployeeService.companies({
      accountId: accountId // TODO: change this
    });

    query.then(function(data) {
      $scope.companies = data;

      // Select first company
      if (data && data.length) {
        $scope.companyId = data[0].companyid;
      }

      $scope.getCustomers();
    });

    /**
     * Reloads the customers for the selected company.
     */
    $scope.getCustomers = function() {
      if (!$scope.companyId) {
        return;
      }

      var customersQuery = CustomerService.accounts({
        companyId: $scope.companyId
      });

      $scope.$promise.push(customersQuery);

      customersQuery.then(function(data) {
        $scope.customers = data;
      });
    }
  }

})();
