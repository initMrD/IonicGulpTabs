/**
 * Created by initmrd on 16/8/16.
 */
(function () {
    'use strict';

    angular
        .module('starter.login', [])
        .controller('LoginController', LoginController);

    LoginController.$inject = ['$scope', '$state'];

    function LoginController($scope, $state) {
        $scope.login = function () {
            $state.go('tab.homepage');
        }
    }
})();
