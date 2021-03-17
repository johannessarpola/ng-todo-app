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
  

  test('add todo', () => {
    const todo: Todo = {title: "Testing is fun", description: "Yeboi", done: true}
    return todoRepo.addTodos([todo]).then(data => {
      expect(data.length).toEqual(1);
    });
  })
});

