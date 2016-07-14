angular.module('starter.services', [])

.factory('staff', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var staff = [{
    id: 0,
    name: 'Ben Sparrow',
    lastText: 'You on your way?',
    face: 'app/staff/img/ben.png'
  }, {
    id: 1,
    name: 'Max Lynx',
    lastText: 'Hey, it\'s me',
    face: 'app/staff/img/max.png'
  }, {
    id: 2,
    name: 'Adam Bradleyson',
    lastText: 'I should buy a boat',
    face: 'app/staff/img/adam.jpg'
  }, {
    id: 3,
    name: 'Perry Governor',
    lastText: 'Look at my mukluks!',
    face: 'app/staff/img/perry.png'
  }, {
    id: 4,
    name: 'Mike Harrington',
    lastText: 'This is wicked good ice cream.',
    face: 'app/staff/img/mike.png'
  }];

  return {
    all: function() {
      return staff;
    },
    remove: function(chat) {
      staff.splice(staff.indexOf(chat), 1);
    },
    get: function(chatId) {
      for (var i = 0; i < staff.length; i++) {
        if (staff[i].id === parseInt(chatId)) {
          return staff[i];
        }
      }
      return null;
    }
  };
});
