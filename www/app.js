(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js

module.exports = angular.module('starter', ['ionic', 'starter.controllers', 'starter.services'])

.run(['$ionicPlatform',function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)

    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
}])

.config(['$stateProvider', '$urlRouterProvider',function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  // setup an abstract state for the tabs directive
    .state('tab', {
    url: "/tab",
    abstract: true,
    templateUrl: "templates/tabs.html"
  })

  // Each tab has its own nav history stack:

  .state('tab.dash', {
    url: '/dash',
    views: {
      'tab-dash': {
        templateUrl: 'templates/tab-dash.html',
        controller: 'DashCtrl'
      }
    }
  })

  .state('tab.chats', {
      url: '/chats',
      views: {
        'tab-chats': {
          templateUrl: 'templates/tab-chats.html',
          controller: 'ChatsCtrl'
        }
      }
    })
    .state('tab.chat-detail', {
      url: '/chats/:chatId',
      views: {
        'tab-chats': {
          templateUrl: 'templates/chat-detail.html',
          controller: 'ChatDetailCtrl'
        }
      }
    })

  .state('tab.friends', {
      url: '/friends',
      views: {
        'tab-friends': {
          templateUrl: 'templates/tab-friends.html',
          controller: 'FriendsCtrl'
        }
      }
    })
    .state('tab.friend-detail', {
      url: '/friend/:friendId',
      views: {
        'tab-friends': {
          templateUrl: 'templates/friend-detail.html',
          controller: 'FriendDetailCtrl'
        }
      }
    })

  .state('tab.account', {
    url: '/account',
    views: {
      'tab-account': {
        templateUrl: 'templates/tab-account.html',
        controller: 'AccountCtrl'
      }
    }
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/dash');

}]);

require('./controllers');
require('./services');

},{"./controllers":2,"./services":3}],2:[function(require,module,exports){
module.exports = angular.module('starter.controllers', [])

.controller('DashCtrl', ['$scope',function($scope) {}])

.controller('ChatsCtrl', ['$scope', 'Chats',function($scope, Chats) {
  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  }
}])

.controller('ChatDetailCtrl', ['$scope', '$stateParams', 'Chats', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
}])

.controller('FriendsCtrl', ['$scope', 'Friends',function($scope, Friends) {
  $scope.friends = Friends.all();
}])

.controller('FriendDetailCtrl', ['$scope', '$stateParams', 'Friends',function($scope, $stateParams, Friends) {
  $scope.friend = Friends.get($stateParams.friendId);
}])

