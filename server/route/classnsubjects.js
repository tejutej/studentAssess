const express = require("express");
const {
  getclassnsubject,
  createclassnsubject,
  deleteclassnsubject,
} = require("../controller/classnsubjects");
const router = express.Router();

router.route("/").get(getclassnsubject).post(createclassnsubject);
router.route("/:id").delete(deleteclassnsubject);
module.exports = router;
