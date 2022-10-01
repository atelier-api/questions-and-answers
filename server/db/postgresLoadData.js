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
  `COPY questions(
    id,
    product_id,
    question_body,
    question_date,
    asker_name,
    asker_email,
    reported,
    question_helpfulness
  ) FROM '/Users/uchchas/Documents/hackreactor/sdc/questions-and-answers/server/db/data/questions.csv'
  DELIMITER ','
  CSV HEADER`
);

postgresDB.query(
  `COPY answers(
    id,
    question_id,
    answer_body,
    answer_date,
    answerer_name,
    answerer_email,
    answer_reported,
    answer_helpfulness
  ) FROM '/Users/uchchas/Documents/hackreactor/sdc/questions-and-answers/server/db/data/answers.csv'
  DELIMITER ','
  CSV HEADER`
);