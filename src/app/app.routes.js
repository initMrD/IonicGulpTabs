// Routes config
angular.module('starter.routes', [])


.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  // setup an abstract state for the tabs directive
  .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'app/tabs/tabs.html'
  })

  // Each tab has its own nav history stack:

  .state('tab.homepage', {
    url: '/homepage',
    views: {
      'tab-homepage': {
        templateUrl: 'app/homepage/tab-homepage.html',
        controller: 'HomepageController'
      }
    }
  })

  .state('tab.staff', {
      url: '/staff',
      views: {
        'tab-staff': {
          templateUrl: 'app/staff/templates/tab-staff.html',
          controller: 'StaffController'
        }
      }
    })
    .state('tab.staff-detail', {
      url: '/staff/:chatId',
      views: {
        'tab-staff': {
          templateUrl: 'app/staff/templates/staff-detail.html',
          controller: 'StaffDetailController'
        }
      }
    })

  .state('tab.message', {
    url: '/message',
    views: {
      'tab-message': {
        templateUrl: 'app/message/tab-message.html'
      }
    }
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/homepage');

});
