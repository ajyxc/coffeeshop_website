(function() {
  'use strict';

  angular.module('app.core', [
    // Must be loaded before any custom modules
    'app.core.dependencies',
    'app.core.directives',
    'app.core.layout',
    'app.core.services'
    // 'app.core.auth'
  ]);
}());
