import { Pool, PoolClient } from 'pg';
import { Todo } from './models/todo';

async function _addTodo(todo: Todo, client: PoolClient): Promise<string> {
  // TODO Probably batch better (https://github.com/brianc/node-postgres/issues/957#issuecomment-295583050)
  console.log('inserting todo:');
  console.log(todo);
  await client.query('BEGIN');
  const queryText =
    'INSERT INTO todos(created, data) VALUES($1, $2) RETURNING id';
  const insertId: Promise<string> = client
    .query(queryText, [new Date(), todo])
    .then((res) => res.rows[0].id.toString());

  return insertId;
}

async function _listTodos(pool: Pool): Promise<Todo[]> {
  const client: PoolClient = await pool.connect();

  const ret: Promise<Todo[]> = client
    .query('SELECT * from todos')
    .then((res) => {
      const todos = res.rows.map((row) => {
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

async function _addTodos(todos: Todo[], pool: Pool): Promise<string[]> {
  let ids: Promise<string>[] = [];
  const client: PoolClient = await pool.connect();
  try {
    todos.forEach((todo, i) => {
      const id: Promise<string> = _addTodo(todo, client);
      ids.push(id);
    });
    await client.query('COMMIT');
  } catch (err) {
    console.error('failure!', err);
    throw err;
  } finally {
    client.release();
  }

  return Promise.all(ids);
}

export class TodoRepository {
  private pool: Pool;
  public constructor(pool: Pool) {
    this.pool = pool;
  }

  public addTodos(todos: Todo[]): Promise<string[]> {
    return _addTodos(todos, this.pool);
  }

  public listTodos(): Promise<Todo[]> {
    return _listTodos(this.pool);
  }
}
