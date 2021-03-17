"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fastify_1 = __importDefault(require("fastify"));
const pg_1 = require("pg");
const db_1 = require("./db");
const postgresql_adapter_1 = require("./postgresql/postgresql.adapter");
const pool = new pg_1.Pool({
    user: 'todo_admin',
    database: 'tododb',
    password: 'D6*dbiKSjC4cL^CfWH3#',
});
const server = fastify_1.default();
const todoRepo = new db_1.TodoRepository(new postgresql_adapter_1.PostgreSQLAdapter({ uri: 'localhost' })); // FIXME
const opts = {
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
server.register((instance, options, next) => {
    instance.get('/list', opts, (req, reply) => {
        return todoRepo.listTodos();
    });
    instance.post('/create', (req, reply) => {
        console.log(req);
        const headers = req.headers;
        const todo = req.body;
        const newTodo = {
            title: todo.title,
            description: todo.description || '',
            done: todo.done || false,
        };
        return todoRepo.addTodos([newTodo]);
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
//# sourceMappingURL=index.js.map