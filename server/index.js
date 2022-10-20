require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.PORT;
const path = require("path");
const controllers = require('./controllers/controllers.js');

app.use(express.json())

app.get('/qa', (req, res) => {
  res.status(200).send('Hello from QnA server!');
});

// GET /qa/questions/:question_id/answers
// Returns answers for a given question
// This list does not include any reported answers
// Status: 200 OK
app.get('/qa/questions/:question_id/answers', (req, res) => {
  controllers.getAnswers(req, res);
});

// GET /qa/questions
// Retrieves a list of questions for a particular product
// This list does not include any reported questions
// Status: 200 OK
app.get('/qa/questions', (req, res) => {
  controllers.getQuestions(req, res);
});

// POST /qa/questions/:question_id/answers
// Adds an answer for the given question
// Status: 201 CREATED
app.post('/qa/questions/:question_id/answers', (req, res) => {
  controllers.addAnswer(req, res);
});


// POST /qa/questions
// Adds a question for the given product
// Status: 201 CREATED
app.post('/qa/questions', (req, res) => {
  controllers.addQuestion(req, res);
});

// PUT /qa/questions/:question_id/helpful
// Updates a question to show it was found helpful
// Status: 204 NO CONTENT
app.put('/qa/questions/:question_id/helpful', (req, res) => {
  controllers.questionHelpful(req, res);
});

// PUT /qa/questions/:question_id/report
// Updates a question to show it was reported
// Status: 204 NO CONTENT
app.put('/qa/questions/:question_id/report', (req, res) => {
  controllers.questionReport(req, res);
});

// PUT /qa/answers/:answer_id/helpful
// Updates an answer to show it was found helpful
// Status: 204 NO CONTENT
app.put('/qa/answers/:answer_id/helpful', (req, res) => {
  controllers.answerHelpful(req, res);
});

// PUT /qa/answers/:answer_id/report
// Updates an answer to show it has been reported
// Status: 204 NO CONTENT
app.put('/qa/answers/:answer_id/report', (req, res) => {
  controllers.answerReport(req, res);
});

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});

module.exports = app;