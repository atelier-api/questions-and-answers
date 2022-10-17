const postgresDB = require('../db/postgres.js');

/* postgresDB.query(
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
); */

postgresDB.query(
  `COPY photos(
    id,
    answer_id,
    url
  ) FROM '/Users/uchchas/Documents/hackreactor/sdc/questions-and-answers/server/db/data/answers_photos.csv'
  DELIMITER ','
  CSV HEADER`
);