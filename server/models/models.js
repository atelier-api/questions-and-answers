// batch: http://vitaly-t.github.io/spex/global.html#batch

const db = require('../db/postgres.js');

exports.findQuestions = (productId, page, count) => {
  let questionQuery = `SELECT
    id AS "question_id",
    question_body AS "question_body",
    question_date AS "question_date",
    asker_name,
    question_helpfulness AS "question_helpfulness",
    reported
    FROM questions
    WHERE product_id=$1 AND reported=false
    LIMIT $2 OFFSET $3`;

  let answerQuery = `SELECT
    id AS id,
    answer_body AS answer_body,
    answer_date AS answer_date,
    answerer_name AS answerer_name,
    answer_helpfulness AS answer_helpfulness
    FROM answers
    WHERE question_id=$1`;

  let photoQuery = `SELECT
    id AS id,
    url AS url
    FROM photos
    WHERE answer_id=$1`;

  return db.task(async t => {
    let answerData = {};
    let resultObj = {
      product_id: productId,
      results: []
    };

    // Query to get all questions
    await t.any(questionQuery, [productId, count, (page - 1) * count])
      .then(async questionData => {
        const questions = questionData.map(async question => {

          // Query to get all answers for each question
          await t.any(answerQuery, [question.question_id])
          .then(async result => {
            let answerData = {};
            const answers = result.map(async answer => {
                answerData[answer.id] = answer;
                question.answers = answerData;

                // Query to get all photo for each answer
                await t.any(photoQuery, [answer.id])
                  .then(result => {
                    answer.photos = result;
                  })
              })
              await t.batch(answers);
            })
        })
        await t.batch(questions);

        resultObj.results = questionData;
      })
      return resultObj;
  })
}

exports.findAnswers = (questionId, page, count) => {
  let queryStr = `SELECT
    id AS "answer_id",
    answer_body AS "body",
    answer_date AS "date",
    answerer_name AS "answerer_name",
    answer_helpfulness AS "helpfulness",
    (
      SELECT COALESCE (
        json_agg(
          json_build_object(
            'id', id,
            'url', url
          )
        ), '[]'
      ) FROM photos WHERE answer_id=answers.id
    ) AS "photos"
    FROM answers WHERE question_id=$1 AND answer_reported=false
    LIMIT $2 OFFSET $3`;

  return db.query(queryStr, [questionId, count, (page - 1) * count]);
};

exports.addQuestion = (body, name, email, product_id) => {
  let queryStr = `
    INSERT INTO questions
    (
      product_id,
      question_body,
      question_date,
      asker_name,
      asker_email,
      reported,
      question_helpfulness
    )
    VALUES ($1, $2, now(), $3, $4, false, 0)`;

  return db.query(queryStr, [product_id, body, name, email]);
};

exports.addAnswer = (productId) => {
  return db.query(`SELECT * from questions where product_id=${productId}`);
};

exports.updateQuestionHelpful = (questionId) => {
  let queryStr = `
    UPDATE questions
    SET question_helpfulness = question_helpfulness + 1
    WHERE id = $1`;

  return db.query(queryStr, [questionId]);
};

exports.updateQuestionReport = (questionId) => {
  let queryStr = `
    UPDATE questions
    SET reported = TRUE
    WHERE id = $1`;

  const hello = db.query(queryStr, [questionId]);
  return hello;
};

exports.updateAnswerHelpful = (answerId) => {
  let queryStr = `
    UPDATE answers
    SET answer_helpfulness = answer_helpfulness + 1
    WHERE id = $1`;

  return db.query(queryStr, [answerId]);
};

exports.updateAnswerReport = (answerId) => {
  let queryStr = `
    UPDATE answers
    SET answer_reported = TRUE
    WHERE id = $1`;

  return db.query(queryStr, [answerId]);
};