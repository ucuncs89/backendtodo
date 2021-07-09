const knex = require('../database/index')
const { Model } = require('objection');
const { Product } = require('../models/Product');

Model.knex(knex);

exports.ProductList = async function(request, h){
	const product = await Product.query().orderBy('id');;
	try{
		return product
	}catch(err){
		console.log(err)
	}
}

exports.ProductDetail = async function(request, h){
	const id = request.params.id;
	const product = await Product.query().findById(id);
	if (product) {
		return product
	}else{
		return h.response({ message: 'Error Product Not Found' }).code(404);
	}
}

exports.ProductStore = async function(request, h) {
	const name = request.payload.name;
	const description = request.payload.description;
	const price = request.payload.price;
	const stock = request.payload.stock;
	const status = request.payload.status;
	const category_id = request.payload.category_id;

	const product = await Product.query().insertAndFetch({
		name: name,
		description: description,
		price: price,
		stock: stock,
		status: status,
		category_id: category_id,
	});

	if (product) {
		return h.response({product, message: 'Insert Product Successfully ', status: 'ok'})
	}else{
		return h.response({ message: 'Error Store Product' }).code(400);
	}
}

exports.ProductUpdate = async function(request, h) {
	const id = request.params.id;
	const name = request.payload.name;
	const description = request.payload.description;
	const price = request.payload.price;
	const stock = request.payload.stock;
	const status = request.payload.status;
	const category_id = request.payload.category_id;
	const product = await Product.query().findById(id).updateAndFetchById(id,{
    	name: name,
		description: description,
		price: price,
		stock: stock,
		status: status,
		category_id: category_id,
  	});
	if (product) {
		return h.response({product, message: 'Update Product Successfully ', status: 'ok'})
	}else{
		return h.response({ message: 'Error Store Product' }).code(400);
	}
	//return knex('todo').where({ id: id }).update({ name: name, done: done}, ['id', 'name', 'done'])      
}

exports.ProductDelete = async function(request, h) {
	const id = request.params.id;
	const product = await Product.query().deleteById(id);
	if (product) {
		return h.response({ message: 'Deleted Successfully' });
	}else{
		return h.response({ message: 'Error Delete Category' });
	}
	//return knex('todo').where('id', id).del()
}

