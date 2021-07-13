'use strict';

const { Model } = require('objection');
const Category  = require('./Category');

class Product extends Model {

  static get tableName() {
    return 'product';
  }

  static relationMappings ={
    category: {
      relation: Model.ManyToManyRelation,
      modelClass: Category,

      join: {
        from: 'product.id',
        through: {
          from: 'categories_products.productId',
          to: 'categories_products.categoryId',
        },
        to: 'category.id',
      },
    },
  }

}

module.exports = Product;

/*
    category:{
      relation : Model.BelongsToOneRelation,
      modelClass: Category,
      join: {
        from: 'product.category_id',
        to: 'category.id'
      }
    } */