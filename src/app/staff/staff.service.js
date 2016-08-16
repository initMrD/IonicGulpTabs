angular.module('starter.services', [])

    .factory('staff', function () {
        // Might use a resource here that returns a JSON array

        // Some fake testing data
        var staff = [{
            id: 0,
            name: '从左进入',
            lastText: 'fade-in-left-item',
            face: 'app/staff/img/ben.png'
        }, {
            id: 1,
            name: '从右进入',
            lastText: 'fade-in-right-item',
            face: 'app/staff/img/max.png'
        }, {
            id: 2,
            name: '放大进入',
            lastText: 'zoom-in',
            face: 'app/staff/img/adam.jpg'
        }, {
            id: 3,
            name: '顶部进入',
            lastText: 'fade-in-down-item',
            face: 'app/staff/img/perry.png'
        }, {
            id: 4,
            name: '淡入',
            lastText: 'fade-in-item',
            face: 'app/staff/img/mike.png'
        }];

        return {
            all: function () {
                return staff;
            },
            remove: function (chat) {
                staff.splice(staff.indexOf(chat), 1);
            },
            get: function (chatId) {
                for (var i = 0; i < staff.length; i++) {
                    if (staff[i].id === parseInt(chatId)) {
                        return staff[i];
                    }
                }
                return null;
            }
        };
    });
