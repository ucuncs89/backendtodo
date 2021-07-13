'use strict';

const { Model } = require('objection');


class CartDetail extends Model{

    static get tableName(){
        return 'cartdetail';
    }

    static get relationMappings(){
        const Cart = require('./Cart');
        const Product = require('./Product');
        return{
            cart:{
                relation: Model.HasManyRelation,
                modelClass : Cart,
                join:{
                    from:'cartdetail.cart_id',
                    to:'cart.id'
                }
            },
            product:{
                relation: Model.HasManyRelation,
                modelClass : Product,
                join:{
                    from:'cartdetail.product_id',
                    to:'product.id'
                }
            },
        }
    }
}
module.exports = CartDetail;