const knex = require('../database/index')
const { Model } = require('objection');
const Product  = require('../models/Product');
const Joi = require('joi');

Model.knex(knex);

exports.ProductList = async function(request, h){
	const page = request.params.page-1;
	try{
		const product = await Product.query().select('id','name','description','price','stock').where('status','=',true).withGraphFetched('category').page(page,5);
		if (product) {
			return product
		}else{
			return h.response({ message: 'Error Product Not Found' }).code(404);
		}
	}catch(err){
		console.log(err)
	}
}

exports.ProductDetail = async function(request, h){
	const id = request.params.id;
	//const product = await Product.query().findById(id);
	try {
		const product = await Product.query().findById(id).withGraphFetched('category');
		if (product) {
			return product
		}else{
			return h.response({ message: 'Error Product Not Found' }).code(404);
		}
	} catch (error) {
		console.log(error)
	}
}

exports.ProductStore = async function(request, h) {
	const name = request.payload.name;
	const description = request.payload.description;
	const price = request.payload.price;
	const stock = request.payload.stock;
	const status = request.payload.status;
	const category_id = request.payload.category_id;

	const schema = Joi.object({
		name: Joi.string().alphanum().min(3).max(32).required,
		description: Joi.string().min(12).max(255).required,
		price: Joi.number().required,
		stock: Joi.number().required,
		status: Joi.boolean().required,
		category_id:Joi.required
	})	
	try {
		const validate_schema = schema.validate({name : name, description: description, price: price, stock: stock, status: status, category_id: category_id})

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
	} catch (error) {
		console.log(error)
	}	
}

exports.ProductInsert =  async function(request, h){
    const name = request.payload.name;
	const description = request.payload.description;
    const price = request.payload.price;
	const stock = request.payload.stock;
	const status = request.payload.status;
	const category_id = request.payload.category_id;
	try {
        const product = await Product.query().insertGraph(
            [
              {
                name: name,
                description: description,
				price: price,
                stock: stock,
				status: status,
                category_id: category_id,

                category: [
                  {
                    id: category_id
                  }
                ]
              }
            ],
            {
                relate: true
            }
        );
        if (product) {
            return h.response({message: 'Insert Product Successfully ', status: 'ok',product})
        } else {
            return h.response({ message: 'Error Slur' });
        }
    }catch(error) {
        console.log(error)
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