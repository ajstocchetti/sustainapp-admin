'use strict'
var router = require('express').Router();
module.exports = router;

var path = require('path');
var Models = require(path.join(__dirname, '../db/model.js'))
var Company = Models.Company;
var Alias = Models.Alias;
var Category = Models.Category;


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
})


router.patch('/:id/name', function(req, res) {
  if(!req.body.name) {
    return res.status(500).send("No name provided");
  }

  Company.forge({ companyId: req.params.id })
  .fetch({ require: true })
  .then(function(company) {
    company.save({ company: req.body.name })
    .then(function() { res.send(req.body.name) })
    .catch(function(err) {
      res.status(500).send(err)
    })
  })
  .catch(function(err) {
    res.status(500).send(err)
  })
})


router.post('/:id/alias', function(req, res) {
  if(!req.body.alias) {
    return res.status(500).send("No name provided");
  }

  Alias.forge({
    alias: req.body.alias,
    companyID: req.params.id
  }).save()
  .then(function(alias) { res.send(alias) })
  .catch(function(err) { res.status(500).send(err) })
})


router.delete('/:id/alias/:aid', function(req, res) {
  Alias.forge({
    pkey: req.params.aid,
    companyID: req.params.id
  })
  .fetch({ require: true })
  .then(function(alias) {
    alias.destroy()
    .then(function() { res.sendStatus(204)})
    .catch(function(err) { res.status(500).send(err) })
  })
  .catch(function(err) { res.status(500).send(err) })
})


router.delete('/:id/category/:catId', function(req, res) {
  Models.CompCat.where({
    company_id: req.params.id,
    category_id: req.params.catId
  })
  .destroy()
  .then(function() { res.sendStatus(204); })
  .catch(function(err) { res.status(500).send(err); })
})
