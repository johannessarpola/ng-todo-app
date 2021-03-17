import { Todo } from './models/todo';
import { PostgreSQLAdapter } from './postgresql/postgresql.adapter';
export declare class TodoRepository {
    private readonly adapter;
    constructor(adapter: PostgreSQLAdapter);
    addTodos(todos: Todo[]): Promise<string[]>;
    listTodos(): Promise<Todo[]>;
}
