(function() {
  'use strict';

  angular.module('app.account')
    .controller('AccountController', [
      '$scope', 'AccountService',
      AccountController
    ]);

  function AccountController(
    $scope, AccountService
  ) {
    // Init variables
    var original;

    $scope.accountId = 1;
    $scope.updateSuccess = false;
    $scope.updateError = undefined;
    $scope.account = {
      email: '',
      name: ''
    };

    var accountId = 1;

    function getAccount() {
      var query = AccountService.get({
        accountId: $scope.accountId
      });

      query.$promise.then(function(data) {
        $scope.account = data;
        original = angular.copy($scope.account);
        $scope.form_account.$setPristine();
      });
    }
    getAccount();

    $scope.revert = function() {
      getAccount();
    };

    $scope.canRevert = function() {
      return !angular.equals($scope.account, original) || !$scope.form_account.$pristine;
    };
    $scope.canSubmit = function() {
      return $scope.form_account.$valid && !angular.equals($scope.account, original);
    };
    $scope.submitUpdate = function() {
      var query = AccountService.update({
        accountId: $scope.accountId
      }, $scope.account);

      query.$promise.then(function(data) {
        $scope.updateSuccess = true;
        $scope.updateError = undefined;

        getAccount();
      }, function(error) {
        $scope.updateSuccess = false;
        $scope.updateError = error;
      });
    };

  }

})();
