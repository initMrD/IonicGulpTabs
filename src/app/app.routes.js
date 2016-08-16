// Routes config
angular.module('starter.routes', [])


    .config(function ($stateProvider, $urlRouterProvider, $ionicConfigProvider) {
        $ionicConfigProvider.platform.ios.tabs.style('standard');
        $ionicConfigProvider.platform.ios.tabs.position('bottom');
        $ionicConfigProvider.platform.android.tabs.style('standard');
        $ionicConfigProvider.platform.android.tabs.position('standard');

        $ionicConfigProvider.platform.ios.navBar.alignTitle('center');
        $ionicConfigProvider.platform.android.navBar.alignTitle('center'); //标题位置

        $ionicConfigProvider.platform.ios.backButton.previousTitleText('').icon('ion-ios-arrow-thin-left');
        $ionicConfigProvider.platform.android.backButton.previousTitleText('').icon('ion-android-arrow-back');

        $ionicConfigProvider.platform.ios.views.transition('ios');
        $ionicConfigProvider.platform.android.views.transition('android');
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

            .state('login', {
                url: '/login',
                controller: 'LoginController',
                templateUrl: 'app/login/login.html'
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
        $urlRouterProvider.otherwise('/login');

    });
