module.exports = angular.module('Transactions',['DataBase-Access'])
	.controller('TransactionCtrl', ['$scope', '$stateParams', '$state', 'DB', '$ionicModal', require('./transaction.controller')])
	.controller('TransactionListCtrl', ['$scope', 'DB', '$ionicModal', '$stateParams', require('./transactionList.controller')])
	.filter('customDate', ['$filter', require('./customDate.filter')]);