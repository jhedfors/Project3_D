var myApp = angular.module('myApp',['ngRoute','ngMessages'])
myApp.config(function($routeProvider){
  $routeProvider
    .when('/',{
      templateUrl:'partials/login.html'
    })
    .when('/bids',{
      templateUrl:'partials/bids.html'
    })
    .when('/result',{
      templateUrl:'partials/result.html'
    })
    .otherwise({
      redirectTo:'/'
    })
})
