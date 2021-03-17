"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TodoRepository = void 0;
async function _addTodo(todo, adapter) {
    // TODO Probably batch better (https://github.com/brianc/node-postgres/issues/957#issuecomment-295583050)
    console.log('inserting todo:');
    console.log(todo);
    await adapter.query('BEGIN');
    const queryText = 'INSERT INTO todos(created, data) VALUES($1, $2) RETURNING id';
    const insertId = adapter
        .query(queryText, [new Date(), todo])
        .then((res) => res.rows[0].id.toString());
    return insertId;
}
async function _listTodos(adapter) {
    await adapter.connect();
    const ret = adapter
        .query('SELECT * from todos')
        .then((res) => {
        const todos = res.rows.map((row) => {
            return row.data;
        });
        return todos;
    })
        .catch((e) => {
        console.error(e.stack);
        return [];
    });
    return ret;
}
async function _addTodos(todos, adapter) {
    let ids = [];
    await adapter.connect();
    try {
        todos.forEach((todo, i) => {
            const id = _addTodo(todo, adapter);
            ids.push(id);
        });
        await adapter.query('COMMIT');
    }
    catch (err) {
        console.error('failure!', err);
        throw err;
    }
    return Promise.all(ids);
}
class TodoRepository {
    constructor(adapter) {
        this.adapter = adapter;
    }
    addTodos(todos) {
        return _addTodos(todos, this.adapter);
    }
    listTodos() {
        return _listTodos(this.adapter);
    }
}
exports.TodoRepository = TodoRepository;
//# sourceMappingURL=db.js.map