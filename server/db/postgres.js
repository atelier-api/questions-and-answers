// psql postgres -> To start postgres
// \l -> List all database
// psql -d postgres -U me -> To login with user 'me'
// \c DB_NAME -> Select database
// \dt -> List all tables
// select * from TABLE_NAME;

require("dotenv").config();
const pgp = require('pg-promise')();

const postgresDB = pgp({
  host: process.env.POSTGRES_HOST,
  port: process.env.POSTGRES_PORT,
  database: process.env.POSTGRES_DB,
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASS
});

postgresDB.query(
  `CREATE TABLE IF NOT EXISTS questions (
    ID SERIAL PRIMARY KEY,
    product_id INTEGER,
    question_body VARCHAR(100),
    question_date TIMESTAMP,
    asker_name VARCHAR(25),
    question_helpfulness INTEGER,
    reported BOOLEAN
  )`
);

postgresDB.query(
  `CREATE TABLE IF NOT EXISTS answers (
    ID SERIAL PRIMARY KEY,
    question_id INTEGER,
    answer_body VARCHAR(100),
    answer_date TIMESTAMP,
    answerer_name VARCHAR(25),
    answer_helpfulness INTEGER
  )`
);

postgresDB.query(
  `CREATE TABLE IF NOT EXISTS photos (
    ID SERIAL PRIMARY KEY,
    answer_id INTEGER,
    url VARCHAR(100)
  )`
);

module.exports = postgresDB;