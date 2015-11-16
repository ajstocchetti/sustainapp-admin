app.config(function($stateProvider) {
  $stateProvider
    .state('company', {
      url: "/company/:companyID",
      templateUrl: "/views/companyDetail.html",
      controller: function($scope, company) {
        $scope.company = company
      },
      resolve: {
        company: function($stateParams) {
          return $stateParams.companyID;
        }
      }
  })

});
