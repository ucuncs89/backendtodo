'use strict';
const Joi = require('joi')
const Hapi = require('@hapi/hapi');
const TodoController = require('./controllers/TodoController');
const ProductController = require('./controllers/ProductController');
const CategoryController = require('./controllers/CategoryController');
const PersonController = require('./controllers/PersonController')
const CartController = require('./controllers/CartController')
const OrderController = require('./controllers/OrderController')
const init = async () => {

    const server = Hapi.server({
        port: 3000,
        host: 'localhost',
        routes: {
            cors: {
                origin: ['*']           
            }
        }
    });

    server.route({
        method: 'GET',  
        path: '/',
        handler: TodoController.todoList
    });

    server.route({
        method: 'GET',	
        path: '/todo',
        handler: TodoController.todoList
    });

    server.route({
        method: 'POST',	
        path: '/todo',
        handler: TodoController.todoStore, 
    });

    server.route({
        method: 'GET',  
        path: '/todo/{id}',
        handler: TodoController.todoDetail, 
    });

    server.route({
        method: 'PUT',	
        path: '/todo/{id}',
        handler: TodoController.todoUpdate, 
    });

    server.route({
        method: 'DELETE',	
        path: '/todo/{id}',
        handler: TodoController.todoDelete, 
    });

    /* product Route : */
    server.route({
        method: 'GET',  
        path: '/product',
        handler: ProductController.ProductList
    });

    server.route({
        method: 'POST',  
        path: '/product',
        handler: ProductController.ProductInsert
    });

    server.route({
        method: 'GET',	
        path: '/product/{id}',
        handler: ProductController.ProductDetail, 
    });
    server.route({
        method: 'GET',	
        path: '/product/page={page}',
        handler: ProductController.ProductList, 
    });

    server.route({
        method: 'PUT',	
        path: '/product/{id}',
        handler: ProductController.ProductUpdate, 
    });

    server.route({
        method: 'DELETE',	
        path: '/product/{id}',
        handler: ProductController.ProductDelete, 
    });

    //----------End Product Route-------------//


    /* Category Route : */
    server.route({
        method: 'GET',  
        path: '/category',
        handler: CategoryController.CategoryList
    });

    server.route({
        method: 'POST',	
        path: '/category',
        handler: CategoryController.CategoryStore
    });

    server.route({
        method: 'GET',  
        path: '/category/{id}',
        handler: CategoryController.CategoryDetail
    });

    server.route({
        method: 'PUT',  
        path: '/category/{id}',
        handler: CategoryController.CategoryUpdate
    });

    server.route({
        method: 'DELETE',  
        path: '/category/{id}',
        handler: CategoryController.CategoryDelete
    });
    //----------End Category Route-------------//
    //--------------Cart Route-----------------//
    server.route({
        method: 'GET',
        path: '/cart',
        handler: CartController.CartList
    });

    server.route({
        method: 'POST',
        path: '/cart',
        handler: CartController.CartAddNew
    });

    server.route({
        method: 'GET',
        path: '/cart/{id}',
        handler: CartController.CartDetail
    });

    server.route({
        method: 'POST',
        path: '/cartdetail',
        handler: CartController.CartDetailStore
    });

    server.route({
        method: 'PUT',
        path: '/cartdetail',
        handler: CartController.CartDetailUpdate
    });

    server.route({
        method: 'DELETE',
        path: '/cartdetail',
        handler: CartController.CartDetailRemove
    });

    server.route({
        method: 'POST',
        path: '/checkout',
        handler: CartController.CartCheckout
    });

    server.route({
        method: 'GET',
        path: '/order',
        handler: OrderController.OrderList
    });
    
    //--------------Persons Route--------------//
    server.route({
        method: 'GET',
        path: '/person',
        handler: PersonController.PersonList
    });

    server.route({
        method: 'POST',	
        path: '/insertgraph',
        handler: PersonController.InsertGraph
    });
    await server.start();
    console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {

    console.log(err);
    process.exit(1);
});

init();