/**
 * Created by initmrd on 16/8/16.
 */
angular.module('starter.directive', [])
//下拉图片放大
    .directive('elasticHeader', function ($ionicScrollDelegate) {
        return {
            restrict: 'A',
            link: function (scope, scroller, attr) {
                var scrollerHandle = $ionicScrollDelegate.$getByHandle(attr.delegateHandle);
                var header = document.getElementById(attr['elasticHeader']);
                var headerHeight = header.clientHeight;
                var translateAmt, scaleAmt, scrollTop;
                var ticking = false;

                // Set transform origin to top:
                header.style[ionic.CSS.TRANSFORM + 'Origin'] = 'center bottom';

                // Update header height on resize:
                window.addEventListener('resize', function () {
                    headerHeight = header.clientHeight;
                }, false);

                scroller[0].addEventListener('scroll', requestTick);

                function requestTick() {
                    if (!ticking) {
                        ionic.requestAnimationFrame(updateElasticHeader);
                    }
                    ticking = true;
                }

                function updateElasticHeader() {

                    scrollTop = scrollerHandle.getScrollPosition().top;

                    if (scrollTop >= 0) {
                        // Scrolling up. Header should shrink:
                        translateAmt = scrollTop / 2;
                        scaleAmt = 1;
                    } else {
                        // Scrolling down. Header should expand:
                        translateAmt = 0;
                        scaleAmt = -scrollTop / headerHeight + 1;
                    }

                    // Update header with new position/size:
                    header.style[ionic.CSS.TRANSFORM] = 'translate3d(0,' + translateAmt + 'px,0) scale(' + scaleAmt + ',' + scaleAmt + ')';

                    ticking = false;
                }
            }
        }
    })
    //隐藏tabs
    .directive('hideTabs', function ($rootScope) {
        return {
            restrict: 'AE',
            link: function ($scope) {
                $scope.$on('$ionicView.beforeEnter', function () {
                    $rootScope.hideTabs = 'tabs-item-hide';
                });
                $scope.$on('$destroy', function () {
                    $rootScope.hideTabs = '';
                })
            }
        }
    })
    //隐藏显示返回键
    .directive('hideBackButton', function ($rootScope) {
        return {
            restrict: 'AE',
            link: function ($scope) {
                $scope.$on('$ionicView.beforeEnter', function () {
                    $rootScope.hideBackButtonFlag = true;
                    $rootScope.hideBackButton = 'hide';
                });
                $scope.$on('$ionicView.afterEnter', function () {
                    $rootScope.hideBackButtonFlag = false;
                });
                $scope.$on('$ionicView.leave', function () {
                    if ($rootScope.hideBackButtonFlag != true) {
                        $rootScope.hideBackButton = '';
                    }
                })
            }
        }
    });