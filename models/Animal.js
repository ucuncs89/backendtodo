'use strict'

const { Model } =  require('objection')
const Person = require('./Person')
class Animal extends Model {
    
    static get tableName(){
        return 'animals'
    }

    static get jsonSchema(){
        return{
            type: 'object',
            require: ['name'],
            properties:{
                id: { type: 'integer' },
                ownerID: { type:['integer','null']},
                name: { type: 'string', minLength: 1, maxLength: 255},
                species: { type: 'string', minLength: 1, maxLength: 255},
            },
        }
    }

    static get relationMappings(){
        return{
            owner:{
                relation: Model.BelongsToOneRelation,
                modelClass: Person,
                join:{
                    from: 'animals.ownerID',
                    to: 'persons.id'
                },
            },
        }       
    }
}
module.exports = Animal