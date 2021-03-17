import { QueryResult } from 'pg';
import { PostgreSQLConfig } from './postgresql.config';
export declare class PostgreSQLAdapter {
    private readonly config;
    private pool;
    constructor(config: PostgreSQLConfig);
    query<T>(query: string, params?: unknown[]): Promise<QueryResult<T>>;
    multipleQueryInTransaction(queries: Query[]): Promise<void>;
    connect(): Promise<void>;
    close(): Promise<void>;
}
export declare type Query = {
    sql: string;
    params: any[];
};
