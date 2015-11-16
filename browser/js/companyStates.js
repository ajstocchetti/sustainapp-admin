app.config(function($stateProvider) {
  $stateProvider
    .state('company', {
      url: "/company/:companyID",
      templateUrl: "/views/companyDetail.html",
      controller: function($scope, company) {
        $scope.company = company
      },
      resolve: {
        company: function($stateParams, CompanyFactory) {
          return CompanyFactory.getOne($stateParams.companyID)
          .then(function(c) { return c })
          // .then(function(c) { return "ANDY"})
        }
      }
  })

});
