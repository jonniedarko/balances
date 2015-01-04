module.exports = function($scope, $stateParams, $state, DB, $ionicModal, DBS){

    $scope.transaction = {};
    DBS.getTransaction("transactions",$stateParams.transactionId)
        .then(function(transaction){
            $scope.transaction = transaction;
        })
    /*DB.getById({"name":"mytransactions", "id": $stateParams.transactionId})
        .then(function(trans){
            $scope.transaction = trans;
        });
*/

        $ionicModal.fromTemplateUrl('templates/common/delete.model.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function(modal) {
            $scope.modal = modal;
            console.dir($scope.modal);
        });



        $scope.deleteConfirmation = function (){
            $scope.modal.show();

        };
        $scope.closeModal = function(){
            $scope.modal.hide();
        };

        $scope.delete = function (){
            /*DB.delete({"name":"mytransactions", "columns" : { "id":$stateParams.transactionId}}).then(function(result){
                $state.go('tab.transactions',{ toast: "Transaction successfully deleted" });
            });*/

            DBS.deleteTransaction("transactions",$stateParams.transactionId)
                .then(function(result){
                    $scope.modal.hide();
                    $state.go('tab.transactions',{ toast: "Transaction successfully deleted" });

                },function(error){
                    $scope.modal.hide();
                    $state.go('tab.transactions',{ toast: "An Error occurred!" });
                });


        };

};