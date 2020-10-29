// Require the framework and instantiate it
import fastify from 'fastify'
import * as fs from 'fs';
import { Pool } from 'pg';
import { TodoRepository } from './db';
import { Todo } from './models/todo';

const pool = new Pool({
    user: 'todo_admin',
    database: 'tododb',
    password: 'D6*dbiKSjC4cL^CfWH3#',
});

const server = fastify();
const todoRepo = new TodoRepository(pool);

const opts = {
    schema: {
        response: {
            '2xx': {
                type: 'array',
            }
        }
    }
}

server.register(require('fastify-cors'), { 
    // TODO Maybe add options at some point?
})

server.register((instance, options, next) => {
    instance.get('/list', opts, (req, reply) => {
        return todoRepo.listTodos();
    });
    next();
}, { prefix: '/todo' });

server.register((instance, options, next) => {
    instance.get('/list', opts, (req, reply) => {
        reply.send({ greet: 'user_list' });
    });
    next();
}, { prefix: '/user' });

// Run the server!
server.listen(8080, (err) => {
    if (err) {
        console.error(err)
        process.exit(1)
    }


    // If database is empty this can be uncommented

    // fs.readFile('./todos.json', 'utf-8', (err, data) => {
    //     let todos: Todo[] = JSON.parse(data.toString());
    //     console.log(todos);
    //     todoRepo.addTodos(todos);
    // });

})
