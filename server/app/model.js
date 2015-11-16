var knex = require('../../config.js').knexConf;
var bookshelf = require('bookshelf')(knex);

var Company = bookshelf.Model.extend({
  tableName: 'EllisJonesScores',
  idAttribute: 'companyID',
  alias: function() {
    return this.hasMany(Alias, 'companyID');
  },
  categories: function() {
    return this.belongsToMany(Category, 'company_category', 'company_id', 'category_id')
    // return this.belongsToMany(Category).through(CompCat);
  }
});

var Alias = bookshelf.Model.extend({
  tableName: 'companyAlias',
  company: function() {
    return this.belongsTo(Company);
  }
});

var Category = bookshelf.Model.extend({
  tableName: 'category',
  idAttribute: 'pkey',
  companies: function() {
    return this.belongsToMany(Company, 'company_category', 'category_id', 'company_id');
  }

})

// var CompCat = bookshelf.Model.extend({
//   tableName: 'company_category'
// })


module.exports = {
  Company: Company,
  Alies: Alias,
  Category: Category
}
