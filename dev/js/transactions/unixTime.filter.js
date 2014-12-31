'use strict';

module.exports = function ($filter){

	return function(input, format){
		var newDate = new Date(input *1000);
		var dd = $filter('date')(newDate, format);
		return dd;
	};
};