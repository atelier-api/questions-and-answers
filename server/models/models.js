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

/*   return db.tx(async (t) => {
    let questionData;
    let answerData = {};
    let photoData = [];
    let resultObj = {
      product_id: productId,
      results: []
    };

    await t.query(questionQuery, [productId, count, (page - 1) * count])
      .then(result => {
        questionData = result;

        if(questionData) {
          t.batch([
            questionData.forEach(async (question) => {
              await t.query(answerQuery, [question.question_id])
              .then(result => {
                result.forEach(async (answer) => {
                  answerData[answer.id] = answer;
                  question.answers = answerData;
                })
              })
            })
          ])
        }
      })

    resultObj.results = questionData;
    return resultObj;
  }) */

  return db.task(async t => {
    let answerData = {

    };
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
              const answers = result.map(async answer => {

                // Query to get all photo for each answer
                await t.any(photoQuery, [answer.id])
                  .then(result => {
                    answer.photos = result;
                  })
                answerData[answer.id] = answer;
                question.answers = answerData;
              })
              await t.batch(answers);
            })
        })
        await t.batch(questions);

        resultObj.results = questionData;
        console.log('resultObj', resultObj);
      })
      return resultObj;
    //console.log('questionData', questionData);

/*     const questions = questionData.map(async question => {
      const answerData = await t.any(answerQuery, [question.question_id])
      console.log('answerData', answerData);

      const answers = answerData.map(async answer => {
        const photoData = await t.any(photoQuery, [answer.id]);
        console.log('photoData', photoData);
      })
      const photoDetails = await t.batch(answers);
      console.log('photoDetails', photoDetails);
    })

    const details = await t.batch(questions);
    return details; */
  })



  /* console.log('heloooooooo');
  let sendData;

  let count = req.query.count || 5;
  let page = req.query.page || 1;
  let queryStr = `SELECT
    id AS "question_id",
    question_body AS "question_body",
    question_date AS "question_date",
    asker_name,
    question_helpfulness AS "question_helpfulness",
    reported,
    (SELECT
      json_object_agg(
        answers.id, json_build_object(
          'id', id,
          'body', answer_body,
          'date', answer_date,
          'answerer_name', answerer_name,
          'helpfulness', answer_helpfulness,
          'photos',
            (SELECT
              COALESCE(
                json_agg(
                  json_build_object(
                    'id', id,
                    'url', url
                  )
                ),'[]'
              ) AS photos FROM photos WHERE answer_id=answers.id)
            )
      )
      AS "answers" FROM answers WHERE question_id = questions.id
    )
    FROM questions WHERE product_id = $1 AND reported = false
    LIMIT $2 OFFSET $3`;

    db.query(queryStr,[req.query.product_id, count, (page - 1) * count])
    .then((data) => {
      console.log('dataaaa', data);
      let sendData = {
        "product_id": req.query.product_id,
        "results": data.rows
      }
      //res.send(sendData);
      //console.log('sendData', sendData);

    })
    .catch(err => console.log(err));
    return sendData; */
}

exports.findAnswers = (questionId) => {
  return db.query(`SELECT * from answers where question_id=${questionId}`);
};

exports.addQuestion = (productId) => {
  return db.query(`SELECT * from questions where product_id=${productId}`);
};

exports.addAnswer = (productId) => {
  return db.query(`SELECT * from questions where product_id=${productId}`);
};

exports.questionHelpful = (productId) => {
  return db.query(`SELECT * from questions where product_id=${productId}`);
};

exports.questionReport = (productId) => {
  return db.query(`SELECT * from questions where product_id=${productId}`);
};

exports.answerHelpful = (productId) => {
  return db.query(`SELECT * from questions where product_id=${productId}`);
};

exports.answerReport = (productId) => {
  return db.query(`SELECT * from questions where product_id=${productId}`);
};