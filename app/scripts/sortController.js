'use strict';

angular.module('algoApp')

//.controller('sortController', ['$scope', '$timeout, function($scope,$timeout) {
.controller('sortController', ['$scope','selSortService', function($scope,selSortService) {

  // declare variables
  $scope.color = "gray"; //initial color of rectangles when page is loaded
  $scope.inputArr = []; //inout data array on which sort is going to be performed
  $scope.dataTypes=[{id:0,name:"random"},{id:1,name:"sorted"},{id:2,name:"reverseSorted"}]; //input data format hash
  $scope.algos=[{id:0,name:"selection"},{id:1,name:"insertion"},{id:2,name:"merge"}]; //sorting algorithm hash
  $scope.colorArr = ["#0000ff","#0000dd","#0000bb","#000099","#000077","#000055","#000033","#00ff00","#00dd00","#00bb00",
  "#009900","#007700","#005500","#003300","#ff0000","#dd0000","#bb0000","#990000","#770000","#550000"]; //not currently used
  //variables that control the algorithm pseudocode that is dispalyed on the webpage
  $scope.describeData = "";
  $scope.describeSort = "";
  $scope.describeCodeI = "";
  $scope.describeCodeJ = "";
  $scope.describeCodeMin = "";
  $scope.describeCodeSwap = "";
  $scope.showSelSortCode = false;


  //function to set colors
  $scope.setColor = function(n) {
    if (n===0) {
      $scope.color = "gray";
    } else {
      $scope.color = "gray";
    }
    return $scope.color;
    //    return $scope.colorArr[n];
  };

  //create ID array. Also used for input sorted array
  $scope.idArray = function(min, max) {
    var input = [];
    for (var i = min; i < max; i++) {
      input.push(i);
    }
    return input;
  };

  //create reverse ID array. Used for input reverse sorted array
  $scope.reverseIdArray = function(min, max) {
    var input = [];
    for (var i = max-1; i >= min; i--) {
      input.push(i);
    }
    return input;
  };

  //function to shuffle a given array. Used to randomize array when random data format is selected
  $scope.shuffle = function(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
    return array;
  };

  //function to call input data generation based on dropdown selection
  $scope.arrangeData = function(type) {
    switch(type.name) {

      case "random" :
      $scope.describeData = "Random input data pattern selected";
      $scope.inputArr = $scope.shuffle($scope.idArray(0,20));
      console.log("random type selected");
      break;

      case "sorted" :
      $scope.describeData = "Sorted input data pattern selected";
      $scope.inputArr = $scope.idArray(0,20);
      console.log("sort type selected");
      break;

      case "reverseSorted" :
      $scope.describeData = "Reverse Sorted input data pattern selected";
      $scope.inputArr = $scope.reverseIdArray(0,20);
      console.log("reverse sort type selected");
      break;

      default :
      $scope.describeData = "";
      $scope.inputArr = $scope.idArray(0,20);
      console.log("default type selected");
    }
    console.log($scope.inputArr);
    //move rectangles once input data pattern is set before sort algos are called
    selSortService.moveRects($scope.inputArr);

  };


  //HTML elements cannot bind with variables in services. They can only bind with variables in controller.
  //So, we have to bring the varaibles required by HTML binding from services to controller using "$watch" {
  $scope.selSortService = selSortService;
  $scope.describeI = "";
  $scope.describeJ = "";
  $scope.describeMin = "";
  $scope.describeSwap = "";

  $scope.$watch('selSortService.getDescribeI()', function(newVal) {
    $scope.describeI = newVal;
  });
  $scope.$watch('selSortService.getDescribeJ()', function(newVal) {
    $scope.describeJ = newVal;
  });
  $scope.$watch('selSortService.getDescribeMin()', function(newVal) {
    $scope.describeMin = newVal;
  });
  $scope.$watch('selSortService.getDescribeSwap()', function(newVal) {
    $scope.describeSwap = newVal;
  });
  //End watching services //}

  //pseudo code that appears in the view
  $scope.pseudoCodeSelSort = function() {
    $scope.describeSort = "// Running Selection Sort...\n  // 1)For i:0->N find min in j:i+1->N.\n  // 2)Swap a[i] and a[min]\n";
    $scope.describeCodeI = "for (i = 0; i < N; i++) {\n min=i; \n ";
    $scope.describeCodeJ = "for (j = i+1; j < N; j++) {\n";
    $scope.describeCodeMin = "if (a[j] < a[min]) min = j; \n }\n";
    $scope.describeCodeSwap = "swap(a[i], a[min]); \n }";
  };

  //function to call the Algorithm based on selection
  $scope.sortAlgo = function(algo) {
    switch(algo.name) {

      case "selection" :
      $scope.showSelSortCode = true; // show selection sort pseudo code in view
      $scope.pseudoCodeSelSort(); // selection sort pseudo code content
      //clone array instead of copying. copy will not create new object but refer to the old one.
      var clonedArray = JSON.parse(JSON.stringify($scope.inputArr));
      selSortService.delayedSelSort(clonedArray); //call selection sort algorithm execution
      break;

      case "insertion" :
      $scope.describeSort = "Running Insertion Sort...";
      //clone array instead of copying. copy will not create new object but refer to the old one.
      clonedArray = JSON.parse(JSON.stringify($scope.inputArr));
      selSortService.delayedSelSort(clonedArray); //call selection sort algorithm
      break;

      case "merge" :
      $scope.describeSort = "Running Merge Sort...";
      break;
      default :
      $scope.describeSort = "";
    }
  };
}]);
