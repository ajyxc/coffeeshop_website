(function() {
  'use strict';

  angular.module('app', [
    // Core
    'app.core',

    'app.i18n',

    // Comprio
    'app.store', 'app.purchase-history',  'app.user-points','app.employee',
    'app.customers', 'app.analytics', 'app.account'
  ]);

})();
