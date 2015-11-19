app.factory('CompanyFactory', function($http) {
  return {
    all: getAll,
    getOne: getOne,
    updateName: updateName,
    addAlias: addAlias,
    removeAlias: removeAlias,
    removeCategory: removeCategory
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
    return $http.patch('/api/company/'+id+'/name', { name: name });
  }

  function addAlias(id, alias) {
    return $http.post('/api/company/'+id+'/alias', { alias: alias });
  }

  function removeAlias(id, alias) {
    return $http.delete('/api/company/'+id+'/alias/'+alias);
  }

  function removeCategory(id, catId) {
    return $http.delete('/api/company/'+id+'/category/'+catId);
  }
})
