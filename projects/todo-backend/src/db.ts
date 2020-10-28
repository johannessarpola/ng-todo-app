
import { Pool, PoolClient } from 'pg';
import { Todo } from './models/todo';

async function _addTodo(todo: Todo, client: PoolClient) {
    // TODO Probably batch better (https://github.com/brianc/node-postgres/issues/957#issuecomment-295583050)
    try {

        await client.query('BEGIN');
        const queryText = 'INSERT INTO todos(created, data) VALUES($1, $2) RETURNING id'
        const insertId: Promise<string> = client
            .query(queryText, [new Date(), todo])
            .then((res) => res.rows[0].toString());

        return insertId;
    } catch (err) {
        console.error('failure!', err)
        throw err
    }
}

async function _listTodos(pool: Pool): Promise<void|Todo[]> {
    const client: PoolClient = await pool.connect();

    const ret = client.query('SELECT * from todos')
        .then((res) => {
            const todos = res.rows.map((row) => {
                return row.data as Todo;
            });

            return todos;
        })
        .catch(e => { 
            console.error(e.stack);
        });
    return ret;
}

async function _addTodos(todos: Todo[], pool: Pool): Promise<string[]> {
    let ids: Promise<string>[] = [];
    const client: PoolClient = await pool.connect();
    try {
        todos.forEach((todo, i) => {
            const id: any = _addTodo(todo, client);
            if (id != null) { ids.push(id); }
        });
        await client.query('COMMIT')
    } catch (err) {
        console.error('failure!', err)
        throw err
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

    public listTodos(): Promise<void|Todo[]> {
        return _listTodos(this.pool);
    }
}