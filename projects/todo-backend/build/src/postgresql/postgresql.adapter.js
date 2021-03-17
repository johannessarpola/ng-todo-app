"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostgreSQLAdapter = void 0;
const pg_1 = require("pg");
class PostgreSQLAdapter {
    constructor(config) {
        this.config = config;
    }
    async query(query, params = []) {
        return this.pool.query(query, params);
    }
    async multipleQueryInTransaction(queries) {
        const client = await this.pool.connect();
        try {
            await client.query('BEGIN');
            for (const query of queries) {
                await client.query(query.sql, query.params);
            }
            await client.query('COMMIT');
        }
        catch (err) {
            await client.query('ROLLBACK');
            throw err;
        }
        finally {
            client.release();
        }
    }
    async connect() {
        const pool = new pg_1.Pool({
            connectionString: this.config.uri,
        });
        try {
            await pool.query('SELECT NOW();');
        }
        catch (err) {
            throw new Error(`PostgreSQL could not execute dummy query. Error: ${err.message}`);
        }
        this.pool = pool;
    }
    async close() {
        await this.pool.end();
    }
}
exports.PostgreSQLAdapter = PostgreSQLAdapter;
//# sourceMappingURL=postgresql.adapter.js.map