const knex = require('../database/index')
const { Model } = require('objection');
const { Todo } = require('../models/Todo');

Model.knex(knex);

exports.todoList = async function(request, h){
	const todo = await Todo.query();
	try{
		return todo
	}catch(err){
		console.log(err)
	}
}

exports.todoDetail = async function(request, h){
	const id = request.params.id;
	const todo = await Todo.query().findById(id);
	try {
		return todo
	}catch(err){
		console.log(err)
	}
}

exports.todoStore = async function(request, h) {
	const name = request.payload.name;
	const done = request.payload.done;
	const todo = await Todo.query().insert({
		name: name,
		done: done
	});	
	try {
		return todo	
	} catch (err) {
		console.log(err)
	}
}

exports.todoUpdate = async function(request, h) {
	const id = request.params.id;
	const name = request.payload.name;
	const done = request.payload.done;
	const todo = await Todo.query()
  		.findById(id)
  		.patch({
    	name: name,
		done: done,
  	});
	try {
		return todo	
	}catch (err) {
		console.log(err)
	}
	//return knex('todo').where({ id: id }).update({ name: name, done: done}, ['id', 'name', 'done'])      
}

exports.todoDelete = async function(request, h) {
	const id = request.params.id;
	const todo = await Todo.query().deleteById(id);
	try{
		return todo
	}catch{
		return console.log(err)
	}
	//return knex('todo').where('id', id).del()
}

