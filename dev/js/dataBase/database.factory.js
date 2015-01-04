'use strict';

module.exports = function ($q){
	var Service = function(name, version, description, size, dbPlugin){
		console.log('initialising Service');
		//'mydb', '1.0', 'Playlist DB', 2 * 1024 * 1024
		var dbLocation = dbPlugin || window;

		this.db = dbLocation.openDatabase(name, version, description,size,function(){

		});
		this.isReady = true;
		//console.log('BOOM');
	};

	Service.prototype.query = function (){
		var self = this;
		var deferred = $q.defer();
		if(self.isReady){
			var onSuccessCB = function(tx,res){
				var output = [];

				for (var i = 0; i < res.rows.length; i++) {
					output.push(res.rows.item(i));
				}

				deferred.resolve(output);
			};
			var onErrorCB = function(tx, err){

				deferred.reject(err);
			};

			self.db.transaction(function(tx) {
				tx.executeSql(query,values,onSuccessCB ,onErrorCB );
			});
		}

		return deferred.promise;
	};

	Service.prototype.createTable = function(json){
		var self = this;
		if(self.isReady){
			var table_name=json["name"];
			var deleteExisiting = (json["deleteExisiting"] ==="true");
			var table_columns = json["columns"];
			//var sql = "";
			if(deleteExisiting){
				self.db.transaction(function(tx) {
					tx.executeSql('DROP TABLE IF EXISTS '+table_name);
				});
			}
			var columns = [];
			angular.forEach(table_columns, function(column) {
				columns.push(column.name + ' ' + column.type);
			});
			var query = 'CREATE TABLE IF NOT EXISTS ' + table_name + ' (' + columns.join(',') + ')';
			self.db.transaction(function(tx) {
				//console.log(query);
				tx.executeSql(query);
			});
		}
	};

	Service.prototype.insert = function(table, data){
		var self = this;
		var deferred = $q.defer();
		if(self.isReady){

			var table_name = table;
			var columns = data;
			var column_names = [];
			var column_values = [];
			var column_indicators=[];

			Object.keys(columns).forEach(function(key){
				column_names.push(key);
				column_values.push(columns[key]);
				column_indicators.push('?');
			});
			var query = 'INSERT INTO '+table_name+'('+column_names.join(',')+') VALUES ('+column_indicators.join(',')+')';
			self.db.transaction(function(tx) {
					tx.executeSql(query,column_values, function(tx, res){
						deferred.resolve(res);
					});
				},
				function(e) {
					console.log("ERROR: " + e.message);
				});

		}
		else{
			deferred.reject("No Database Ready");
		}

		return deferred.promise;
	}//END: insert

	Service.prototype.insertMany = function(tableName, many){
		var self = this;
		if(self.isReady){
			angular.forEach(many,  function(single){
				var row = {
					"name" : tableName,
					"columns" : single
				};
				self.sqlService.insert(tableName, row);
			});
		}
	};

	Service.prototype.getAll = function(json){
		var self = this;

		if(self.isReady){
			var deferred = $q.defer();
			var table_name = json["name"];
			var order_by=json["orderBy"] || "id";
			var query = "SELECT * FROM "+table_name+" ORDER BY "+order_by+" ASC";

			self.db.transaction(function(tx) {
				tx.executeSql(query,[], function(tx,res){
					var output = [];

					for (var i = 0; i < res.rows.length; i++) {
						output.push(res.rows.item(i));
					}
					deferred.resolve(output);
				}, function(tx, err){

					deferred.reject(err);
				});
			});
			return deferred.promise;
		}
	}; //END: getAll

	Service.prototype.getById = function(json){
		var self = this;
		if(self.isReady){
			var deferred = $q.defer();
			var table_name = json["name"];
			var id = json["id"];
			var query = "SELECT * FROM "+table_name+" WHERE id='"+id+"'";

			self.db.transaction(function(tx) {
				console.dir(tx);
				tx.executeSql(query,[], function(tx,res){
					console.dir(res);
					deferred.resolve(res.rows.item(0));
				}, function(tx, err){

					deferred.reject(err);
				});
			});
			return deferred.promise;
		}
	};//END: getById

	Service.prototype.delete = function(json){
		var deferred = $q.defer();
		var self = this;
		if(self.isReady){

			var table_name = json["name"];
			var where_columns = json["columns"];
			var column_name_indicators = [];
			var column_values = [];

			Object.keys(where_columns).forEach(function(key){
				column_name_indicators.push(key+"="+"?");
				column_values.push(where_columns[key]);

			});
			var query = 'DELETE FROM '+table_name+' WHERE '+column_name_indicators.join(' AND ');
			// console.log("query: "+query + column_values.toString());

			self.db.transaction(function(tx) {
				tx.executeSql(query,[column_values], function(tx,res){
					//    console.log("res",res);
					//deferred.resolve(output);
					deferred.resolve("successfully Deleted");
				}, function(tx, err){
					//   console.error(err);
					deferred.reject(err);
				});
			});
		}
		return deferred.promise;
	}

	return Service;
};