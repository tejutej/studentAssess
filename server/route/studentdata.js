const express = require('express')
const {
  getStudentData,
  createStudentData,
  deleteStudentData,
} = require('../controller/studentdata')
const router = express.Router()

router
  .route('/')
  .get(getStudentData)
  .post(createStudentData)
  .delete(deleteStudentData)

module.exports = router