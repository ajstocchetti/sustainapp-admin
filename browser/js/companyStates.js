app.config(function($stateProvider) {
  $stateProvider
    .state('company', {
      url: "/company/:companyID",
      templateUrl: "/views/companyDetail.html",
      resolve: {
        company: function($stateParams, CompanyFactory) {
          return CompanyFactory.getOne($stateParams.companyID)
          .then(function(c) { return c })
        },
        categories: function(CategoryFactory) {
          return CategoryFactory.all().then(function(c) { return c })
        }
      },
      controller: function($scope, CompanyFactory, company, categories) {
        $scope.company = company;
        $scope.textName = company.company;
        $scope.categories = categories;

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
            $scope.company.alias.splice(aliasIndex, 1);
          })
          .catch(function(resp) { setUpdateErr("Alias", resp.data); })
        }

        $scope.addCategory = function(catIndex) {
          if(!catIndex) {
            return;
          }
          clearUpdateErr();
          CompanyFactory.addCategory(company.companyID, catIndex)
          .then(function(resp) {
            // look up the title for the category we just added
            var catData = $scope.categories.filter(function(entry) {
              return entry.pkey == catIndex
            });
            $scope.company.categories.push(catData[0]);
          })
          .catch(function(resp) { setUpdateErr("Category", resp.data); })
        }

        $scope.removeCategory = function(catIndex) {
          clearUpdateErr();
          CompanyFactory.removeCategory(company.companyID, $scope.company.categories[catIndex].pkey)
          .then(function(resp) {
            $scope.company.categories.splice(catIndex, 1);
          })
          .catch(function(resp) { setUpdateErr("Category", resp.data )})
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
