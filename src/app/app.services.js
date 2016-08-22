/**
 * Created by initmrd on 16/8/17.
 */
"use strict";

angular.module('starter.services', [])
//本地存储
    .factory('locals', ['$window', function ($window) {
        return {
            // 存储单个属性
            set: function (key, value) {
                $window.localStorage[key] = value;
            },
            // 读取单个属性
            get: function (key, defaultValue) {
                return $window.localStorage[key] || defaultValue;
            },
            // 删除单个属性
            remove: function (key) {
                $window.localStorage.removeItem(key);
            },
            // 存储对象
            setObject: function (key, value) {
                $window.localStorage[key] = JSON.stringify(value);
            },
            // 读取存储对象
            getObject: function (key) {
                return JSON.parse($window.localStorage[key] || '{}');
            }
        };
    }])
    .factory('network', ['$resource', '$rootScope', '$ionicPopup', 'ENV', function ($resource, $rootScope, $ionicPopup, ENV) {
        //API地址
        var baseUrl = ENV.apiUrl;
        //登录
        var login = $resource(baseUrl + "v2/security/login");
        //监听错误的广播
        $rootScope.$on('network.error', function (evnet,data) {
            $ionicPopup.alert({
                title: '提示',
                template: data
            });
        });
        return {
            login: function (username, password) {
                return login.save(
                    {
                        username: username,
                        password: password
                    },
                    function (response) {
                        $rootScope.$broadcast('network.loginSuccess', response);
                    },
                    function (error) {
                        $rootScope.$broadcast('network.error', '网络错误');
                    }
                )
            }
        };
    }]);