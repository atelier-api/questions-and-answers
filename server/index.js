require("dotenv").config();

const express = require("express");
const app = express();
const port = process.env.PORT;
const path = require("path");

app.get('/qa', (req, res) => {
  res.status(200).send('Hello World!');
});

// GET /qa/questions
// Retrieves a list of questions for a particular product
// This list does not include any reported questions
// Status: 200 OK

// GET /qa/questions/:question_id/answers
// Returns answers for a given question
// This list does not include any reported answers
// Status: 200 OK

// POST /qa/questions
// Adds a question for the given product
// Status: 201 CREATED

// POST /qa/questions/:question_id/answers
// Adds an answer for the given question
// Status: 201 CREATED

// PUT /qa/questions/:question_id/helpful
// Updates a question to show it was found helpful
// Status: 204

// PUT /qa/questions/:question_id/report
// Updates a question to show it was reported
// Status: 204 NO CONTENT

// PUT /qa/answers/:answer_id/helpful
// Updates an answer to show it was found helpful
// Status: 204 NO CONTENT

// PUT /qa/answers/:answer_id/report
// Updates an answer to show it has been reported
// Status: 204 NO CONTENT

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});

module.exports = app;