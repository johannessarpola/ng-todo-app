import { PostgreSQLAdapter } from '../../src/postgresql/postgresql.adapter';
import { TodoRepository } from '../../src/todo.repository';
import { Todo } from '../../src/models/todo';

const postgreSQLAdapter: PostgreSQLAdapter = (global as any).postgreSQLAdapter;
const todoRepo = new TodoRepository(postgreSQLAdapter)

describe("GenericContainer", () => {

  beforeAll(async () => {

  });

  afterAll(async () => {

  });


  test('add and list todos', async () => {
    const todo: Todo = { title: "Testing is fun", description: "Yeboi", done: true }
    await todoRepo.addTodos([todo]);

    return todoRepo.listTodos().then(list => {
      expect(list.map((e) => e.title)[0] == todo.title)
    })
  })

  test('add multiple todos', async () => {
    const todo1: Todo = { title: "Testing is fun", description: "Yeboi", done: true }
    const todo2: Todo = { title: "Testing is fun 2", description: "Yeboi2", done: true }
    const todo3: Todo = { title: "Testing is fun 3", description: "Yeboi3", done: true }

    const todos =[todo1, todo2, todo3];
    const todoTitles  = todos.map( todo => todo.title );

    await todoRepo.addTodos(todos);

    return todoRepo.listTodos().then(list => {
      const titles = list.map( todo => todo.title )
      todoTitles.forEach( t => {
        expect(titles).toContain(t);
      })
    })
  })
});

