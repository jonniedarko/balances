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
