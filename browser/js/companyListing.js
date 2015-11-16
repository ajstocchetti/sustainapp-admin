app.directive('companyListing', function() {
  return {
    restrict: 'E',
    templateUrl: '/views/companyListing.html',
    scope: {
      companies: '='
    }
  }
})
