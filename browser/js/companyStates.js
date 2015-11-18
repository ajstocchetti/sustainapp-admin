app.config(function($stateProvider) {
  $stateProvider
    .state('company', {
      url: "/company/:companyID",
      templateUrl: "/views/companyDetail.html",
      controller: function($scope, CompanyFactory, company) {
        $scope.company = company;
        $scope.textName = company.company;
        $scope.updateName = function(name) {
          CompanyFactory.updateName(company.companyID, $scope.textName)
          .then(function(response) { alert(response.data) })
        }
      },
      resolve: {
        company: function($stateParams, CompanyFactory) {
          return CompanyFactory.getOne($stateParams.companyID)
          .then(function(c) { return c })
        }
      }
  })
  .state('companyListing', {
    url: "/",
    template: '<loader ng-show="loading"></loader><company-listing companies=companies ng-hide="loading"></company-listing>',
    controller: function($scope, CompanyFactory) {
      $scope.loading = true;
      CompanyFactory.all()
      .then(function(companies) {
        $scope.companies = companies;
        $scope.loading = false;
      });
    }
  })

});
