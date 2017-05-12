'use strict';

angular.module('angularProj', ['ui.router','ngResource'])

.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
        $stateProvider
                    // route for the home page
            .state('app', {
                url:'/',
                views: {
                    'header': {
                        templateUrl : 'views/header.html'
                    },
                    'content': {
                        templateUrl : 'views/calc.html',
                        controller  : 'calcController'
                    },
                    'footer': {
                        templateUrl : 'views/footer.html'
                    }
                }
            });

            $urlRouterProvider.otherwise('/');
    }])



;
