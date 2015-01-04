'use strict';

module.exports = function($q, DB, sqlService){

	var that = {
		transactions : [],
		test : 'Test'
	};


	var mysqlService = new sqlService('myTransactions', '1.0', 'transactions DB', 2 * 1024 * 1024);
	console.dir(mysqlService);

	mysqlService.createTable({
		"name": "transactions",
		"deleteExisiting" : "true",
		"columns" : [
			{ "name" : "id",
				"type" : "integer primary key not null"//AUTOINCREMENT not working with websql, primary key auto increments
			},
			{
				"name" : "date",
				"type" : "text"
			},
			{
				"name" : "time",
				"type" : "text"
			},
			{
				"name" : "title",
				"type" : "text"
			},
			{
				"name" : "description",
				"type" : "text"
			},
			{
				"name" : "amount",
				"type" : "number"
			},
			{
				"name" : "account",
				"type" : "text"
			},
			{
				"name" : "payee_payer",
				"type" : "text"
			},
			{
				"name" : "indicator",
				"type" : "text"
			}
		]
	});

	var newCreationUnixTimeStamp = function(){

		return Math.round(new Date()/1000);
	};

	mysqlService.insert({
		"name" : "transactions",
		"columns" :
		{
			"id" : newCreationUnixTimeStamp(),
			"date" : Math.round(new Date(2014, 10, 29, 11, 30)/1000),//"2014-11-29 @ 11:30",
			"time" : "11:30",
			"title" : "Payment",
			"description" : "this is a test description",
			"amount" : 2700,
			"account" : "current",
			"payee_payer" : "SAP",
			"indicator" : "cash"
		}


	});

	function getAll(table) {
		mysqlService.getAll({"name": table}).then(function (trans) {
			//console.log("transactions", trans[0].title);
			that.transactions = trans;
		});
	};

	that.getTransaction = function(tablename, id){

		var deferred = $q.defer();
		mysqlService.getById({"name":tablename, "id": id})
			.then(function(trans){

				deferred.resolve(trans);
			}, function(error){
				deferred.reject(error);
			});

		return deferred.promise;
	};

	that.deleteTransaction = function(tablename, id){
		var deferred = $q.defer();
		mysqlService.delete({"name":tablename, "columns" : { "id":id}})
			.then(function(result){
				getAll("transactions");
				deferred.resolve(result);
			}, function(error){
				deferred.reject(error);
			});

		return deferred.promise;
	};


	getAll("transactions");


 return that;


};