const db = require('../db/postgres.js');

exports.findQuestions = (productId) => {
  return db.query(`SELECT * from questions where product_id=${productId}`);
};

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

exports.chain = (productId) => {
  return db.tx('my-transaction', async (t) => {
    let questionData;
    let answerData = [];
    let resultObj = {};

    await t.query(`SELECT * from questions where product_id=${productId}`)
      .then(result => {
        questionData = result;

        if(questionData) {
          t.batch([
            questionData.forEach(async (question) => {
              await t.query(`SELECT * from answers where question_id=${question.id}`)
                .then(result => {
                  answerData.push(result);

                })
            })
          ])
        }
      })

      resultObj.questionData = questionData;
      resultObj.answerData = answerData;
      return resultObj;
  })

}