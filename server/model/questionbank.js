const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//create Schema for student information

const questionbank = new Schema({
  fileid: {
    type: String,
    required: true,
  },
  classsub: {
    type: String,
    required: true,
  },
  question: {
    type: String,
    required: true,
  },
  A: {
    type: String,
    required: false,
  },
  B: {
    type: String,
    required: false,
  },
  C: {
    type: String,
    required: false,
  },
  D: {
    type: String,
    required: false,
  },
  answer: {
    type: String,
    required: false,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  updatedAt: {
    type: Date,
    default: Date.now(),
  },
});


module.exports = mongoose.model("questionbank", questionbank);
