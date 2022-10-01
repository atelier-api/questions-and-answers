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
    id SERIAL PRIMARY KEY,
    product_id INTEGER,
    question_body TEXT,
    question_date VARCHAR(20),
    asker_name VARCHAR(50),
    asker_email VARCHAR(50),
    reported BOOLEAN,
    question_helpfulness INTEGER
  )`
)

postgresDB.query(
  `CREATE TABLE IF NOT EXISTS answers (
    id SERIAL PRIMARY KEY,
    question_id INTEGER,
    answer_body TEXT,
    answer_date VARCHAR(20),
    answerer_name VARCHAR(50),
    answerer_email VARCHAR(50),
    answer_reported BOOLEAN,
    answer_helpfulness INTEGER
  )`
)

postgresDB.query(
  `CREATE TABLE IF NOT EXISTS photos (
    ID SERIAL PRIMARY KEY,
    answer_id INTEGER,
    url VARCHAR(100)
  )`
);