
(function(){
'use strict';

 var myApp=angular.module("ShopCartApp",['ngMaterial']);

 var shopCartServiceFactory=function () {
   var shopCartService={};

   shopCartService.userShopCart=[];
   shopCartService.shopCartItems=[
    {name:"Raspberry Pi P2",quantity:50},
    {name:"Raspberry Pi Zero",quantity:30},
    {name:"Arudino Uno",quantity:20} ,
    {name:"Arudino Duo",quantity:20},
    {name:"Intel Edison",quantity:30},
    {name:"Esprino",quantity:10}
   ];

   shopCartService.addItem=function(idx,itemName,quantity){

     this.userShopCart.push(this.shopCartItems[idx]);
     this.shopCartItems.splice(idx,1);
   };
   shopCartService.removeItem=function(idx,itemName,quantity){

     this.shopCartItems.push(this.userShopCart[idx]);
     this.userShopCart.splice(idx,1);

   };
   return shopCartService;
 };


 var shopCartToBeBought=function($scope,shopCartService){
    this.itemsForSale=shopCartService.shopCartItems;
    this.buyItem=function (idx) {
      shopCartService.addItem(idx);
    };

 };
 var shopCartBought=function($scope,shopCartService){
   this.soldItems=shopCartService.userShopCart;
   this.returnItem=function (idx) {
     shopCartService.removeItem(idx);
   };

 };
  shopCartToBeBought.$inject=["$scope","shopCartServiceFactory"];
  shopCartBought.$inject=["$scope","shopCartServiceFactory"];

  myApp.factory("shopCartServiceFactory",shopCartServiceFactory);
  myApp.controller('ShopCartToBeBoughtCtrl',shopCartToBeBought);
  myApp.controller('ShopCartBoughtCtrl',shopCartBought);

})();
