(function() {
  'use strict';

  angular.module('app.employee')
    .controller('EmployeeController', [
      '$scope', 'EmployeeService',
      EmployeeController
    ]);

  function EmployeeController(
    $scope, EmployeeService
  ) {
    // Init variables
    $scope.companyId = undefined;
    $scope.companies = [];
    $scope.employees = [];
    $scope.$promise = [];

    var accountId = 1;
    var query = EmployeeService.companies({
      accountId: accountId  // TODO: change this
    });

    query.then(function(data) {
      $scope.companies = data;

      // Select first company
      if (data && data.length) {
        $scope.companyId = data[0].companyid;
      }

      $scope.getEmployees();
    });

    /**
     * Reloads the employees for the selected company.
     */
    $scope.getEmployees = function() {
      var query = EmployeeService.accounts({
        companyId: $scope.companyId
      });

      query.then(function(data) {
        $scope.employees = data;
      });
    };
  }

})();
