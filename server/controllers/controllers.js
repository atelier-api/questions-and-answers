const models = require('../models/models.js');

exports.getQuestions = async (req, res) => {
  return promise = new Promise((resolve, reject) => {
    let questionData;
    let answerData;

    models.chain(71699)
      .then(result => {
        resolve(res.send(result).status(200));
      })
      .catch(err => {
        reject(console.log('Error in chain', err));
      })
  })
}

exports.getAnswers = (req, res) => {
  return promise = new Promise((resolve, reject) => {
    let questionId = req.url.split('/')[3];

    models.findAnswers(questionId)
      .then(result => {
        resolve(res.send(result).status(200));
      })
      .catch(err => {
        reject(console.log('Error in findAnswers', err));
      })
  })
}

exports.addQuestion = (req, res) => {
  return promise = new Promise((resolve, reject) => {
    models.createQuestion(71699)
      .then(result => {
        resolve(res.send(result).status(201));
      })
      .catch(err => {
        reject(console.log('Error in addQuestion', err));
      })
  })
}

exports.addAnswer = (req, res) => {
  return promise = new Promise((resolve, reject) => {
    models.createAnswer(71699)
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
    models.updateQuestionHelpful(71699)
      .then(result => {
        resolve(res.send(result).status(204));
      })
      .catch(err => {
        reject(console.log('Error in questionHelpful', err));
      })
  })
}

exports.questionReport = (req, res) => {
  return promise = new Promise((resolve, reject) => {
    models.updateQuestionReport(71699)
      .then(result => {
        resolve(res.send(result).status(204));
      })
      .catch(err => {
        reject(console.log('Error in questionReport', err));
      })
  })
}

exports.answerHelpful = (req, res) => {
  return promise = new Promise((resolve, reject) => {
    models.updateAnswerHelpful(71699)
      .then(result => {
        resolve(res.send(result).status(204));
      })
      .catch(err => {
        reject(console.log('Error in answerHelpful', err));
      })
  })
}

exports.answerReport = (req, res) => {
  return promise = new Promise((resolve, reject) => {
    models.updateAnswerReport(71699)
      .then(result => {
        resolve(res.send(result).status(204));
      })
      .catch(err => {
        reject(console.log('Error in answerReport', err));
      })
  })
}