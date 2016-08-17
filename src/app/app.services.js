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
    }]);