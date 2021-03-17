import { Todo } from './models/todo';
import { PostgreSQLAdapter } from './postgresql/postgresql.adapter';

async function _addTodo(todo: Todo, adapter: PostgreSQLAdapter): Promise<string> {
  // TODO Probably batch better (https://github.com/brianc/node-postgres/issues/957#issuecomment-295583050)
  console.log('inserting todo:');
  console.log(todo);
  await adapter.query('BEGIN');
  const queryText =
    'INSERT INTO todos(created, data) VALUES($1, $2) RETURNING id';
  const insertId: Promise<string> = adapter
    .query(queryText, [new Date(), todo])
    .then((res: any) => res.rows[0].id.toString());

  return insertId;
}

async function _listTodos(adapter: PostgreSQLAdapter): Promise<Todo[]> {
  await adapter.connect();

  const ret: Promise<Todo[]> = adapter
    .query('SELECT * from todos')
    .then((res) => {
      const todos = res.rows.map((row: any) => {
        return row.data as Todo;
      });

      return todos;
    })
    .catch((e) => {
      console.error(e.stack);
      return [];
    });
  return ret;
}

async function _addTodos(todos: Todo[], adapter: PostgreSQLAdapter): Promise<string[]> {
  let ids: Promise<string>[] = [];
  await adapter.connect();
  try {
    todos.forEach((todo, i) => {
      const id: Promise<string> = _addTodo(todo, adapter);
      ids.push(id);
    });
    await adapter.query('COMMIT');
  } catch (err) {
    console.error('failure!', err);
    throw err;
  } 

  return Promise.all(ids);
}

export class TodoRepository {
  constructor(private readonly adapter: PostgreSQLAdapter) {}

  public addTodos(todos: Todo[]): Promise<string[]> {
    return _addTodos(todos, this.adapter);
  }

  public listTodos(): Promise<Todo[]> {
    return _listTodos(this.adapter);
  }
}
