'use strict'

const { Model } = require('objection')

class Movie extends Model {

  static get tableName() {
    return 'movies'
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['name'],

      properties: {
        id: { type: 'integer' },
        name: { type: 'string', minLength: 1, maxLength: 255 },
      },
    }
  }

  static get relationMappings() {
    const Person = require('./Person')

    return {
      actors: {
        relation: Model.ManyToManyRelation,
        modelClass: Person,

        join: {
          from: 'movies.id',
          through: {
            from: 'persons_movies.movieId',
            to: 'persons_movies.personId',
          },
          to: 'persons.id',
        },
      },
    }
  }
}

module.exports = Movie
