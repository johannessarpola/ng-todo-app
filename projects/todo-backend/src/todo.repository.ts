import { Todo } from './models/todo';
import { PostgreSQLAdapter, Query } from './postgresql/postgresql.adapter';

async function _addTodo(todo: Todo, adapter: PostgreSQLAdapter): Promise<void> {
  // TODO Use multipleQueryInTransaction
  const queryText =
    'INSERT INTO todos(created, data) VALUES($1, $2) RETURNING id';
  return adapter.multipleQueryInTransaction([{ sql: queryText, params: [new Date(), todo] }])

}

async function _listTodos(adapter: PostgreSQLAdapter): Promise<Todo[]> {
//  await adapter.connect();
  const sql = 'SELECT * FROM todos';

  const ret: Promise<Todo[]> = adapter
    .querySelect( { sql: sql, params: [] })
    .then((res) => {
      console.log(res.rows);
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


function todoInsertQuery(todo: Todo): Query {
  const queryText = 'INSERT INTO todos(created, data) VALUES($1, $2) RETURNING id';
  const params = [new Date(), todo];
  return { sql: queryText, params: params }
  
}
async function _addTodos(todos: Todo[], adapter: PostgreSQLAdapter): Promise<void> {
  const queries = todos.map(todo => todoInsertQuery(todo));
  return adapter.multipleQueryInTransaction(queries);
}



export class TodoRepository {
  constructor(private readonly adapter: PostgreSQLAdapter) {}

  public addTodos(todos: Todo[]): Promise<void> {
    return _addTodos(todos, this.adapter);
  }

  public listTodos(): Promise<Todo[]> {
    return _listTodos(this.adapter);
  }

}
