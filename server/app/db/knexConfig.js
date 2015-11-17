var knexCon = { charset : 'utf8' };

if (process.env.NODE_ENV === 'production') {
  knexCon.host = process.env.dbUrl;
  knexCon.user = process.env.dbUser;
  knexCon.password = process.env.dbPwd;
  knexCon.database = process.env.database;
} else {
  var config = require('../../../config.js');
  knexCon.host = config.host;
  knexCon.user = config.user;
  knexCon.password = config.password;
  knexCon.database = config.database;
}

var knex = require('knex')({
  client: 'mysql',
  connection: knexCon
});

module.exports = {
  knex: knex
}
