'use strict'

window.app = angular.module('SA-Admin', ['ui.router']);

app.config(function ($urlRouterProvider, $locationProvider) {
    // This turns off hashbang urls (/#about) and changes it to something normal (/about)
    $locationProvider.html5Mode(true);
    // If we go to a URL that ui-router doesn't have registered, go to the "/" url.
    $urlRouterProvider.otherwise('/');
});





app.controller('MainCtrl', ['$scope', 'CompanyFactory',
  function($scope, CompanyFactory) {
    $scope.loading = true;
    CompanyFactory.all()
    .then(function(companies) {
      $scope.companies = companies;
      $scope.loading = false;
    })
  }]
);
