"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("../../src/db");
const postgreSQLAdapter = global.postgreSQLAdapter;
const todoRepo = new db_1.TodoRepository(postgreSQLAdapter);
describe("GenericContainer", () => {
    beforeAll(async () => {
        // docker/postgres/ -> make build
        console.log("beforeAll");
    });
    afterAll(async () => {
        console.log("afterAll");
    });
    test('add todo', async () => {
        const todo = { title: "Testing is fun", description: "Yeboi", done: true };
        const insert = await todoRepo.addTodos([todo]);
        const todos = await todoRepo.listTodos();
        console.log("paska");
        //expect(insert.length).toEqual(1);
        //expect(todos.length).toEqual(1);
    });
});
//# sourceMappingURL=db.test.js.map