
exports.up = function(knex) {
  return knex.schema
  .createTable('categories_products', (table) => {
    table.increments('id').primary()
    
    table
    .integer('categoryId')
    .unsigned()
    .references('id')
    .inTable('category')
    .onDelete('CASCADE')
    .index()
    
    table
    .integer('productId')
    .unsigned()
    .references('id')
    .inTable('product')
    .onDelete('CASCADE')
    .index()
  })
};

exports.down = function(knex) {
  
};
