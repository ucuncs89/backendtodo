'use strict';

const { Model } = require('objection');

class Todo extends Model {

  static get tableName() {
    return 'todo';
  }
}

module.exports = {
  Todo,
};
