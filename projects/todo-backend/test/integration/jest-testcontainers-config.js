module.exports = {
    postgre: {
      image: 'todo-postgres-db',
      tag: 'latest',
      ports: [5432],
      env: {
        POSTGRES_USER: 'integration_user',
        POSTGRES_PASSWORD: 'integration_pass',
        POSTGRES_DB: 'test_tododb',
      },
      wait: {
        type: 'text',
        text: 'server started',
      },
    },
  };