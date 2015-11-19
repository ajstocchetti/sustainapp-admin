app.config(function($stateProvider) {
  $stateProvider
    .state('company', {
      url: "/company/:companyID",
      templateUrl: "/views/companyDetail.html",
      controller: function($scope, CompanyFactory, company) {
        $scope.company = company;
        $scope.textName = company.company;

        function clearUpdateErr() {
          $scope.updateErr = {};
        }
        function setUpdateErr(type, err) {
          $scope.updateErr.type = type,
          $scope.updateErr.text = err
        }

        $scope.updateName = function() {
          clearUpdateErr();
          CompanyFactory.updateName(company.companyID, $scope.textName)
          .then(function(resp) { $scope.company.company = resp.data; })
          .catch(function(resp) { setUpdateErr("Company name", resp.data); })
        };

        $scope.addAlias = function() {
          clearUpdateErr();
          CompanyFactory.addAlias(company.companyID, $scope.newAlias)
          .then(function(resp) {
            $scope.company.alias.push(resp.data);
            $scope.newAlias = null;
          })
          .catch(function(resp) { setUpdateErr("Alias", resp.data); })
        }

        $scope.removeAlias = function(aliasIndex) {
          clearUpdateErr();
          CompanyFactory.removeAlias(company.companyID, $scope.company.alias[aliasIndex].pkey)
          .then(function(resp) {
            $scope.company.alias.pop(aliasIndex);
          })
          .catch(function(resp) { setUpdateErr("Alias", resp.data); })
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
