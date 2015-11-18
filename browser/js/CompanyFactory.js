app.factory('CompanyFactory', function($http) {
  return {
    all: getAll,
    getOne: getOne,
    updateName: updateName
  };

  function getAll() {
    return $http.get('/api/company')
    .then( function(resp) { return resp.data });
    // .then( resp => resp.data)
  }

  function getOne(id) {
    return $http.get('/api/company/'+ id)
    .then( function(resp) { return resp.data });
    // .then( resp => resp.data)
  }

  function updateName(id, name) {
    return $http.patch('/api/company/'+id+'/name', { name: name })
  }
})
