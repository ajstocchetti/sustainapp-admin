app.factory('CompanyFactory', function($http) {
  return {
    all: getAll,
    getOne: getOne
  };

  function getAll() {
    return $http.get('/api/company')
    .then( resp => resp.data)
  }

  function getOne(id) {
    return $http.get('/company/'+ id)
    .then( resp => resp.data)
  }
})
