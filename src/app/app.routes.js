// Routes config
angular.module('starter.routes', ['ionic-native-transitions'])


    .config(function ($stateProvider, $urlRouterProvider, $ionicConfigProvider,$ionicNativeTransitionsProvider) {
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
        //
        //ionic转场动画
        //进入
        $ionicNativeTransitionsProvider.setDefaultTransition({
            type: 'slide',
            direction: 'left'
        });
        //返回
        $ionicNativeTransitionsProvider.setDefaultBackTransition({
            type: 'slide',
            direction: 'right'
        });
        $ionicNativeTransitionsProvider.setDefaultOptions({
            duration: 400, // in milliseconds (ms), default 400,
            slowdownfactor: 4, // overlap views (higher number is more) or no overlap (1), default 4
            iosdelay: -1, // ms to wait for the iOS webview to update before animation kicks in, default -1
            androiddelay: -1, // same as above but for Android, default -1
            winphonedelay: -1, // same as above but for Windows Phone, default -1,
            fixedPixelsTop: 0, // the number of pixels of your fixed header, default 0 (iOS and Android)
            fixedPixelsBottom: 0, // the number of pixels of your fixed footer (f.i. a tab bar), default 0 (iOS and Android)
            triggerTransitionEvent: '$ionicView.afterEnter', // internal ionic-native-transitions option
            backInOppositeDirection: false // Takes over default back transition and state back transition to use the opposite direction transition to go back
        });
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
                nativeTransitions: {
                    "type": "flip",
                    "direction": "up"
                },
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
                        templateUrl: 'app/message/tab-message.html',
                        controller: 'MessageController'
                    }
                }
            });

        // if none of the above states are matched, use this as the fallback
        $urlRouterProvider.otherwise('/login');

    });
