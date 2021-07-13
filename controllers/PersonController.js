const knex = require('../database/index')
const { Model } =require('objection')
const Person = require('../models/Person')

Model.knex(knex)

exports.PersonList = async function(request, h){
    try {
        const person = await Person.query().withGraphJoined('[pets,movies,children]');
        if (person) {
            return person
        }else{
            return h.response({ message: 'Error Person Not Found' }).code(404);
        }
    }catch(err) {
        console.log(err)
    }
}

exports.InsertGraph =  async function(request, h){
    const firstName = request.payload.firstName;
	const lastName = request.payload.lastName;
	const moviesid = request.payload.moviesid;
    try {
        const person = await Person.query().insertGraph(
            [
              {
                firstName: firstName,
                lastName: lastName,
                
                movies: [
                  {
                    id: moviesid
                  }
                ]
              }
            ],
            {
                relate: true
            }
        );
        if (person) {
            return person;
        } else {
            return h.response({ message: 'Error Slur' }).code(400);
        }
    }catch(error) {
        console.log(error)
    }
}

exports.InsertGraph1 = async function(request, h){
    const firstName = request.payload.firstName;
    const lastName = request.payload.lastName;
    const children_firstName = request.payload.children_firstName;
    const children_lastName = request.payload.children_lastName;
    const pets_name = request.payload.pets_name;
    const species = request.payload.species;
    
    try {
        const graph = await Person.query().insertGraph({
            firstName: firstName,
            lastName: lastName,
          
            children: [
              {
                parentID : 2 ,
                firstName: children_firstName,
                lastName: children_lastName,
                pets: [
                  {
                    name: pets_name,
                    species: species
                  }
                ]
              }
            ]
          });
        if (graph) {
            return graph;
        } else {
            return h.response({message: "error"})
        }
    } catch (error) {
        console.log(error)
    }

}