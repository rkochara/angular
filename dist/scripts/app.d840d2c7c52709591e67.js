'use strict';

angular.module('algoApp', ['ui.router','ngResource'])

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
        templateUrl : 'views/sort.html',
        controller  : 'sortController'
      },
      'footer': {
        templateUrl : 'views/footer.html'
      }
    }
  })

  // route for the search page
  .state('app.search', {
    url:'search',
    views: {
      'content@': {
        templateUrl : 'views/search.html',
        controller  : 'searchController'
      }
    }
  })

  // route for the graph page
  .state('app.graph', {
    url: 'graph',
    views: {
      'content@': {
        templateUrl : 'views/graph.html',
        controller  : 'graphController'
      }
    }
  })


  // route for the string page
  .state('app.string', {
    url:'string',
    views: {
      'content@': {
        templateUrl : 'views/string.html',
        controller  : 'stringController'
      }
    }
  });

  $urlRouterProvider.otherwise('/');
}])



;
