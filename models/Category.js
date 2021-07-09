'use strict';

const { Model } = require('objection');

class Category extends Model {

  static get tableName() {
    return 'category';
  }
}

module.exports = {
  Category,
};
