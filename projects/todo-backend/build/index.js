"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Require the framework and instantiate it
var fastify_1 = __importDefault(require("fastify"));
var pg_1 = require("pg");
var db_1 = require("./db");
var pool = new pg_1.Pool({
    user: 'todo_admin',
    database: 'tododb',
    password: 'D6*dbiKSjC4cL^CfWH3#',
});
var server = fastify_1.default();
var todoRepo = new db_1.TodoRepository(pool);
var opts = {
    schema: {
        response: {
            '2xx': {
                type: 'array',
            }
        }
    }
};
server.register(require('fastify-cors'), {
// TODO Maybe add options at some point?
});
server.register(function (instance, options, next) {
    instance.get('/list', opts, function (req, reply) {
        return todoRepo.listTodos();
    });
    instance.post('/create', function (req, reply) {
        console.log(req);
        var headers = req.headers;
        var todo = req.body;
        var newTodo = {
            title: todo.title,
            description: todo.description || '',
            done: todo.done || false
        };
        return todoRepo.addTodos([newTodo]);
    });
    next();
}, { prefix: '/todo' });
server.register(function (instance, options, next) {
    instance.get('/list', opts, function (req, reply) {
        reply.send({ greet: 'user_list' });
    });
    next();
}, { prefix: '/user' });
// Run the server!
server.listen(8080, function (err) {
    if (err) {
        console.error(err);
        process.exit(1);
    }
    // If database is empty this can be uncommented
    // fs.readFile('./todos.json', 'utf-8', (err, data) => {
    //     let todos: Todo[] = JSON.parse(data.toString());
    //     console.log(todos);
    //     todoRepo.addTodos(todos);
    // });
});
