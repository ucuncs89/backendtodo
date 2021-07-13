const knex =  require('../database/index')
const { Model } = require('objection')
const Cart = require('../models/Cart')
const CartDetail = require('../models/CartDetail')


exports.OrderList = async function(request, h){
	try {
		const orderlist = await Cart.query().select('*').where('status','checkout').withGraphFetched('cartdetail');
		return orderlist;
		// console.log(category);	
	} catch (error) {
		console.log(error)
		return h.response({ message: 'Error Fetching' });
	}
}
