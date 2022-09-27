// mongosh
// use DATABASE_NAME
// show databases;
// use DATABASE_NAME
// use COLLECTION_NAME
// db.COLLECTION_NAME.find()

require("dotenv").config();
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/mongodb');

const answerSchema = mongoose.Schema({
  answer_id: {type: Number, require: true},
  answer_body: {type: String, require: true} ,
  answer_date: {type: Date, require: true},
  answerer_name: {type: String, require: true},
  helpfulness: {type: Number, require: true},
  photos: [{
    photo_id: {type: Number, require: true},
    url: {type: String, require: true}
  }]
})

const questionSchema = mongoose.Schema({
  question_id: {type: Number, require: true},
  question_body: {type: String, require: true},
  question_date: {type: Date, require: true},
  asker_name: {type: String, require: true},
  question_helpfulness: {type: Number, require: true},
  reported: {type: Boolean, require: true},
  answers: [answerSchema]
})

const productSchema = mongoose.Schema({
  productId: {type: Number, require: true},
  questions: [questionSchema]
})

const productQA = mongoose.model('productQA', productSchema);
const questions = mongoose.model('questions', questionSchema);
const answers = mongoose.model('answers', answerSchema);

exports.productQA = productQA;
exports.questions = questions;
exports.answers = answers;