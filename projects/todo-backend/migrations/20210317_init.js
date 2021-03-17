exports.up = (pgm) => {
  pgm.createTable('users', {
    id: {
      type: 'uuid',
      default: 'uuid_generate_v4()',
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
