(function() {
  'use strict';

  var myApp = angular.module("MenuApp", ['ngMaterial', 'md.data.table']);
  //**** Start Contollers *****//
  var menuItemContoller = function($scope, menuItemService, utilsService) {
    var myctrl = this;
    $scope.searchMenuItems = function() {
      if (!$scope.menuItemSearch) {
        utilsService.showToast("Please Enter Data in Search Textbox ",
          "error")
        return;
      }
      var doneFunction = function(response) {

        var items = response.data.menu_items;
        myctrl.foundItems = utilsService.filterList(items, $scope.menuItemSearch);
        myctrl.pageNumber = 1;
        myctrl.pageLimit = 10;

      };
      var errorFunction = function() {};
      menuItemService.then(doneFunction, errorFunction);
    };

    myctrl.removeSearchList = function(idx) {
      console.log(idx);
      myctrl.foundItems.splice(idx, 1);
    };



  };
  menuItemContoller.$inject = ["$scope", "menuItemService", "utilsService"];
  //**** End Contollers *****//

  //**** Start Services  *****//

  var menuItemService = function($http, AppURL) {
    return $http({
      method: 'GET',
      url: AppURL
    });
  };
  var utilsService = function($mdToast) {
    this.showToast = function(msg, cls) {
      var toastProps = $mdToast.simple()
        .textContent(msg)
        .position("top right")
        .toastClass(cls)
        .hideDelay(3000);
      $mdToast.show(toastProps);
    };

    this.filterList = function(items, searchItem) {
      var filterFunction = function(elem) {
        return elem.name.indexOf(searchItem) > -1 ||
          elem.description.indexOf(searchItem) > -1;
      };
      var addIndexesFun = function(elem, idx) {
        elem.idx = idx + 1;
        return elem;
      };
      return items.filter(filterFunction).map(addIndexesFun);
    };

  };
  menuItemService.$inject = ["$http", "AppURL"];
  utilsService.$inject = ["$mdToast"];
  //**** End Services *****//

  //**** Start Directives *****//
  var menuListItemDirect = function() {
    var desc = {};
    desc.restrict = "E";
    //desc.scope={pageNumber:"="};
    desc.templateUrl = "templates/listItem.html";

    desc.controller = "MenuItemContoller";
    desc.controllerAs = "ctrl";
    return desc;
  };
  var removeButtonDirective = function() {
    var desc = {};
    desc.restrict = "A";
    desc.require = "^menuItems",
      //desc.scope={pageNumber:"="};
      desc.link = function(scope, element, attrs, ctrl) {
        var item = scope.item;

        element.bind("click", function() {
          var index = attrs.currentRowIndex;
          ctrl.removeSearchList(index);

        });
      };

    return desc;
  };
  menuItemService.$inject = ["$http", "AppURL"];

  //**** End Directives *****//
  myApp.controller("MenuItemContoller", menuItemContoller)
    .service("menuItemService", menuItemService)
    .service("utilsService", utilsService)
    .directive("menuItems", menuListItemDirect)
    .directive("removeAction", removeButtonDirective)
    .constant("AppURL",
      "https://davids-restaurant.herokuapp.com/menu_items.json");
})();
