app.factory('CategoryFactory', function($http) {
  return {
    all: getAll
  };

  function getAll() {
    return $http.get('/api/category')
    .then(function(resp) { return resp.data })
  }

})
