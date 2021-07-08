const knex = require('../database/index')


exports.taskList = function(request, h){
	 return knex('todo').orderBy('id','asc');
}

exports.taskCreate = function(request, h) {
         	const name = request.payload.name;
            const done = request.payload.done;
 			return knex('todo').insert({name: name, done: done});
}

exports.taskUpdate = function(request, h) {
	 		const id = request.params.id;
            const name = request.payload.name;
            const done = request.payload.done;
            return knex('todo').where({ id: id }).update({ name: name, done: done}, ['id', 'name', 'done'])      
}

exports.taskDelete = function(request, h) {
			const id = request.params.id;
            return knex('todo').where('id', id).del()
}

