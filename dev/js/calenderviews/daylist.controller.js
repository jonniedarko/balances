module.exports = function ($stateParams, DB, $scope) {

	$scope.transactions = [];

	//if($stateParams.toast !== undefined){
	//console.log("toast",$stateParams.toast)
	//}
	$scope.getPayIns = function (amounts) {
		var total = 0;
		for (i = 0; i < amounts.length; i++) {
			amountStr = amounts[i];
			var amount = Number(amountStr);
			if (amount > 0) {
				total += amount;
			}

		}
		return total.toString();
	}
	$scope.getPayOuts = function (amounts) {
		var total = 0;
		for (i = 0; i < amounts.length; i++) {
			var amount = Number(amounts[i]);
			if (amount < 0) {
				total += amount;
			}

		}
		return total.toString();
	}


	DB.query("SELECT date, date(date, 'unixepoch') as DateStr, GROUP_CONCAT(indicator) as type, GROUP_CONCAT(amount) as amounts, sum(amount) as total FROM mytransactions GROUP BY DateStr").then(function (rows) {
		console.log('group by');
		var rowTotals = [];
		rowTotals = rows.map(function (row) {
			return row.total
		});

		console.dir(rowTotals);

		for (var i = 0; i < rows.length; i++) {
			arr = rowTotals.slice(0, i);
			var carry = arr.reduce(function (previousValue, currentValue, index, array) {
				return Number(previousValue) + Number(currentValue);
			}, 0);

			rows[i].carry = carry;
		};

		console.dir(rows);
		$scope.transactions = rows;
	}).catch(function (error) {
		console.dir(error);
	});

	$scope.updateList = function () {
		DB.getAll({"name": "mytransactions", "groupby": "date,time"}).then(function (trans) {
			console.log("transactions", trans[0].title);
			$scope.transactions = trans;
		});
	};
};
