CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";


CREATE TABLE todos (
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    created date NOT NULL,
    data jsonb NOT NULL
);

CREATE TABLE todo_users (
    id serial PRIMARY KEY,
    username varchar NOT NULL UNIQUE,
    password text NOT NULL
);