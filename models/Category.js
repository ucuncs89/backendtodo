'use strict';

const { Model } = require('objection');

class Category extends Model {
  
  static get tableName() {
    return 'category';
  }
  
  static relationMappings() {
    const Product = require('./Product');
    return {
      product: {
        relation: Model.ManyToManyRelation,
        modelClass: Product,
        join: {
          from: 'category.id',
          through: {
            from: 'categories_products.categoryId',
            to: 'categories_products.productId',
          },
          to: 'product.id',
        },
      },
    }
  }
}

module.exports = Category;
