
exports.up = function(knex) {
    
    return knex.schema
    .createTable('persons', (table) => {
      table.increments('id').primary()

      table
        .integer('parentId')
        .unsigned()
        .references('id')
        .inTable('persons')
        .onDelete('SET NULL')
        .index()

      table.string('firstName')
      table.string('lastName')
      table.integer('age')
      table.json('address')
    })
    
};

exports.down = function(knex) {
  
};
