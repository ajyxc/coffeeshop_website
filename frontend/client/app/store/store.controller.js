(function() {
  'use strict';

  angular.module('app.store')
    .controller('StoreController', [
      '$scope', 'ProductService', 'EmployeeService',
      StoreController
    ]);

  function StoreController(
    $scope, ProductService, EmployeeService
  ) {
    // Init variables
    $scope.options = {
      drinks: true,
      food: true,
      value: '',
      field: ''
    };
    $scope.companyId = undefined;
    $scope.companies = [];

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

      $scope.getProducts();
    });

    $scope.foodChange = function() {
      if (!$scope.options.drinks && !$scope.options.food) {
        $scope.options.drinks = true;
      }

      $scope.getProducts();
    }

    $scope.drinksChange = function() {
      if (!$scope.options.drinks && !$scope.options.food) {
        $scope.options.food = true;
      }

      $scope.getProducts();
    }

    $scope.searchChange = function() {
      $scope.getProducts();
    }

    $scope.getProducts = function() {
      if (!$scope.companyId) {
        return;
      }

      var queryOptions = {
        companyId: $scope.companyId
      };

      if (!$scope.options.drinks || !$scope.options.food) {
        queryOptions.isFood = $scope.options.food;
      }

      if ($scope.options.field.length && $scope.options.value.length) {
        queryOptions[$scope.options.field] = $scope.options.value;
      }

      var query = ProductService.query(queryOptions);

      query.$promise.then(function(data) {
        $scope.products = data;
      });
    }

    $scope.getProducts();
  }

})();
