'use strict';

angular.module('algoApp')

.service('selSortService', ['$timeout', function($timeout) {
  var rectIdArr = [];
  var describeI = "";
  var describeJ = "";
  var describeMin = "";
  var describeSwap = "";
  //function to move rectangles around based on the input data pattern
  this.moveRects = function(inputArr) {
    var rectId ="";
    var rectIdView = "";
    var xval =0;
    rectIdArr = [];
    for (var i=0; i<inputArr.length; i++) {
      rectId = "rectId_".concat(i);
      rectIdView = "rectId_".concat(inputArr[i]);
      xval =  20+10*i ;
      rectIdArr.push(rectIdView);
      document.getElementById(rectIdView).setAttribute("x", xval);
      console.log(rectIdView,xval);
    }
    console.log('rectIdArr =' + rectIdArr);
  };

  //function to execute delayed selection sort
  this.delayedSelSort =  function (arr) {
    console.log(arr);
    var i =0;
    var min =0;
    var swap = 0;
    var xval_i = 0;
    var xval_min = 0;
    var j = 0;
    var temp = 0;

    //function for swap in selection sort
    function delayedSwap() {
      swap = arr[min];
      arr[min] = arr[i];
      arr[i] = swap;
      //save xval before swapping i and min of rectIdArr[]
      xval_i = document.getElementById(rectIdArr[i]).getAttribute("x");
      xval_min = document.getElementById(rectIdArr[min]).getAttribute("x");
      //Note: whenever DOM elements are swapped swap the rectID array elements to keep track of the view change
      //swap i and min of rectIdArr[]
      temp = rectIdArr[min];
      rectIdArr[min] = rectIdArr[i];
      rectIdArr[i] = temp;
      //swap xvals by using previously saved xvals
      describeSwap = "//swap a[".concat(i).concat("] and a[").concat(min).concat("]") ;
      document.getElementById(rectIdArr[min]).setAttribute("x",xval_min);
      document.getElementById(rectIdArr[i]).setAttribute("x",xval_i);
      i++;
    }
    //inner loop of selection sort
    function jLoop() {
      if (j<arr.length) {
        //gray out all previous blue colors
        for (var iter=0; iter<arr.length; iter++) {
          if (document.getElementById(rectIdArr[iter]).getAttribute("fill") === "blue") {
            document.getElementById(rectIdArr[iter]).setAttribute("fill","gray");
          }
        }
        //fill blue for current j
        describeJ = "// j = ".concat(j).concat(" goes from ").concat(i+1).concat(" to N-1");
        document.getElementById(rectIdArr[j]).setAttribute("fill","blue");

        if(arr[j] <arr[min]) {
          min = j;
          //clear previous greens so only the latest min is tracked in green
          for (iter=0; iter<arr.length; iter++) {
            if (document.getElementById(rectIdArr[iter]).getAttribute("fill") === "green") {
              document.getElementById(rectIdArr[iter]).setAttribute("fill","gray");
            }
          }
          //min in green
          describeMin = "// smallest num found at j = ".concat(j);
          document.getElementById(rectIdArr[min]).setAttribute("fill","green");
        }
        j++;
        $timeout(jLoop,100); //inner loop delay can be arbitrary
        return describeJ;
      }
    }
    //outer loop of selection sort
    function iLoop() {
      if (i<arr.length) {
        //gray out all previous green colors
        for (var iter=0; iter<arr.length; iter++) {
          if (document.getElementById(rectIdArr[iter]).getAttribute("fill") === "red" ||
          document.getElementById(rectIdArr[iter]).getAttribute("fill") === "green") {
            document.getElementById(rectIdArr[iter]).setAttribute("fill","gray");
          }
        }
        document.getElementById(rectIdArr[i]).setAttribute("fill","red");
        describeI = "// i = ".concat(i).concat(" goes from 0 to N-1");
        min = i;
        describeMin = "// smallest num found at i = ".concat(i);
        j=i+1;
        $timeout(jLoop,1000); //inner loop delay can be arbitrary
        $timeout(delayedSwap,3500); //delay should be > all jLoop delays = 1000+ 20*100
        $timeout(iLoop,4500);//delay should be greater than delayColor delay >3500
      } else { //to clear any lingering color
        for (var itr=0; itr<arr.length; itr++) {
          if (document.getElementById(rectIdArr[itr]).getAttribute("fill") !== "gray") {
            document.getElementById(rectIdArr[itr]).setAttribute("fill","gray");
          }
        }
      }
    }
    //Note: This is the only statement in delayedSelSort function. everything else is inside other functions
    $timeout(iLoop,1000);

  };
  //to broadcast required fields for controller to control html
  this.getDescribeI    = function() { return describeI; };
  this.getDescribeJ    = function() { return describeJ; };
  this.getDescribeMin  = function() { return describeMin; };
  this.getDescribeSwap = function() { return describeSwap; };


}]);
