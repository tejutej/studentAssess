const classnsubjects = require("../model/classnsubjects");

// @desc      Get Templates
// @route     GET /templates
// @access    Public

exports.getclassnsubject = async (req, res, next) => {
  try {
    const query = {};

    const classnsub = await classnsubjects.find(query, {
      id: 1,
      classsub: 1,
      filename: 1,
      _id: 0,
    });

    res.status(200).json({
      classnsub,
    });
  } catch (e) {
    res.status(500).json({ message: e });
  }
};

exports.createclassnsubject = async (req, res, next) => {
  console.log(req.file)
  try {
    if (!req.body.data.filename) {
      res.status(400).json({ message: "filename is null" });
      return;
    } else {
      const classnsub = new classnsubjects({
        id: req.body.data.id,
        classsub: req.body.data.classsub,
        filename: req.body.data.filename,
      });
      const storeData = await classnsub.save();
      res.status(201).json({
        storeData,
      });
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.deleteclassnsubject = async (req, res, next) => {
  try {
    const delfile = await classnsubjects.findOneAndDelete({
      id: req.params.id,
    });
    if (delfile != null) {
      res.status(201).json({ message: "file deleted" });
    } else {
      res.status(404).json({ message: "file not found" });
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
