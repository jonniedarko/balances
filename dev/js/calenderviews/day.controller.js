module.exports = function ($stateParams, DB, $scope) {

	DB.query("SELECT date(id, 'unixepoch') as Date, GROUP_CONCAT(indicator) as type, GROUP_CONCAT(amount) as amounts, sum(amount) as total FROM mytransactions WHERE Date=? GROUP BY Date", [$stateParams.date]).then(function (row) {
		console.dir(row[0]);
	});
	//Get Carry over balance up to today
	DB.query("SELECT sum(amount) FROM mytransactions WHERE date(id, 'unixepoch')<? ", [$stateParams.date]).then(function (row) {
		console.dir(row[0]);
	});
	var currentDate = new Date($stateParams.date);
	var dayBefore = new Date($stateParams.date);
	dayBefore.setDate(currentDate.getDate() - 1);
	var dayAfter = new Date($stateParams.date);
	dayAfter.setDate(currentDate.getDate() + 1);
	console.log("SELECT * FROM mytransactions WHERE id>? AND id<?" + [dayBefore / 1000, dayAfter / 1000]);
	DB.query("SELECT * FROM mytransactions WHERE id>? AND id<?", [dayBefore / 1000, dayAfter / 1000]).then(function (row) {
		console.dir(row);
	});
	//DB.getAll()
	console.log("day");
};