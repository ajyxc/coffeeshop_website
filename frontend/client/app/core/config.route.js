angular.module('app')
  .config(['$stateProvider', '$urlRouterProvider', '$ocLazyLoadProvider',

    function($stateProvider, $urlRouterProvider, $ocLazyLoadProvider) {
      $urlRouterProvider
        .otherwise('/app/dashboard');

      $stateProvider
      // Overall
        .state('app', {
        url: '/app',
        templateUrl: "app/app.html"
      })

      // Home
      .state('app.dashboard', {
        url: '/dashboard',
        templateUrl: "app/dashboard/dashboard.html"
      })

      // Store
      .state('app.store', {
        url: '/store',
        templateUrl: "app/store/store.html",
        controller: 'StoreController'
      })

      // Purchase History
      .state('app.purchase-history', {
        url: '/purchase-history',
        templateUrl: "app/purchase-history/purchase-history.html",
        controller: 'PurchaseHistoryController'
      })


      // User Points
      .state('app.user-points', {
        url: '/user-points',
        templateUrl: "app/user-points/user-points.html",
        controller: 'UserPointsController'
      })

      // Employees
      .state('app.employee', {
        url: '/employee',
        templateUrl: "app/employee/employee.html",
        controller: 'EmployeeController'
      })

      // Customers
      .state('app.customers', {
        url: '/customers',
        templateUrl: "app/customers/customers.html",
        controller: 'CustomersController'
      })

      // Analytics
      .state('app.analytics', {
        url: '/analytics',
        templateUrl: "app/analytics/analytics.html",
        controller: 'AnalyticsController'
      })

      // Account
      .state('app.account', {
        url: '/account',
        templateUrl: "app/account/account.html",
        controller: 'AccountController'
      })

      // Extra
      .state('404', {
          url: '/404',
          templateUrl: "app/page-extra/404.html"
        })
        .state('500', {
          url: '/500',
          templateUrl: "app/page-extra/500.html"
        })
        .state('signin', {
          url: '/signin',
          templateUrl: 'app/page-extra/signin.html'
        })
        .state('signup', {
          url: '/signup',
          templateUrl: 'app/page-extra/signup.html'
        })
        .state('forgot-password', {
          url: '/forgot-password',
          templateUrl: 'app/page-extra/forgot-password.html'
        })
        .state('confirm-email', {
          url: '/confirm-email',
          templateUrl: 'app/page-extra/confirm-email.html'
        })
        .state('lock-screen', {
          url: '/lock-screen',
          templateUrl: 'app/page-extra/lock-screen.html'
        })
        .state('maintenance', {
          url: '/maintenance',
          templateUrl: "app/page-extra/maintenance.html"
        });
    }
  ]);
