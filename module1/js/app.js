
(function(){
'use strict';

 var myApp=angular.module("LunchCheck",['ngMaterial']);

 var myController=function($scope,$mdToast){
   $scope.foodItems="";
   $scope.showToast=function(msg,cls){
      var toastProps=$mdToast.simple()
        .textContent(msg)
        .position("top right")
        .toastClass(cls)
        .hideDelay(3000);

       $mdToast.show( toastProps);



   };
   $scope.checkFoodItems=function(){

     if (!$scope.foodItems) {
       $scope.showToast("Please enter your food items in the text box","error");
       return ;
   }
   var listFoodItmes=$scope.foodItems.split(",").filter(function(item){
     return item!=="undefined"&&item.trim();
   });
    if(listFoodItmes.length<=3){
      $scope.showToast("Enjoy !!!!!","success");
    }
    else{
      $scope.showToast("Too Much For Meal !!!!!","error");
      $scope.foodItems="";
      $scope.error="33";
    }
   };


 };
  myController.$inject=["$scope","$mdToast"],
  myApp.controller('LunchCheckController',myController);

})();
