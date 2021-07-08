const knex = require('knex')({
        client: 'pg',
        connection: {
          host : '127.0.0.1',
          user : 'postgres',
          password : 'asdf1234',
          database : 'todo'
        }
      });

module.exports = knex