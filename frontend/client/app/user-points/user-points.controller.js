(function() {
  'use strict';

  angular.module('app.user-points')
    .controller('UserPointsController', ['$scope', 'CustomerService', UserPointsController]);

  function UserPointsController($scope, CustomerService) {
    // this needs to return the compay lists and the points for each
    var accountId = 1; // TODO: change this to the actual userID
    var query = CustomerService.companies({
      accountId: accountId
    });

    query.then(function(data) {
      $scope.companyPoints = data;// companyName and companyPoints
    });
  }

})();
