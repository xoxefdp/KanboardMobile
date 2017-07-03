var app = angular.module('kanboard_app', ['ngRoute', 'ui.bootstrap.datetimepicker', 'ngStorage']);

app.config(['$routeProvider',
  function ($routeProvider) {
      $routeProvider.
        when('/login', {
            templateUrl: 'templates/login.html',
            controller: 'loginCtrl'
        }).
        when('/mainscreen', {
            templateUrl: 'templates/mainscreen.html',
            controller: 'mainScreenController'
        }).
        when('/workitemlist', {
            templateUrl: 'templates/workitemslist.html',
            controller: 'workItemListController'
        }).
        when('/workitemdetail', {
        templateUrl: 'templates/workitemdetail.html',
        controller: 'workItemDetailController'
        }).
        when('/createworkitem', {
            templateUrl: 'templates/createworkitem.html',
            controller: 'createWorkItemController'
        }).
        otherwise({
            redirectTo: '/login'
        });
  }]);