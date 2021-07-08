'use strict';
const Joi = require('joi')
const Hapi = require('@hapi/hapi');
const TodoController = require('./controllers/TodoController');
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
    



    await server.start();
    console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {

    console.log(err);
    process.exit(1);
});

init();