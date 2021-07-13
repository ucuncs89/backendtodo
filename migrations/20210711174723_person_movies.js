
exports.up = function(knex) {
    return knex.schema.createTable('persons_movies', (table) => {
        table.increments('id').primary()
  
        table
          .integer('personId')
          .unsigned()
          .references('id')
          .inTable('persons')
          .onDelete('CASCADE')
          .index()
  
        table
          .integer('movieId')
          .unsigned()
          .references('id')
          .inTable('movies')
          .onDelete('CASCADE')
          .index()
      })
};

exports.down = function(knex) {
  
};
