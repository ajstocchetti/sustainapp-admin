'use strict'
var router = require('express').Router();
module.exports = router;

var path = require('path');
var Company = require(path.join(__dirname, '../model.js')).Company;

router.get('/', function (req, res) {
  Company.fetchAll().then(function(data) {
    res.send(data)
  });
});

router.get('/:id', function(req, res) {
  var id = req.params.id;
  new Company( { companyID: id })
  .fetch({withRelated: ['categories', 'alias'], require: true})
  .then(function(data) { res.json(data) })
  // Company.query({ where: { companyId: id }})
  // .fetchOne()
  //   // .then(function(company) {
    //   res.send(company);
    // })
})
