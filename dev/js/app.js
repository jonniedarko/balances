// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
require('./dashboard');
require('./dataBase');
require('./transactions');
require('./calenderviews');
angular.module('starter', ['ionic', 'DashBoard', 'DataBase-Access', 'Transactions', 'CalenderViews']) //'starter.controllers', 'sidemenu.module', 'transactions', 'calender.views'])

    .run(function($ionicPlatform) {
      $ionicPlatform.ready(function() {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if(window.cordova && window.cordova.plugins.Keyboard) {
          cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        }
        if(window.StatusBar) {
          // org.apache.cordova.statusbar required
          StatusBar.styleDefault();
        }
      });
    })
//init DB and Tables

    .run(function(DB){

    DB.config('my-balance', '1.0', 'Balances DB', 2 * 1024 * 1024);

        DB.createTable({
            "name": "mytransactions",
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
        //used on first run to add some entries
        if(true){
            DB.insert({
                "name" : "mytransactions",
                "columns" :
                    {
                        "id" : new Date().getTime(),
                        "date" : Math.round(new Date(2014, 10, 29, 11, 30)/1000),//"2014-11-29",
                        "time" : "11:30",
                        "title" : "Payment",
                        "description" : "this is a test description",
                        "amount" : 2700,
                        "account" : "current",
                        "payee_payer" : "SAP",
                        "indicator" : "cash"
                    }

            });
            var newDate = Math.round(new Date()/1000);
            function _newDate (){
                return ++newDate;
            }
            DB.insertMany("mytransactions",[
                {
                    "id" : _newDate(),
                    "title" : "insurance",
                    "date" : Math.round(new Date(2014, 10, 29, 12, 30)/1000),//"2014-11-30",
                    "time" : "12:30",
                    "description" : "this is a test description",
                    "amount" : -33.17,
                    "account" : "current",
                    "payee_payer" : "Insurance",
                    "indicator" : "car"
                },
                {
                    "id" : _newDate(),
                    "title" : "ATM",
                    "date" : Math.round(new Date(2014, 10, 30, 12, 30)/1000),//"2014-11-30",
                    "time" : "12:30",
                    "description" : "this is a test description",
                    "amount" : -20,
                    "account" : "current",
                    "payee_payer" : "CASH",
                    "indicator" : "cash"
                },
                {
                    "id" : _newDate(),
                    "title" : "Lunch",
                    "date" : Math.round(new Date(2014, 10, 30, 13, 30)/1000),//"2014-11-30",
                    "time" : "13:30",
                    "description" : "this is a test description",
                    "amount" : -20,
                    "account" : "current",
                    "payee_payer" : "CASH",
                    "indicator" : "cash"
                },
                {
                    "id" : _newDate(),
                    "title" : "Lunch",
                    "date" : Math.round(new Date(2014, 11, 1, 12, 30)/1000),//"2014-12-29",
                    "time" : "12:30",
                    "description" : "this is a test description",
                    "amount" : -5.99,
                    "account" : "current",
                    "payee_payer" : "Dinner",
                    "indicator" : "cash"
                }
            ]);
        }
})
    .config(['$stateProvider', '$urlRouterProvider',function($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('tab', {
                url: '/tab',
                abstract: true,
                templateUrl: 'templates/tabs/tabs.template.html'
            })
            .state('tab.dash', {
                url: '/dash',
                views: {
                    'tab-dash': {
                        templateUrl: 'templates/dashboard/dashboard.template.html',//,
                        controller: 'DashCtrl'
                    }
                }
            })
            .state('tab.transactions', {
                url: '/transactions?toast',
                views: {
                    'tab-transactions': {
                        templateUrl: 'templates/transactions/transactionList.html',
                        controller: 'TransactionListCtrl'
                    }
                }
            })
            .state('tab.transaction', {
                url: '/transactions/:transactionId',
                views: {
                    'tab-transactions': {
                        templateUrl: 'templates/transactions/transaction.html',
                        controller: 'TransactionCtrl'
                    }
                }
            })
            .state('tab.days', {
                url: "/calenderview",
                views: {
                    'tab-calenderview': {
                        templateUrl: "templates/calenderviews/daylist.html",
                        controller: 'DayListCtrl'
                    }
                }
            })
            .state('tab.day', {
                url: "/calenderview/days/:date",
                views: {
                    'tab-calenderview': {
                        templateUrl: "templates/calenderviews/day.html",
                        controller: 'DayCtrl'
                    }
                }
            }) .state('tab.account', {
                url: '/account',
                views: {
                    'tab-account': {
                        templateUrl: 'templates/account/account.template.html'//,
                        //controller: 'AccountCtrl'
                    }
                }
            });
        $urlRouterProvider.otherwise('/tab/dash');
}]);

