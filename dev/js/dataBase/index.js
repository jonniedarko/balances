module.exports = angular.module('DataBase-Access',[])
    .factory('sqlService', require('./database.factory'))
.factory('DB', [ '$q',function($q){
    var _this = this;
    _this.isReady = false;
    db = {};

    _this.config=function(name, version, description,size,callback){
        //'mydb', '1.0', 'Playlist DB', 2 * 1024 * 1024
        db = window.openDatabase(name, version, description,size,callback);
        _this.isReady = true;
        //console.log('BOOM');
    };

    _this.createTable = function (json){
        if(_this.isReady){
        //    var deferred = $q.defer();
            var table_name=json["name"];
            var deleteExisiting = (json["deleteExisiting"] ==="true");
            var table_columns = json["columns"];
            //var sql = "";
            if(deleteExisiting){
                db.transaction(function(tx) {
                    tx.executeSql('DROP TABLE IF EXISTS '+table_name);
                });
            }
            var columns = [];
            angular.forEach(table_columns, function(column) {
                    columns.push(column.name + ' ' + column.type);
            });
            var query = 'CREATE TABLE IF NOT EXISTS ' + table_name + ' (' + columns.join(',') + ')';
            db.transaction(function(tx) {
                //console.log(query);
                tx.executeSql(query);
            });
        }
    };//END createTable

    _this.insert = function(json){
        if(_this.isReady){

            var table_name=json["name"];
            var columns = json["columns"];
            var column_names = [];
            var column_values = [];
            var column_indicators=[];
            /*angular.forEach(columns, function(column){
                var key = Object.keys(column)[0];

                column_names.push(key);
                column_values.push(column[key]);
                column_indicators.push('?')

            });*/
           // console.dir(Object.keys(columns));
            Object.keys(columns).forEach(function(key){
                    column_names.push(key);
                    column_values.push(columns[key]);
                    column_indicators.push('?');
            });
            var query = 'INSERT INTO '+table_name+'('+column_names.join(',')+') VALUES ('+column_indicators.join(',')+')';
          //  console.log("query: "+query+' '+column_values.toString());
            db.transaction(function(tx) {
                tx.executeSql(query,column_values, function(tx, res){
                   // console.log("insertId: " + res.insertId + " -- probably 1");
                    //console.log("rowsAffected: " + res.rowsAffected + " -- should be 1");
                });
            },
            function(e) {
                console.log("ERROR: " + e.message);
            });
        }
    };//END: insert

    _this.insertMany = function(tableName, many){
        if(_this.isReady){
            angular.forEach(many,  function(single){
                var row = {
                    "name" : tableName,
                    "columns" : single
                };
                _this.insert(row);
            });
        }
    };
    _this.delete = function(json){
        var deferred = $q.defer();
        if(_this.isReady){

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

            db.transaction(function(tx) {
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
    _this.getAll = function(json){
            var deferred = $q.defer();
            var table_name = json["name"];
            var groupBy = json["groupby"];


        if(_this.isReady){
            var deferred = $q.defer();
            var table_name = json["name"];
            var order_by=json["orderBy"] || "id";
            var query = "SELECT * FROM "+table_name+" ORDER BY "+order_by+" ASC";

            db.transaction(function(tx) {
                    tx.executeSql(query,[], function(tx,res){
                        //console.log("res.rows.length: " + res.rows.length + " -- should be 1");
                        //console.dir(res.rows);
                        var output = [];

                        for (var i = 0; i < res.rows.length; i++) {
                            output.push(res.rows.item(i));
                        }

                       // console.log("output",output)
                        deferred.resolve(output);
                    }, function(tx, err){

                        deferred.reject(err);
                    });
            });
            return deferred.promise;
        }
    }; //END: getAll

    _this.getById = function(json){
        if(_this.isReady){
            var deferred = $q.defer();
            var table_name = json["name"];
            var id = json["id"];
            var query = "SELECT * FROM "+table_name+" WHERE id='"+id+"'";

            db.transaction(function(tx) {
                    tx.executeSql(query,[], function(tx,res){
                        //console.log("res.rows.length: " + res.rows.length + " -- should be 1");
                        //console.dir(res.rows);


                        deferred.resolve(res.rows.item(0));
                    }, function(tx, err){

                        deferred.reject(err);
                    });
            });
            return deferred.promise;
        }
    };


    _this.query = function(query, values){//, onSuccessCallback, onErrorCallback){
        var deferred = $q.defer();
        if(_this.isReady){
            var onSuccessCB = function(tx,res){ /*onSuccessCallback || */
               // console.log("res.rows.length: " + res.rows.length + " -- should be 1");
               // console.dir(res.rows);
                var output = [];

                for (var i = 0; i < res.rows.length; i++) {
                    output.push(res.rows.item(i));
                }

                deferred.resolve(output);
            };
            var onErrorCB = function(tx, err){/*onErrorCallback || */

                deferred.reject(err);
            };

            db.transaction(function(tx) {
                    tx.executeSql(query,values,onSuccessCB ,onErrorCB );
            });
        }

        return deferred.promise;

    };

    return _this;


}])
    .service('DBS', require('./transactions.service'));
