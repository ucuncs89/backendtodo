'use strict';

const { Model } = require('objection');

class Cart extends Model {

    static get tableName(){
        return 'cart';
    }

    static get relationMappings(){
        const CartDetail = require('./CartDetail');
        return {
            cartdetail:{
                relation: Model.HasManyRelation,
                modelClass: CartDetail,
                join:{
                    from:'cart.id',
                    to:'cartdetail.cart_id'
                }
            }
            
        }
    }
    
}
module.exports = Cart;