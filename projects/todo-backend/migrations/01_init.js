const { PgLiteral } = require('node-pg-migrate');

exports.up = (pgm) => {
  pgm.createTable('todos', {
    id: {
      type: 'uuid',
      default: new PgLiteral('uuid_generate_v4()'),
      notNull: true,
      primaryKey: true
    },
    created: { type: 'date', notNull: true },
    data: { type: 'jsonb', notNull: true },
  })
  pgm.createTable('todo_users', {
    id: {
      type: 'serial',
      primaryKey: true
    },
    username: {
      type: 'varchar(255)',
      notNull: true,
    },
    password: {
      type: 'text',
      notNull: true,
    },
  })
}
