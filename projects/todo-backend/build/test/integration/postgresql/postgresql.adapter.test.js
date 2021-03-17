"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const postgreSQLAdapter = global.postgreSQLAdapter;
describe('PostgreSQLAdapter', () => {
    describe('.query()', () => {
        it('should query with parameters', async () => {
            var _a;
            // Arrange
            const query = 'SELECT ($1 + 5) as res';
            const params = [73];
            const expectedResult = 78;
            // Act
            const result = await postgreSQLAdapter.query(query, params);
            // Assert
            expect((_a = result.rows[0]) === null || _a === void 0 ? void 0 : _a.res).toBe(expectedResult);
        });
    });
});
//# sourceMappingURL=postgresql.adapter.test.js.map