
(function(){
'use strict';

 var myApp=angular.module("CustomFilterApp",['ngMaterial']);
 var filterFunction=function (){
    return function (input,replace) {
       replace=replace||"Ahmed Filter Is ready ---->";
       return replace+ (input||"");
    };
 };

 var ctrl=function ($scope,readyFilter) {
    $scope.message=" Khamis";
    $scope.sayMessage=function(){
       return readyFilter($scope.message);
    };
    $scope.checkDigestLoop=function () {
       console.log(this.$$watchersCount);
    };
 };

 myApp.controller("CustomFilterAppCtrl",ctrl);
 myApp.filter('ready',filterFunction);
 ctrl.$inject=["$scope","readyFilter"];
})();
