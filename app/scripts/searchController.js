'use strict';

angular.module('algoApp')

.controller('searchController', ['$scope','bstSearchService', function($scope,bstSearchService) {

  $scope.algos=[{id:0,name:"sequential"},{id:1,name:"binary"},{id:2,name:"BST"}]; //search algorithm hash
  $scope.operations=[{id:0,name:"insert"},{id:1,name:"search"},{id:2,name:"delete"}]; //operations hash

  $scope.selectedAlgo = "";
  $scope.selectedOp = "";
  $scope.showBstSearchComments = true;
  $scope.liveCommentary = "Live Commentary";

  /*
  Seraching Algos
  */
  $scope.searchAlgo = function(algo) {
    $scope.liveCommentary = 'Search Algo = '  + algo.name;
    console.log($scope.liveCommentary);
    $scope.selectedAlgo = algo.name;
  };

  $scope.getOp = function(op) {
    $scope.liveCommentary = 'operation = ' + op;
    console.log($scope.liveCommentary);
    $scope.selectedOp = op;
  };
  //services
  $scope.bstSearchService = bstSearchService;

  $scope.$watch('bstSearchService.getliveCom()', function(newValLiveCom) {
    $scope.liveCommentary = newValLiveCom;
  });


  //This function is called when a key is pressed down.
  $scope.keyPressedDown = function(evt) {
    //each key has a code given by evt.keycode. //keycode can be decoded back to character using String.fromCharCode()
    //  console.log('key code = ' + evt.keyCode + ' character = ' + String.fromCharCode(evt.keyCode));
    if ($scope.selectedAlgo === "BST" && ( $scope.selectedOp === "insert" || $scope.selectedOp === "search" || $scope.selectedOp === "delete")) {
      //$scope.showBstSearchComments = true;
      bstSearchService.bstOperation($scope.selectedOp,evt);
    }
  };

}]);
