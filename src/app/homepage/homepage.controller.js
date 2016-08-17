// Dash controller
// Using javaScript closures, wrap Angular components in an Immediately Invoked Function Expression(IIFE).
// Why?: An IIFE removes variables from the global scope. This helps prevent variables and function declarations from living longer than expected in the global scope, which also helps avoid variable collisions.

// Why?: When your code is minified and bundled into a single file for deployment to a production server, you could have collisions of variables and many global variables. An IIFE protects you against both of these by providing variable scope for each file.

(function () {
    'use strict';

    angular
        .module('starter.homepage')
        .controller('HomepageController', HomepageController);

    HomepageController.$inject = ['$scope', '$ionicLoading','$ionicPopup','$state'];

    function HomepageController($scope, $ionicLoading,$ionicPopup,$state) {
        $scope.loading = function () {
            $ionicLoading.show({
                template: '加载中，请稍后...'
            });
            setTimeout(
                function () {
                    $ionicLoading.hide();
                }, 1500
            );
        };
        $scope.alert = function () {
            $ionicPopup.alert({
                title: '提示',
                template: "这是一个提示"
            });
        };
        $scope.exit = function () {
            $state.go('login')
        };
    }
})();
