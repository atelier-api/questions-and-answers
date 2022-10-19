const models = require('../models/models.js');

exports.getQuestions = async (req, res) => {
  return promise = new Promise((resolve, reject) => {
    let productId = req.query.product_id;
    let page = req.query.page || 1;
    let count = req.query.count || 5;

    models.findQuestions(productId, page, count)
      .then(result => {
        resolve(res.status(200).send(result));
      })
      .catch(err => {
        reject(res.status(500).send('Error in findQuestions', err));
      });
  })
}

exports.getAnswers = (req, res) => {
  return promise = new Promise((resolve, reject) => {
    let questionId = req.params.question_id;
    let page = req.query.page || 1;
    let count = req.query.count || 5;
    let returnObj = {
      question: questionId,
      page: page,
      count: count,
      results: []
    }

    models.findAnswers(questionId, page, count)
      .then(result => {
        returnObj.results = result;
        resolve(res.send(returnObj).status(200));
      })
      .catch(err => {
        reject(console.log('Error in findAnswers', err));
      })
  })
}

exports.addQuestion = (req, res) => {
  return promise = new Promise((resolve, reject) => {
    let body = req.body.body;
    let name = req.body.name;
    let email = req.body.email;
    let product_id = req.body.product_id;

    models.createQuestion(body, name, email, product_id)
      .then(result => {
        resolve(res.status(201));
      })
      .catch(err => {
        reject(console.log('Error in addQuestion', err));
      })
  })
}

exports.addAnswer = (req, res) => {
  return promise = new Promise((resolve, reject) => {
    let question_id = req.query.question_id;
    let body = req.body.body;
    let name = req.body.name;
    let email = req.body.email;
    let photos = req.body.photos;

    models.createAnswer(question_id, body, name, email, photos)
      .then(result => {
        resolve(res.send(result).status(201));
      })
      .catch(err => {
        reject(console.log('Error in addAnswer', err));
      })
  })
}

exports.questionHelpful = (req, res) => {
  return promise = new Promise((resolve, reject) => {
    models.updateQuestionHelpful(req.params.question_id)
      .then(result => {
        resolve(res.status(204).send());
      })
      .catch(err => {
        reject(res.status(404).send('Error: Invalid question id'));
      })
  })
}

exports.questionReport = (req, res) => {
  return promise = new Promise((resolve, reject) => {
    models.updateQuestionReport(req.params.question_id)
      .then(result => {
        resolve(res.status(204).send());
      })
      .catch(err => {
        reject(res.status(404).send('Error: Invalid question id'));
      })
  })
}

exports.answerHelpful = (req, res) => {
  return promise = new Promise((resolve, reject) => {
    models.updateAnswerHelpful(req.params.answer_id)
      .then(result => {
        resolve(res.status(204).send());
      })
      .catch(err => {
        reject(res.status(404).send('Error: Invalid answer id'));
      })
  })
}

exports.answerReport = async (req, res) => {
  return promise = new Promise((resolve, reject) => {
    models.updateAnswerReport(req.params.answer_id)
      .then(result => {
        resolve(res.status(204).send());
      })
      .catch(err => {
        reject(res.status(404).send('Error: Invalid answer id'));
      })
  })
}

