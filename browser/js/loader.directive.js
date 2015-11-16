app.directive('loader', function() {
  return {
    restrict: 'E',
    template: '<div><h2>Loading...</h2><img src="images/loader.gif"></div>'
  }
})
