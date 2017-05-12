'use strict';

angular.module('angularProj')

.controller('calcController', ['$scope', function($scope) {
  $scope.sendFeedback = function() {
                      console.log($scope.feedback);
                       if ($scope.feedback.agree && ($scope.feedback.mychannel === "")&& !$scope.feedback.mychannel) {
                          $scope.invalidChannelSelection = true;
                          console.log('incorrect');
                       }
                      else {
                          $scope.invalidChannelSelection = false;
                          $scope.feedback = {mychannel:"", firstName:"", lastName:"",
                          agree:false, email:"" };
                          $scope.feedback.mychannel="";
                          $scope.feedbackForm.$setPristine();
                          console.log($scope.feedback);
                    }
              };

}]);
