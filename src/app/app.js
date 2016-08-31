// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', [
    'ionic',
    'ngResource',

    'starter.directive',
    'starter.services',
    'starter.routes',
    'starter.configs',

    'starter.homepage',
    'starter.message',
    'starter.staff',
    'starter.staff.services',
    'starter.login',

    'templates',
    'ionic-native-transitions',
    'jett.ionic.scroll.sista',
    'jett.ionic.filter.bar',
    'jett.ionic.content.banner'
])

    .run(function ($ionicPlatform, ENV, $location, $ionicLoading, $ionicHistory) {
        //正式环境关闭console
        if (window.console) {
            if (!ENV.devMode) {
                for (i in console) {
                    console[i] = function () {
                    };
                }
            }
        }
        $ionicPlatform.ready(function () {
            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            // for form inputs)
            if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
                //弹出键盘设置是否显示done和左右箭头
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
                //弹出键盘时是否滚动屏幕
                cordova.plugins.Keyboard.disableScroll(true);
            }
            if (window.StatusBar) {
                StatusBar.styleDefault();
            }
            //返回键设置,双击返回键退出
            var exit = false;
            $ionicPlatform.registerBackButtonAction(function (e) {
                e.preventDefault();
                if ($location.path() == '/homepage' || $location.path() == '/login') {
                    if (exit) {
                        ionic.Platform.exitApp();
                    } else {
                        exit = true;
                        $ionicLoading.show({
                            noBackdrop: true,
                            template: '再按一次退出系统',
                            duration: 1500
                        });
                        setTimeout(function () {
                            exit = false;
                        }, 1500);
                    }
                } else if ($ionicHistory.backView()) {
                    $ionicHistory.goBack();
                }
                return false;
            }, 101);
        });
    })
