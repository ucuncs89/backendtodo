const knex =  require('../database/index')
const { Model } = require('objection')
const Cart = require('../models/Cart')
const CartDetail = require('../models/CartDetail')
const Product = require('../models/Product')

Model.knex(knex);

exports.CartList = async function(request, h){
    try{
        const cart = await Cart.query();
        return cart
    }catch(err){
        console.log(err)
        return h.response({ message: 'Error Fetching'})
    }
}

exports.CartDetail = async function(request,h){
    const id = request.params.id;
    try{
        const cart = await Cart.query().findById(id);
        const cartdetail = await CartDetail.query().select('*').where('cart_id','=',id).withGraphFetched('product');
        if (cart && cartdetail) {
        return h.response({cart,cartdetail})   
        } else {
        return h.response({ message: 'Error Fetch Cart Not Found'})
        }
    }catch(err){
        console.log(err)
    }
}

exports.CartAddNew = async function(request, h){
    const username =  request.payload.username;
    try {
        const cart = await Cart.query().insertAndFetch({
            username: username,
            status: 'cart'
        });
        if (cart) {
            return h.response({message: 'Silahkan Tambahkan Cart',cart})
        } else {
            return h.response({message: 'Gagal Error'}).code(400);            
        }
    } catch (error) {
        console.log(error)
    }
}
exports.CartDetailStore =  async function(request, h){
    const cart_id = request.payload.cart_id;
    const product_id = request.payload.product_id;
    const quantity =  request.payload.quantity;
    const product = await Product.query().findById(product_id)
    let sub_total = quantity * product.price
    try {
        const cartdetail = await CartDetail.query().insertAndFetch({
            cart_id: cart_id,
            product_id: product_id,
            quantity: quantity,
            sub_total: sub_total,
            status: 'cart',
        });
        if (cartdetail) {
            return h.response({message: 'Success Add ',cartdetail})
        } else {
            return h.response({message: 'Error'}).code(400)           
        }
    } catch (error) {
            return console.log(error)
    }
}
exports.CartDetailRemove =  async function(request, h){
    const id = request.payload.id
    try {
        const cartdetail = await CartDetail.query().deleteById(id)
        if (cartdetail) {
            return h.response({message: 'Cart Detail Deleted'})
        } else {
            return h.response({message: 'Error'}).code(400)
        }
    }   catch (err) {
        return console.log(err)
    }
}
exports.CartDetailUpdate = async function(request, h){
    const id = request.payload.id
    const quantity = request.payload.quantity
    const product_id = request.payload.product_id
    const product = await Product.query().findById(product_id)
    try {
        const cartdetail = await CartDetail.query().findById(id).updateAndFetchById(id,{
            quantity : quantity,
            sub_total : quantity * product.price
        })
        if (cartdetail) {
            return cartdetail
        } else {
            return h.response({message: 'error'}).code(400)
        }    
    } catch (error) {
            console.log(error)
    }
}
exports.CartCheckout = async function(request, h){
    const id = request.payload.id;
    console.log(id)
    try {  
        const total =  await CartDetail.query().sum('sub_total').where('cart_id',id).first()
        const cart =  await Cart.query().patch({ status: 'checkout',total: total['sum'] }).where('id', '=', id);
        const updatecartdetail =  await CartDetail.query().patch({ status: 'checkout' }).where('cart_id', '=', id);
        //return h.response({message: total['sum']})
        if (cart && updatecartdetail) {
            return h.response({message: 'Success'})
        } else {
            return h.response({message: 'Error'})
        }
    } catch (error) {
        console.log(error)       
    }
}