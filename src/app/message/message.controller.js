/**
 * Created by initmrd on 16/8/16.
 */
(function () {
    'use strict';

    angular
        .module('starter.message', [])
        .controller('MessageController', MessageController);

    MessageController.$inject = ['$scope', '$timeout', '$ionicFilterBar'];

    function MessageController($scope, $timeout, $ionicFilterBar) {

        var filterBarInstance;

        function getItems() {
            var items = [];
            for (var x = 1; x < 20; x++) {
                items.push({text: 'This is item number ' + x + ' which is an ' + (x % 2 === 0 ? 'EVEN' : 'ODD') + ' number.'});
            }
            $scope.items = items;
        }

        getItems();

        $scope.showFilterBar = function () {
            filterBarInstance = $ionicFilterBar.show({
                items: $scope.items,
                update: function (filteredItems, filterText) {
                    $scope.items = filteredItems;
                    if (filterText) {
                        console.log(filterText);
                    }
                }
            });
        };

        $scope.refreshItems = function () {
            if (filterBarInstance) {
                filterBarInstance();
                filterBarInstance = null;
            }

            $timeout(function () {
                getItems();
                $scope.$broadcast('scroll.refreshComplete');
            }, 1000);
        };
        $scope.loadMore = function () {
            $scope.items.push({text: "loadMore"});
            setTimeout(
                function () {
                    $scope.$broadcast('scroll.infiniteScrollComplete');
                }, 1500
            );
        };
    }
})();