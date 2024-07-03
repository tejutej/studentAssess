const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const classnsubjects = new Schema({
  id: {
    type: String,
    required: true,
  },
  classsub: {
    type: String,
    required: true,
  },
  filename: {
    type: String,
    required: true,
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

classnsubjects.index(
  {
    id: 1,
  },
  {
    unique: true,
  }
);

module.exports = mongoose.model("classnsubjects", classnsubjects);
