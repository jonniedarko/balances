'use strict';

module.exports = function ($filter){
	var suffixes = ['th', 'st', 'nd', 'rd'];
	return function(input, format){
		var newDate = new Date(input *1000);
		var dd = $filter('date')(newDate, 'd');
		var relevantDigits = (dd < 30) ? dd % 20 : dd % 30;
		var suffix = (relevantDigits <= 3) ? suffixes[relevantDigits] : suffixes[0];
		var filteredDate = $filter('date')(newDate,'EEE')+', '+dd+suffix+' '+$filter('date')(newDate, 'MMMM');
		return filteredDate;
		//return input;
	};
};