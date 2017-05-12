'use strict';

angular.module('algoApp')

.controller('stringController', ['$scope', function($scope) {

   $scope.feedback = {mychannel:"", firstName:"", lastName:"",
                      agree:false, email:"" };
   var channels = [{value:"tel", label:"Tel."}, {value:"Email",label:"Email"}];

   $scope.channels = channels;
   $scope.invalidChannelSelection = false;

}])

;
