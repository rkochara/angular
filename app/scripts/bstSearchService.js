'use strict';

angular.module('algoApp')

.service('bstSearchService', ['$timeout', function($timeout) {
  var maxHeight = 4;
  var liveCommentary = "";
  var circId;
  var textId;
  var lineId;
  var floatTextId;
  var keyCount=0;
  var alphaNumericPattern =  /^[0-9A-Z]+$/i; //pattern for a hex number
  //get the svg defined in HTML.
  var svg1 = document.getElementById("svgInst");
  var circX = 0;
  var circY = 0;
  var rootCircX = 0;
  var rootCircY = 0;
  var level = 0;
  var circDia = 25;
  var fastCircX = 0;
  var fastCircY = 0;
  var fastRootCircX = 0;
  var fastRootCircY = 0;
  var fastLevel = 0;
  var index = 0;
  var parentKey = '';
  var searchKeyList = [];
  var illegalInsert = false;
  var illegalDelete = false;
  var illegalSearch = false;


  //this function is like a class. the node class has key, x(key), y(key), left and right fields
  var node = function(key,x,y,left,right,index,parent) {
    return {
      //typeof gives the data type of the variable
      key: (typeof key === "undefined") ? null : key, //key pressed
      x: (typeof x === "undefined") ? null : x, //x-coordinate of key
      y: (typeof y === "undefined") ? null : y, //y-coordinate of key
      left: (typeof left === "undefined") ? null : left, //node to the left of current key
      right: (typeof right === "undefined") ? null : right, //node to the right of current key
      index: (typeof  index === "undefined") ? null : index, //the order in which the node was created
      parent: (typeof  parent === "undefined") ? null : parent //the order in which the node was created
    };
  };

  var root = new node();
  var fastRoot = new node();

  //fastOperateNode is same as operateNode(insert) but without delays. It is used to pre compute delays based on levels as well as x,y coordinates to do animations
  var fastOperateNode = function(op,fastRoot, key, x, y, parent) {

    function newRoot() {
      if (op === "insert") {
        fastRoot.key = key;
        fastRoot.x = x;
        fastRoot.y = y;
        fastRoot.left = new node();
        fastRoot.right = new node();
        fastRoot.parent = parent;
        fastRoot.index = index;
        index++;
        parentKey = fastRoot.parent.key;
      } else if (op === "delete") {
        illegalDelete = true;
      } else if (op === "search") {
        illegalSearch = true;
      }
    }
    function leftChild() {
      fastRootCircX = fastRoot.x;
      fastRootCircY = fastRoot.y;
      fastLevel++;
      fastCircX = fastCircX-12/Math.pow(2,fastLevel);
      fastCircY = fastCircY+3;
      fastOperateNode(op,fastRoot.left, key, fastCircX, fastCircY, fastRoot);
    }
    function rightChild() {
      fastRootCircX = fastRoot.x;
      fastRootCircY = fastRoot.y;
      fastLevel++;
      fastCircX = fastCircX+12/Math.pow(2,fastLevel);
      fastCircY = fastCircY+3;
      fastOperateNode(op,fastRoot.right, key, fastCircX, fastCircY, fastRoot);
    }
    function keyEqRoot() {
      if (op === "delete") {
        if (fastRoot.left.key === null && fastRoot.right.key === null) {
          if (fastRoot.key < fastRoot.parent.key ) {
            fastRoot.parent.left = new node();
          } else if (fastRoot.key > fastRoot.parent.key) {
            fastRoot.parent.right = new node();
          } else {
            fastRoot = new node();
          }
        }
      } else if (op === "insert") {
        illegalInsert = true;
      }
    }
    function heightOverflow() {
    }
    if (fastLevel >maxHeight) {
      heightOverflow();
    } else {
      if (fastRoot.key === null) {
        newRoot();
      }
      else {
        if (key < fastRoot.key) {
          leftChild();
        }
        else if (key > fastRoot.key) {
          rightChild();
        }
        else {
          keyEqRoot();
        }
      }
    }

  };
  /*
  //Example balanced tree:
  H;8Q;4CMU;26SW1357;AEKO9BDFJLNPRTVX
  */
  //https://gist.github.com/trevmex/821973
  //start from the root. if key < root go left; if key > root go right until tree traversal is complete.

  var floatText = document.createElementNS('http://www.w3.org/2000/svg', 'text');

  var operateNode = function(op,root, key, x, y, parent) {
    function newRoot() {
      if (op === "insert") {
        root.key = key;
        root.x = x;
        root.y = y;
        root.left = new node();
        root.right = new node();
        root.parent = parent;
        root.index = index; //tracks node creation order
        index++;
      } else if (op === "search" || op === "delete") {
        liveCommentary = key + ' Not Found';
        if (op === "delete") {
          illegalDelete = true;
        } else if (op === "search") {
          illegalSearch = true;
        }
        //execution comments in the tree
        floatText.setAttribute('x', 370+circDia*rootCircX);
        floatText.setAttribute('y', 5+circDia+circDia*rootCircY);
        floatText.setAttribute('fill', '#000000');
        floatText.setAttribute('font-size', '10');
        floatText.setAttribute('fill', 'blue');
        floatText.textContent = liveCommentary;
        floatTextId = 'floatText';
        floatText.setAttribute("id", floatTextId);
        svg1.appendChild(floatText);
      }
    }
    function leftChild() {
      liveCommentary = key + ' < ' + root.key + ' so ' + key + ' goes LEFT of ' + root.key;
      rootCircX = root.x;
      rootCircY = root.y;
      level++;
      circX = circX-12/Math.pow(2,level);
      circY = circY+3;
      floatText.setAttribute('x', 370+circDia*rootCircX);
      floatText.setAttribute('y', 5+circDia+circDia*rootCircY);
      floatText.setAttribute('fill', '#000000');
      floatText.setAttribute('font-size', '10');
      floatText.setAttribute('fill', 'blue');
      floatText.textContent = key + ' < ' + root.key + ' : go LEFT';
      floatTextId = 'floatText';
      floatText.setAttribute("id", floatTextId);
      svg1.appendChild(floatText);
      operateNode(op,root.left, key, circX, circY,root);
    }
    function rightChild() {
      liveCommentary = key + ' > ' + root.key + ' so ' + key + ' goes RIGHT of ' + root.key;
      rootCircX = root.x;
      rootCircY = root.y;
      level++;
      circX = circX+12/Math.pow(2,level);
      circY = circY+3;
      //execution comments in the tree
      floatText.setAttribute('x', 370+circDia*rootCircX);
      floatText.setAttribute('y', 5+circDia+circDia*rootCircY);
      floatText.setAttribute('fill', '#000000');
      floatText.setAttribute('font-size', '10');
      floatText.setAttribute('fill', 'blue');
      floatText.textContent = key + ' > ' + root.key + ' : go RIGHT';
      floatTextId = 'floatText';
      floatText.setAttribute("id", floatTextId);
      svg1.appendChild(floatText);
      operateNode(op,root.right, key, circX, circY,root);
    }
    function keyEqRoot() {
      if (op === "insert") {
        liveCommentary = key + ' is already in the tree';
      } else if (op === "search") {
        liveCommentary = 'Found!';
        document.getElementById('circ_' + key).setAttribute("fill", "#33FF99"); //fill the circle that was found with light green
        searchKeyList.push(key); //collect all search keys i,e color changed keys
        floatText.setAttribute('x', 370+circDia*circX);
        floatText.setAttribute('y', 5+circDia+circDia*circY);
        floatText.setAttribute('fill', '#000000');
        floatText.setAttribute('font-size', '10');
        floatText.setAttribute('fill', 'blue');
        floatText.textContent = liveCommentary;
        floatTextId = 'floatText';
        floatText.setAttribute("id", floatTextId);
        svg1.appendChild(floatText);
      } else if (op === "delete"){
        liveCommentary = ' Deleted ' + root.key ;
        document.getElementById('circ_' + root.key).setAttribute("fill", "#33FF99"); //fill the circle that was found with light green
        searchKeyList.push(key); //collect all search keys i,e color changed keys
        //case-1: No Children
        if (root.left.key === null && root.right.key === null) {
          if (root.key < root.parent.key ) {
            root.parent.left = new node();
          } else if (root.key > root.parent.key) {
            root.parent.right = new node();
          } else {
            root = new node();
            //window.location.reload();
          }
          floatText.setAttribute('x', 370+circDia*rootCircX);
          floatText.setAttribute('y', 5+circDia+circDia*rootCircY);
          floatText.setAttribute('fill', '#000000');
          floatText.setAttribute('font-size', '10');
          floatText.setAttribute('fill', 'blue');
          floatText.textContent = liveCommentary;
          floatTextId = 'floatText';
          floatText.setAttribute("id", floatTextId);
          svg1.appendChild(floatText);

          //de-color any colored circles before deleting the key
          if (document.getElementById('circ_' + key).getAttribute("fill") === "#33FF99") { //light green
            document.getElementById('circ_' + key).setAttribute("fill","#33FFFF"); //light blue
            searchKeyList = []; //clear search list
          }

          svg1.removeChild(document.getElementById('circ_' + key));
          svg1.removeChild(document.getElementById('text_' + key));
          if (root.parent !== null) {
            svg1.removeChild(document.getElementById('line_' + key + '_' + root.parent.key));
          }
        }
        else {
          liveCommentary = 'only leaf nodes can be deleted for now.' ;
        }
        //case-2: 1 Child
        //case-3: 2 Children
      }
    }
    function heightOverflow() {
      liveCommentary = "Exceeding Max supported tree height of 5";
    }
    if (level >maxHeight) {
      heightOverflow();
    } else {
      if (root.key === null) {
        //newRoot();
        $timeout(newRoot,1500);
      }
      else {
        if (key < root.key) {
          $timeout(leftChild,1500);
        }
        else if (key > root.key) {
          $timeout(rightChild,1500);
        }
        else {
          //keyEqRoot();
          $timeout(keyEqRoot,1500);
        }
      }
    }
  };

  this.bstOperation = function(op,evt) {
    var circles = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    //create text placeholder
    var text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    //create line placeholder
    var line = document.createElementNS('http://www.w3.org/2000/svg', 'line');

    //get character key from key code
    var keyChar = String.fromCharCode(evt.keyCode);

    function createTree() {

      //before each operation reset colors
      if (op === "insert" && illegalInsert === false ||
      op === "delete" && illegalDelete === false ||
      op === "search" && illegalSearch === false ) {
        searchKeyList.forEach(function(entry) {
          if (document.getElementById('circ_' + entry).getAttribute("fill") === "#33FF99") { //light green
            document.getElementById('circ_' + entry).setAttribute("fill","#33FFFF"); //light blue
            searchKeyList = []; //clear search list
          }
        }); //reset all colors from search list i,e color changed keys
      }

      if (level>maxHeight) {
        liveCommentary = "Exceeded max supported tree height of 5";
      } else if (op === "insert" && illegalInsert === false){
        if (parentKey !== "") {
          line.setAttribute("x1", 350+circDia*rootCircX);
          line.setAttribute("y1", circDia+circDia*rootCircY+circDia/2);
          line.setAttribute("x2", 350+circDia*circX);
          line.setAttribute("y2", circDia+circDia*circY-circDia/2);
          line.setAttribute('fill', 'transparent');
          line.setAttribute('stroke-width', '1px');
          line.setAttribute('stroke', 'black');
          lineId = 'line_' + keyChar + '_' + parentKey;
          line.setAttribute("id", lineId);
        }
        //set attributes for circle
        circles.setAttribute("cx",350+circDia*circX);
        circles.setAttribute("cy",circDia+circDia*circY);
        circles.setAttribute("r",circDia/2);
        circles.setAttribute('fill', '#33FFFF');
        circles.setAttribute('stroke-width', '1px');
        circles.setAttribute('stroke', 'black');
        circId = 'circ_' + keyChar;
        circles.setAttribute("id", circId);
        //set attributes for text so text appears in the middle of circle
        text.setAttribute('x', 345+circDia*circX);
        text.setAttribute('y', 5+circDia+circDia*circY);
        text.setAttribute('fill', '#000000');
        text.setAttribute('font-size', '11');
        text.textContent = keyChar;
        textId = 'text_' + keyChar;
        text.setAttribute("id", textId);
        //Append line to svg1 parent
        if (parentKey !== "") { //don't need to draw a line with only one node
          svg1.appendChild(line);
        }
        //Append circle to svg1 parent
        svg1.appendChild(circles);
        //Append text to svg1 parent
        svg1.appendChild(text);
        keyCount++;
      }
    }

    //if an Alpha numeric character is pressed set circle and text attributes
    if (alphaNumericPattern.test(keyChar)) {
      circX = 0;
      circY = 0;
      rootCircX = 0;
      rootCircY = 0;
      level = 0;
      fastCircX = 0;
      fastCircY = 0;
      fastRootCircX = 0;
      fastRootCircY = 0;
      fastLevel = 0;
      illegalInsert = false;
      illegalDelete = false;
      illegalSearch = false;
      //the actual BST algorithm call with all delays in place. Used to calculate the coordinates of SVGs
      operateNode(op,root,keyChar,circX,circY,parent);
      fastOperateNode(op,fastRoot,keyChar,fastCircX,fastCircY,parent);
      $timeout(createTree,fastLevel*1500 + 1000);
    }
  };
  //sent to controller and from there to html view
  this.getliveCom    = function() { return liveCommentary; };
}]);