.controller('AccountCtrl', ['$scope',function($scope) {
  $scope.settings = {
    enableFriends: true
  };
}]);

},{}],3:[function(require,module,exports){
module.exports = angular.module('starter.services', [])

.factory('Chats', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var chats = [{
    id: 0,
    name: 'Ben Sparrow',
    lastText: 'You on your way?',
    face: 'https://pbs.twimg.com/profile_images/514549811765211136/9SgAuHeY.png'
  }, {
    id: 1,
    name: 'Max Lynx',
    lastText: 'Hey, it\'s me',
    face: 'https://pbs.twimg.com/profile_images/479740132258361344/KaYdH9hE.jpeg'
  }, {
    id: 2,
    name: 'Andrew Jostlin',
    lastText: 'Did you get the ice cream?',
    face: 'https://pbs.twimg.com/profile_images/491274378181488640/Tti0fFVJ.jpeg'
  }, {
    id: 3,
    name: 'Adam Bradleyson',
    lastText: 'I should buy a boat',
    face: 'https://pbs.twimg.com/profile_images/479090794058379264/84TKj_qa.jpeg'
  }, {
    id: 4,
    name: 'Perry Governor',
    lastText: 'Look at my mukluks!',
    face: 'https://pbs.twimg.com/profile_images/491995398135767040/ie2Z_V6e.jpeg'
  }];

  return {
    all: function() {
      return chats;
    },
    remove: function(chat) {
      chats.splice(chats.indexOf(chat), 1);
    },
    get: function(chatId) {
      for (var i = 0; i < chats.length; i++) {
        if (chats[i].id === parseInt(chatId)) {
          return chats[i];
        }
      }
      return null;
    }
  }
})

/**
 * A simple example service that returns some data.
 */
.factory('Friends', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  // Some fake testing data
  var friends = [{
    id: 0,
    name: 'Ben Sparrow',
    notes: 'Enjoys drawing things',
    face: 'https://pbs.twimg.com/profile_images/514549811765211136/9SgAuHeY.png'
  }, {
    id: 1,
    name: 'Max Lynx',
    notes: 'Odd obsession with everything',
    face: 'https://pbs.twimg.com/profile_images/479740132258361344/KaYdH9hE.jpeg'
  }, {
    id: 2,
    name: 'Andrew Jostlen',
    notes: 'Wears a sweet leather Jacket. I\'m a bit jealous',
    face: 'https://pbs.twimg.com/profile_images/491274378181488640/Tti0fFVJ.jpeg'
  }, {
    id: 3,
    name: 'Adam Bradleyson',
    notes: 'I think he needs to buy a boat',
    face: 'https://pbs.twimg.com/profile_images/479090794058379264/84TKj_qa.jpeg'
  }, {
    id: 4,
    name: 'Perry Governor',
    notes: 'Just the nicest guy',
    face: 'https://pbs.twimg.com/profile_images/491995398135767040/ie2Z_V6e.jpeg'
  }];


  return {
    all: function() {
      return friends;
    },
    get: function(friendId) {
      // Simple index lookup
      return friends[friendId];
    }
  }
});

},{}]},{},[1])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJkZXYvanMvYXBwLmpzIiwiZGV2L2pzL2NvbnRyb2xsZXJzLmpzIiwiZGV2L2pzL3NlcnZpY2VzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzNHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzVCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIi8vIElvbmljIFN0YXJ0ZXIgQXBwXG5cbi8vIGFuZ3VsYXIubW9kdWxlIGlzIGEgZ2xvYmFsIHBsYWNlIGZvciBjcmVhdGluZywgcmVnaXN0ZXJpbmcgYW5kIHJldHJpZXZpbmcgQW5ndWxhciBtb2R1bGVzXG4vLyAnc3RhcnRlcicgaXMgdGhlIG5hbWUgb2YgdGhpcyBhbmd1bGFyIG1vZHVsZSBleGFtcGxlIChhbHNvIHNldCBpbiBhIDxib2R5PiBhdHRyaWJ1dGUgaW4gaW5kZXguaHRtbClcbi8vIHRoZSAybmQgcGFyYW1ldGVyIGlzIGFuIGFycmF5IG9mICdyZXF1aXJlcydcbi8vICdzdGFydGVyLnNlcnZpY2VzJyBpcyBmb3VuZCBpbiBzZXJ2aWNlcy5qc1xuLy8gJ3N0YXJ0ZXIuY29udHJvbGxlcnMnIGlzIGZvdW5kIGluIGNvbnRyb2xsZXJzLmpzXG5cbm1vZHVsZS5leHBvcnRzID0gYW5ndWxhci5tb2R1bGUoJ3N0YXJ0ZXInLCBbJ2lvbmljJywgJ3N0YXJ0ZXIuY29udHJvbGxlcnMnLCAnc3RhcnRlci5zZXJ2aWNlcyddKVxuXG4ucnVuKFsnJGlvbmljUGxhdGZvcm0nLGZ1bmN0aW9uKCRpb25pY1BsYXRmb3JtKSB7XG4gICRpb25pY1BsYXRmb3JtLnJlYWR5KGZ1bmN0aW9uKCkge1xuICAgIC8vIEhpZGUgdGhlIGFjY2Vzc29yeSBiYXIgYnkgZGVmYXVsdCAocmVtb3ZlIHRoaXMgdG8gc2hvdyB0aGUgYWNjZXNzb3J5IGJhciBhYm92ZSB0aGUga2V5Ym9hcmRcbiAgICAvLyBmb3IgZm9ybSBpbnB1dHMpXG5cbiAgICBpZiAod2luZG93LmNvcmRvdmEgJiYgd2luZG93LmNvcmRvdmEucGx1Z2lucy5LZXlib2FyZCkge1xuICAgICAgY29yZG92YS5wbHVnaW5zLktleWJvYXJkLmhpZGVLZXlib2FyZEFjY2Vzc29yeUJhcih0cnVlKTtcbiAgICB9XG4gICAgaWYgKHdpbmRvdy5TdGF0dXNCYXIpIHtcbiAgICAgIC8vIG9yZy5hcGFjaGUuY29yZG92YS5zdGF0dXNiYXIgcmVxdWlyZWRcbiAgICAgIFN0YXR1c0Jhci5zdHlsZURlZmF1bHQoKTtcbiAgICB9XG4gIH0pO1xufV0pXG5cbi5jb25maWcoWyckc3RhdGVQcm92aWRlcicsICckdXJsUm91dGVyUHJvdmlkZXInLGZ1bmN0aW9uKCRzdGF0ZVByb3ZpZGVyLCAkdXJsUm91dGVyUHJvdmlkZXIpIHtcblxuICAvLyBJb25pYyB1c2VzIEFuZ3VsYXJVSSBSb3V0ZXIgd2hpY2ggdXNlcyB0aGUgY29uY2VwdCBvZiBzdGF0ZXNcbiAgLy8gTGVhcm4gbW9yZSBoZXJlOiBodHRwczovL2dpdGh1Yi5jb20vYW5ndWxhci11aS91aS1yb3V0ZXJcbiAgLy8gU2V0IHVwIHRoZSB2YXJpb3VzIHN0YXRlcyB3aGljaCB0aGUgYXBwIGNhbiBiZSBpbi5cbiAgLy8gRWFjaCBzdGF0ZSdzIGNvbnRyb2xsZXIgY2FuIGJlIGZvdW5kIGluIGNvbnRyb2xsZXJzLmpzXG4gICRzdGF0ZVByb3ZpZGVyXG5cbiAgLy8gc2V0dXAgYW4gYWJzdHJhY3Qgc3RhdGUgZm9yIHRoZSB0YWJzIGRpcmVjdGl2ZVxuICAgIC5zdGF0ZSgndGFiJywge1xuICAgIHVybDogXCIvdGFiXCIsXG4gICAgYWJzdHJhY3Q6IHRydWUsXG4gICAgdGVtcGxhdGVVcmw6IFwidGVtcGxhdGVzL3RhYnMuaHRtbFwiXG4gIH0pXG5cbiAgLy8gRWFjaCB0YWIgaGFzIGl0cyBvd24gbmF2IGhpc3Rvcnkgc3RhY2s6XG5cbiAgLnN0YXRlKCd0YWIuZGFzaCcsIHtcbiAgICB1cmw6ICcvZGFzaCcsXG4gICAgdmlld3M6IHtcbiAgICAgICd0YWItZGFzaCc6IHtcbiAgICAgICAgdGVtcGxhdGVVcmw6ICd0ZW1wbGF0ZXMvdGFiLWRhc2guaHRtbCcsXG4gICAgICAgIGNvbnRyb2xsZXI6ICdEYXNoQ3RybCdcbiAgICAgIH1cbiAgICB9XG4gIH0pXG5cbiAgLnN0YXRlKCd0YWIuY2hhdHMnLCB7XG4gICAgICB1cmw6ICcvY2hhdHMnLFxuICAgICAgdmlld3M6IHtcbiAgICAgICAgJ3RhYi1jaGF0cyc6IHtcbiAgICAgICAgICB0ZW1wbGF0ZVVybDogJ3RlbXBsYXRlcy90YWItY2hhdHMuaHRtbCcsXG4gICAgICAgICAgY29udHJvbGxlcjogJ0NoYXRzQ3RybCdcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pXG4gICAgLnN0YXRlKCd0YWIuY2hhdC1kZXRhaWwnLCB7XG4gICAgICB1cmw6ICcvY2hhdHMvOmNoYXRJZCcsXG4gICAgICB2aWV3czoge1xuICAgICAgICAndGFiLWNoYXRzJzoge1xuICAgICAgICAgIHRlbXBsYXRlVXJsOiAndGVtcGxhdGVzL2NoYXQtZGV0YWlsLmh0bWwnLFxuICAgICAgICAgIGNvbnRyb2xsZXI6ICdDaGF0RGV0YWlsQ3RybCdcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pXG5cbiAgLnN0YXRlKCd0YWIuZnJpZW5kcycsIHtcbiAgICAgIHVybDogJy9mcmllbmRzJyxcbiAgICAgIHZpZXdzOiB7XG4gICAgICAgICd0YWItZnJpZW5kcyc6IHtcbiAgICAgICAgICB0ZW1wbGF0ZVVybDogJ3RlbXBsYXRlcy90YWItZnJpZW5kcy5odG1sJyxcbiAgICAgICAgICBjb250cm9sbGVyOiAnRnJpZW5kc0N0cmwnXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KVxuICAgIC5zdGF0ZSgndGFiLmZyaWVuZC1kZXRhaWwnLCB7XG4gICAgICB1cmw6ICcvZnJpZW5kLzpmcmllbmRJZCcsXG4gICAgICB2aWV3czoge1xuICAgICAgICAndGFiLWZyaWVuZHMnOiB7XG4gICAgICAgICAgdGVtcGxhdGVVcmw6ICd0ZW1wbGF0ZXMvZnJpZW5kLWRldGFpbC5odG1sJyxcbiAgICAgICAgICBjb250cm9sbGVyOiAnRnJpZW5kRGV0YWlsQ3RybCdcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pXG5cbiAgLnN0YXRlKCd0YWIuYWNjb3VudCcsIHtcbiAgICB1cmw6ICcvYWNjb3VudCcsXG4gICAgdmlld3M6IHtcbiAgICAgICd0YWItYWNjb3VudCc6IHtcbiAgICAgICAgdGVtcGxhdGVVcmw6ICd0ZW1wbGF0ZXMvdGFiLWFjY291bnQuaHRtbCcsXG4gICAgICAgIGNvbnRyb2xsZXI6ICdBY2NvdW50Q3RybCdcbiAgICAgIH1cbiAgICB9XG4gIH0pO1xuXG4gIC8vIGlmIG5vbmUgb2YgdGhlIGFib3ZlIHN0YXRlcyBhcmUgbWF0Y2hlZCwgdXNlIHRoaXMgYXMgdGhlIGZhbGxiYWNrXG4gICR1cmxSb3V0ZXJQcm92aWRlci5vdGhlcndpc2UoJy90YWIvZGFzaCcpO1xuXG59XSk7XG5cbnJlcXVpcmUoJy4vY29udHJvbGxlcnMnKTtcbnJlcXVpcmUoJy4vc2VydmljZXMnKTtcbiIsIm1vZHVsZS5leHBvcnRzID0gYW5ndWxhci5tb2R1bGUoJ3N0YXJ0ZXIuY29udHJvbGxlcnMnLCBbXSlcblxuLmNvbnRyb2xsZXIoJ0Rhc2hDdHJsJywgWyckc2NvcGUnLGZ1bmN0aW9uKCRzY29wZSkge31dKVxuXG4uY29udHJvbGxlcignQ2hhdHNDdHJsJywgWyckc2NvcGUnLCAnQ2hhdHMnLGZ1bmN0aW9uKCRzY29wZSwgQ2hhdHMpIHtcbiAgJHNjb3BlLmNoYXRzID0gQ2hhdHMuYWxsKCk7XG4gICRzY29wZS5yZW1vdmUgPSBmdW5jdGlvbihjaGF0KSB7XG4gICAgQ2hhdHMucmVtb3ZlKGNoYXQpO1xuICB9XG59XSlcblxuLmNvbnRyb2xsZXIoJ0NoYXREZXRhaWxDdHJsJywgWyckc2NvcGUnLCAnJHN0YXRlUGFyYW1zJywgJ0NoYXRzJywgZnVuY3Rpb24oJHNjb3BlLCAkc3RhdGVQYXJhbXMsIENoYXRzKSB7XG4gICRzY29wZS5jaGF0ID0gQ2hhdHMuZ2V0KCRzdGF0ZVBhcmFtcy5jaGF0SWQpO1xufV0pXG5cbi5jb250cm9sbGVyKCdGcmllbmRzQ3RybCcsIFsnJHNjb3BlJywgJ0ZyaWVuZHMnLGZ1bmN0aW9uKCRzY29wZSwgRnJpZW5kcykge1xuICAkc2NvcGUuZnJpZW5kcyA9IEZyaWVuZHMuYWxsKCk7XG59XSlcblxuLmNvbnRyb2xsZXIoJ0ZyaWVuZERldGFpbEN0cmwnLCBbJyRzY29wZScsICckc3RhdGVQYXJhbXMnLCAnRnJpZW5kcycsZnVuY3Rpb24oJHNjb3BlLCAkc3RhdGVQYXJhbXMsIEZyaWVuZHMpIHtcbiAgJHNjb3BlLmZyaWVuZCA9IEZyaWVuZHMuZ2V0KCRzdGF0ZVBhcmFtcy5mcmllbmRJZCk7XG59XSlcblxuLmNvbnRyb2xsZXIoJ0FjY291bnRDdHJsJywgWyckc2NvcGUnLGZ1bmN0aW9uKCRzY29wZSkge1xuICAkc2NvcGUuc2V0dGluZ3MgPSB7XG4gICAgZW5hYmxlRnJpZW5kczogdHJ1ZVxuICB9O1xufV0pO1xuIiwibW9kdWxlLmV4cG9ydHMgPSBhbmd1bGFyLm1vZHVsZSgnc3RhcnRlci5zZXJ2aWNlcycsIFtdKVxuXG4uZmFjdG9yeSgnQ2hhdHMnLCBmdW5jdGlvbigpIHtcbiAgLy8gTWlnaHQgdXNlIGEgcmVzb3VyY2UgaGVyZSB0aGF0IHJldHVybnMgYSBKU09OIGFycmF5XG5cbiAgLy8gU29tZSBmYWtlIHRlc3RpbmcgZGF0YVxuICB2YXIgY2hhdHMgPSBbe1xuICAgIGlkOiAwLFxuICAgIG5hbWU6ICdCZW4gU3BhcnJvdycsXG4gICAgbGFzdFRleHQ6ICdZb3Ugb24geW91ciB3YXk/JyxcbiAgICBmYWNlOiAnaHR0cHM6Ly9wYnMudHdpbWcuY29tL3Byb2ZpbGVfaW1hZ2VzLzUxNDU0OTgxMTc2NTIxMTEzNi85U2dBdUhlWS5wbmcnXG4gIH0sIHtcbiAgICBpZDogMSxcbiAgICBuYW1lOiAnTWF4IEx5bngnLFxuICAgIGxhc3RUZXh0OiAnSGV5LCBpdFxcJ3MgbWUnLFxuICAgIGZhY2U6ICdodHRwczovL3Bicy50d2ltZy5jb20vcHJvZmlsZV9pbWFnZXMvNDc5NzQwMTMyMjU4MzYxMzQ0L0thWWRIOWhFLmpwZWcnXG4gIH0sIHtcbiAgICBpZDogMixcbiAgICBuYW1lOiAnQW5kcmV3IEpvc3RsaW4nLFxuICAgIGxhc3RUZXh0OiAnRGlkIHlvdSBnZXQgdGhlIGljZSBjcmVhbT8nLFxuICAgIGZhY2U6ICdodHRwczovL3Bicy50d2ltZy5jb20vcHJvZmlsZV9pbWFnZXMvNDkxMjc0Mzc4MTgxNDg4NjQwL1R0aTBmRlZKLmpwZWcnXG4gIH0sIHtcbiAgICBpZDogMyxcbiAgICBuYW1lOiAnQWRhbSBCcmFkbGV5c29uJyxcbiAgICBsYXN0VGV4dDogJ0kgc2hvdWxkIGJ1eSBhIGJvYXQnLFxuICAgIGZhY2U6ICdodHRwczovL3Bicy50d2ltZy5jb20vcHJvZmlsZV9pbWFnZXMvNDc5MDkwNzk0MDU4Mzc5MjY0Lzg0VEtqX3FhLmpwZWcnXG4gIH0sIHtcbiAgICBpZDogNCxcbiAgICBuYW1lOiAnUGVycnkgR292ZXJub3InLFxuICAgIGxhc3RUZXh0OiAnTG9vayBhdCBteSBtdWtsdWtzIScsXG4gICAgZmFjZTogJ2h0dHBzOi8vcGJzLnR3aW1nLmNvbS9wcm9maWxlX2ltYWdlcy80OTE5OTUzOTgxMzU3NjcwNDAvaWUyWl9WNmUuanBlZydcbiAgfV07XG5cbiAgcmV0dXJuIHtcbiAgICBhbGw6IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIGNoYXRzO1xuICAgIH0sXG4gICAgcmVtb3ZlOiBmdW5jdGlvbihjaGF0KSB7XG4gICAgICBjaGF0cy5zcGxpY2UoY2hhdHMuaW5kZXhPZihjaGF0KSwgMSk7XG4gICAgfSxcbiAgICBnZXQ6IGZ1bmN0aW9uKGNoYXRJZCkge1xuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBjaGF0cy5sZW5ndGg7IGkrKykge1xuICAgICAgICBpZiAoY2hhdHNbaV0uaWQgPT09IHBhcnNlSW50KGNoYXRJZCkpIHtcbiAgICAgICAgICByZXR1cm4gY2hhdHNbaV07XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgfVxufSlcblxuLyoqXG4gKiBBIHNpbXBsZSBleGFtcGxlIHNlcnZpY2UgdGhhdCByZXR1cm5zIHNvbWUgZGF0YS5cbiAqL1xuLmZhY3RvcnkoJ0ZyaWVuZHMnLCBmdW5jdGlvbigpIHtcbiAgLy8gTWlnaHQgdXNlIGEgcmVzb3VyY2UgaGVyZSB0aGF0IHJldHVybnMgYSBKU09OIGFycmF5XG5cbiAgLy8gU29tZSBmYWtlIHRlc3RpbmcgZGF0YVxuICAvLyBTb21lIGZha2UgdGVzdGluZyBkYXRhXG4gIHZhciBmcmllbmRzID0gW3tcbiAgICBpZDogMCxcbiAgICBuYW1lOiAnQmVuIFNwYXJyb3cnLFxuICAgIG5vdGVzOiAnRW5qb3lzIGRyYXdpbmcgdGhpbmdzJyxcbiAgICBmYWNlOiAnaHR0cHM6Ly9wYnMudHdpbWcuY29tL3Byb2ZpbGVfaW1hZ2VzLzUxNDU0OTgxMTc2NTIxMTEzNi85U2dBdUhlWS5wbmcnXG4gIH0sIHtcbiAgICBpZDogMSxcbiAgICBuYW1lOiAnTWF4IEx5bngnLFxuICAgIG5vdGVzOiAnT2RkIG9ic2Vzc2lvbiB3aXRoIGV2ZXJ5dGhpbmcnLFxuICAgIGZhY2U6ICdodHRwczovL3Bicy50d2ltZy5jb20vcHJvZmlsZV9pbWFnZXMvNDc5NzQwMTMyMjU4MzYxMzQ0L0thWWRIOWhFLmpwZWcnXG4gIH0sIHtcbiAgICBpZDogMixcbiAgICBuYW1lOiAnQW5kcmV3IEpvc3RsZW4nLFxuICAgIG5vdGVzOiAnV2VhcnMgYSBzd2VldCBsZWF0aGVyIEphY2tldC4gSVxcJ20gYSBiaXQgamVhbG91cycsXG4gICAgZmFjZTogJ2h0dHBzOi8vcGJzLnR3aW1nLmNvbS9wcm9maWxlX2ltYWdlcy80OTEyNzQzNzgxODE0ODg2NDAvVHRpMGZGVkouanBlZydcbiAgfSwge1xuICAgIGlkOiAzLFxuICAgIG5hbWU6ICdBZGFtIEJyYWRsZXlzb24nLFxuICAgIG5vdGVzOiAnSSB0aGluayBoZSBuZWVkcyB0byBidXkgYSBib2F0JyxcbiAgICBmYWNlOiAnaHR0cHM6Ly9wYnMudHdpbWcuY29tL3Byb2ZpbGVfaW1hZ2VzLzQ3OTA5MDc5NDA1ODM3OTI2NC84NFRLal9xYS5qcGVnJ1xuICB9LCB7XG4gICAgaWQ6IDQsXG4gICAgbmFtZTogJ1BlcnJ5IEdvdmVybm9yJyxcbiAgICBub3RlczogJ0p1c3QgdGhlIG5pY2VzdCBndXknLFxuICAgIGZhY2U6ICdodHRwczovL3Bicy50d2ltZy5jb20vcHJvZmlsZV9pbWFnZXMvNDkxOTk1Mzk4MTM1NzY3MDQwL2llMlpfVjZlLmpwZWcnXG4gIH1dO1xuXG5cbiAgcmV0dXJuIHtcbiAgICBhbGw6IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIGZyaWVuZHM7XG4gICAgfSxcbiAgICBnZXQ6IGZ1bmN0aW9uKGZyaWVuZElkKSB7XG4gICAgICAvLyBTaW1wbGUgaW5kZXggbG9va3VwXG4gICAgICByZXR1cm4gZnJpZW5kc1tmcmllbmRJZF07XG4gICAgfVxuICB9XG59KTtcbiJdfQ==
