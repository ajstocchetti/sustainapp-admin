'use strict'
var router = require('express').Router();
module.exports = router;

var path = require('path');
var Category = require(path.join(__dirname, '../model.js')).Category;

router.get('/', function (req, res) {
  Category.fetchAll().then(function(data) {
    res.send(data)
  });
});

router.get('/:id', function(req, res) {
  var id = req.params.id;
  new Category( { pkey: id })
  .fetch({withRelated: ['companies'], require: true})
  .then(function(data) {
    res.send(data);
  })
})
