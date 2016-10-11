
(function(){
'use strict';

 var myApp=angular.module("CustomFilterApp",['ngMaterial']);
 var filterFunction=function (){
    return function (input,replace) {
       replace=replace||"Ahmed Filter Is ready ---->";
       return replace+ (input||"");
    };
 };

 var service=function () {
    var _name="Ahmed";

    this.getName=function(){return _name};
 };
 var factoryService=function () {
    var service={};
    var _name="Ahmed Factory";
    service.getName=function(){return _name};
    return service;

 };

 var ctrl=function ($scope,readyFilter,$timeout,myService,fac) {
    $scope.message=" Khamis";
    $scope.counter=0;
    console.log(myService.getName());
    console.log(fac.getName());
    $scope.checkDigestLoop=function(){
       $timeout(function () {
         $scope.counter++;

         console.log("Counters Count",$scope.counter);
       }, 2000);

    };

 };

 myApp.controller("CustomFilterAppCtrl",ctrl);
 myApp.filter('ready',filterFunction);
 myApp.service('myService',service);
 myApp.factory('factoryService',factoryService);

 ctrl.$inject=["$scope","readyFilter",'$timeout','myService','factoryService'];
})();
