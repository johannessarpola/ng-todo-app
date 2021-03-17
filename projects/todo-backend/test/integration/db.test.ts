import {PostgreSQLAdapter} from '../../src/postgresql/postgresql.adapter';
import { TodoRepository } from '../../src/db';
import { Todo } from '../../src/models/todo';

const postgreSQLAdapter: PostgreSQLAdapter = (global as any).postgreSQLAdapter;
const todoRepo = new TodoRepository(postgreSQLAdapter)

describe("GenericContainer", () => {

  beforeAll(async () => {
    // docker/postgres/ -> make build
    console.log("beforeAll")

  });

  afterAll(async () => {
    console.log("afterAll")

  });
  

  test('add todo', async () => {
    const todo: Todo = {title: "Testing is fun", description: "Yeboi", done: true}
    const insert = await todoRepo.addTodos([todo]);
    const todos = await todoRepo.listTodos();

    console.log("paska")
    expect(insert.length).toEqual(1);
    expect(todos.length).toEqual(1);
  })
});

