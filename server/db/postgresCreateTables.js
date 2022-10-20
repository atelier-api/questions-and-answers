const postgresDB = require('../db/postgres.js');

// questions table
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

// answers table
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

// photos table
postgresDB.query(
  `CREATE TABLE IF NOT EXISTS photos (
    ID SERIAL PRIMARY KEY,
    answer_id INTEGER,
    url TEXT
  )`
);