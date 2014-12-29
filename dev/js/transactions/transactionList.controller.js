module.exports = function ($scope, DB, $ionicModal, $stateParams) {

	$scope.transactions = [];

	//if($stateParams.toast !== undefined){
	console.log("toast", $stateParams.toast)
	//}

	$scope.updateList = function () {
		DB.getAll({"name": "mytransactions"}).then(function (trans) {
			console.log("transactions", trans[0].title);
			$scope.transactions = trans;
		});
	};
	$scope.updateList();


	$ionicModal.fromTemplateUrl('templates/transactions/add.model.html', {
		scope: $scope,
		animation: 'slide-in-up'
	}).then(function (modal) {
		$scope.modal = modal;
	});
	$scope.openModal = function () {
		$scope.modal.show();
	};
	$scope.submitNewTransaction = function (title, amount, indicator, payee_payer, date, time, account, description) {

		/* var title = $scope.newTitle,
		 description = $scope.newDescription,
		 amount = $scope.newAmount,
		 account = $scope.newAccount,
		 payee_payer = $scope.newPayeePayer,
		 indicator = $scope.newType;*/
		DB.insert({
			"name": "mytransactions",
			"columns": {
				"id": new Date().getTime(),
				"title": title,
				"description": description,
				"amount": amount,
				"account": account,
				"payee_payer": payee_payer,
				"indicator": indicator
			}
		});
		$scope.newTitle = null;
		$scope.newDescription = null;
		$scope.newAmount = null;
		$scope.newAccount = null;
		$scope.newPayeePayer = null;
		$scope.newType = null;

		$scope.closeModal();
	};

	$scope.closeModal = function () {
		$scope.updateList();
		$scope.modal.hide();
	};
	//Cleanup the modal when we're done with it!
	$scope.$on('$destroy', function () {
		$scope.modal.remove();
	});
	// Execute action on hide modal
	$scope.$on('modal.hidden', function () {
		// Execute action
	});
	// Execute action on remove modal
	$scope.$on('modal.removed', function () {
		// Execute action
	});
};