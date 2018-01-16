(function() {
  'use strict';

  angular.module('app.core.services')
    .factory('AccountService', [
      '$q', '$resource', '$http', '$log',
      AccountService
    ]);

  function AccountService($q, $resource, $http, $log) {
    var data = $resource('http://localhost:8080/account/:accountId', {
      accountId: '@accountId'
    }, {
      update: {
        method: 'PUT'
      }
    });

    return data;
  }
})();
