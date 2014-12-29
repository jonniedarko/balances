module.exports = function($scope, $stateParams, $state, DB, $ionicModal){

    $scope.transaction = {};
    DB.getById({"name":"mytransactions", "id": $stateParams.transactionId})
        .then(function(trans){
            $scope.transaction = trans;
        });


        $ionicModal.fromTemplateUrl('js/common/delete.model.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function(modal) {
            $scope.modal = modal;
        });


        $scope.deleteConfirmation = function (){
            $scope.modal.show();

        };
        $scope.closeModal = function(){
            $scope.modal.hide();
        };

        $scope.delete = function (){
            DB.delete({"name":"mytransactions", "columns" : { "id":$stateParams.transactionId}}).then(function(result){
                $state.go('app.transactions',{ toast: "Transaction successfully deleted" });
            });
            $scope.modal.hide();
            $state.go('app.transactions');
        };

};