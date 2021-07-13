'use strict'

const { Model } =require('objection')
const Animal = require('./Animal')
const Movie = require('./Movie')
class Person extends Model {
    
    static get tableName(){
        return 'persons'
    }
    
    static get jsonSchema() {
        return {
            type: 'object',
            required: ['firstName', 'lastName'],
    
            properties: {
                id: { type: 'integer' },
                parentId: { type: ['integer', 'null'] },
                firstName: { type: 'string', minLength: 1, maxLength: 255 },
                lastName: { type: 'string', minLength: 1, maxLength: 255 },
                age: { type: 'number' },
    
                address: {
                    type: 'object',
                    properties: {
                        street: { type: 'string' },
                        city: { type: 'string' },
                        zipCode: { type: 'string' },
                    },
                },
            },
        }
    }

    static get relationMappings(){
        return{
            pets:{
                relation: Model.HasManyRelation,
                modelClass: Animal,
                join:{
                    from: 'persons.id',
                    to: 'animals.ownerId',
                },
            },

            movies: {
                relation: Model.ManyToManyRelation,
                modelClass: Movie,
                join: {
                  from: 'persons.id',
                  through: {
                    from: 'persons_movies.personId',
                    to: 'persons_movies.movieId',
                  },
                  to: 'movies.id',
                },
              },

            children:{
                relation: Model.HasManyRelation,
                modelClass: Person,
                join:{
                    from: 'persons.id',
                    to: 'persons.parentId'
                },
            },
            parent:{
                relation:{
                    modelClass: Person,
                    join:{
                        from: 'persons.parentId',
                        to: 'persons.id'
                    },
                },
            }
        }
    }
}
module.exports = Person