module.exports = function ($filter){
	var suffixes = ['th', 'st', 'nd', 'rd'];
	return function(input){

		var dd = $filter('date')(input, 'd');
		var relevantDigits = (dd < 30) ? dd % 20 : dd % 30;
		var suffix = (relevantDigits <= 3) ? suffixes[relevantDigits] : suffixes[0];
		var filteredDate = $filter('date')(input,'EEE')+', '+dd+suffix+' '+$filter('date')(input, 'MMMM');
		return filteredDate;
		//return input;
	};
};