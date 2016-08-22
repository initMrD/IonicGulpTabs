/**
 * Created by initmrd on 16/8/16.
 */
(function () {
    'use strict';

    angular
        .module('starter.login', [])
        .controller('LoginController', LoginController);

    LoginController.$inject = ['$scope', '$state', 'network'];

    function LoginController($scope, $state, network) {
        $scope.userInfo = {
            username: "",
            password: ""
        }
        $scope.login = function () {
            network.login($scope.userInfo.username, $scope.userInfo.password);
        };
        $scope.$on('network.loginSuccess', function (res) {
            console.info(res)
            $state.go('tab.homepage');
        });
    }
})();
