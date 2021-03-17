"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = require("path");
const jest_testcontainers_1 = require("@trendyol/jest-testcontainers");
const node_pg_migrate_1 = __importDefault(require("node-pg-migrate"));
const postgresql_adapter_1 = require("../../src/postgresql/postgresql.adapter");
class PostgreSQLEnvironment extends jest_testcontainers_1.TestcontainersEnvironment {
    constructor() {
        super(...arguments);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        this.postgreSQLAdapter = undefined;
    }
    async setup() {
        await super.setup();
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const globals = this.global;
        const uri = `postgresql://${PostgreSQLEnvironment.POSTGRESQL_AUTH}@${globals.__TESTCONTAINERS_POSTGRE_IP__}:${globals.__TESTCONTAINERS_POSTGRE_PORT_5432__}/${PostgreSQLEnvironment.POSTGRESQL_DB}`;
        const postgreSQLConfig = { uri };
        const postgreSQLAdapter = new postgresql_adapter_1.PostgreSQLAdapter(postgreSQLConfig);
        await postgreSQLAdapter.connect();
        await node_pg_migrate_1.default({
            databaseUrl: uri,
            dir: PostgreSQLEnvironment.MIGRATION_DIR,
            migrationsTable: PostgreSQLEnvironment.MIGRATION_TABLE,
            direction: 'up',
            count: 999,
        });
        globals.postgreSQLAdapter = postgreSQLAdapter;
        this.postgreSQLAdapter = postgreSQLAdapter;
    }
    async teardown() {
        await super.teardown();
        this.postgreSQLAdapter && (await this.postgreSQLAdapter.close());
    }
}
PostgreSQLEnvironment.MIGRATION_DIR = path_1.join(__dirname, '../../migrations');
PostgreSQLEnvironment.MIGRATION_TABLE = 'pgmirations';
PostgreSQLEnvironment.POSTGRESQL_DB = 'todo-postgres-db';
PostgreSQLEnvironment.POSTGRESQL_AUTH = 'todo_admin:D6*dbiKSjC4cL^CfWH3#';
module.exports = PostgreSQLEnvironment;
//# sourceMappingURL=postgresql.environment.js.map