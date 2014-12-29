angular.module('CalenderViews', ['DataBase-Access'])
	.controller('DayCtrl', ['$stateParams', 'DB', '$scope', require('./day.controller')])
	.controller('DayListCtrl', ['$stateParams', 'DB', '$scope', require('./dayList.controller')]);
