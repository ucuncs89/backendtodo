const knex = require('../database/index')
const { Model } = require('objection');
const { Category } = require('../models/Category');

Model.knex(knex);

exports.CategoryList = async function(request, h){
	const category = await Category.query();
	if (category) {
		return category
	}else{
		return h.response({ message: 'Error Fetching' });
	}
}

exports.CategoryDetail = async function(request, h){
	const id = request.params.id;
	const category = await Category.query().findById(id);
	if (category) {
		return category
	}else{
		return h.response({ message: 'Error Category Not Found' }).code(404);
	}
}

exports.CategoryStore = async function(request, h) {
	const name = request.payload.name;
	const category = await Category.query().insertAndFetch({
		name: name,
	});
	if (category) {
		return h.response({category, message: 'Insert Category Successfully ', status: 'ok'})
	}else{
		return h.response({ message: 'Error Store Category' }).code(400);
	}
}

exports.CategoryUpdate = async function(request, h) {
	const id = request.params.id;
	const name = request.payload.name;
	const category = await Category.query().findById(id).updateAndFetchById(id,{
    	name: name,
  	});
	if (category) {
		return category
	}else{
		return h.response({ message: 'Error Update Category' });
	}
	//return knex('todo').where({ id: id }).update({ name: name, done: done}, ['id', 'name', 'done'])      
}

exports.CategoryDelete = async function(request, h) {
	const id = request.params.id;
	const category = await Category.query().deleteById(id);
	if (category) {
		return h.response({ message: 'Delete Successfully' });
	}else{
		return h.response({ message: 'Error Delete Category' });
	}
	//return knex('todo').where('id', id).del()
}

