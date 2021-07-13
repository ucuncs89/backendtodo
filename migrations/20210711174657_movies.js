
exports.up = function(knex) {
    return knex.schema.createTable('movies', (table) => {
        table.increments('id').primary()
        table.string('name')
      })
};

exports.down = function(knex) {
  
};
