var knex = require('knex')({
  client: 'mysql',
  connection: {
    host : process.env.dbUrl,
    user : process.env.dbUser,
    password : process.env.dbPwd,
    database : process.env.database,
    charset : 'utf8'
  }
});

module.exports = require('bookshelf')(knex);
