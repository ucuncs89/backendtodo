
exports.up = function(knex) {
    return knex.schema.createTable('animals', (table) => {
        table.increments('id').primary()
  
        table
          .integer('ownerId')
          .unsigned()
          .references('id')
          .inTable('persons')
          .onDelete('SET NULL')
          .index()
  
        table.string('name')
        table.string('species')
      })
};

exports.down = function(knex) {
  
};
