module.exports = angular.module('Transactions',['DataBase-Access'])
	.controller('TransactionCtrl', require('./transaction.controller'))
	.controller('TransactionListCtrl', require('./transactionList.controller'))
	.filter('customDate', require('./customDate.filter'))
	.filter('unixTime',  require('./unixTime.filter'));