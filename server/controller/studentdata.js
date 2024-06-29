const studentdata = require("../model/studentdata");

// @desc      Get Templates
// @route     GET /templates
// @access    Public

exports.getStudentData = async (req, res, next) => {
  try {
    const query = { }; 
    const options = {
      projection: {
        id: 1,
        name: 1,
        class: 1,
        subjects: 1,
        _id: 0,
      }
    };

    const studentInfo = await studentdata.find(query, {
      id: 1,
      name: 1,
      class: 1,
      subjects: 1,
      _id: 0,
    }, {limit: 10});
    
    res.status(200).json({
      studentInfo,
    });
  } catch (e) {
    res.status(500).json({ message: e });
  }
};

// @desc      POST studentdata
// @route     POST /studentdata
// @access    Public
exports.createStudentData = async (req, res, next) => {
  try {
    if (!req.body.data.id && !req.body.data.name) {
      res.status(400).json({ message: "name or roll number is null" });
      return;
    } else {
      
      if (req.body.mode === "create") {

        const newStudentData = new studentdata({
          id: req.body.data.id,
          name: req.body.data.name,
          class: req.body.data.class,
          subjects: Object.assign(
            {},
            { subject1: req.body.data.subject1, subject2: req.body.data.subject2 }
          ),
          createdAt: Date.now(),
        });
        const storeStudentData = await newStudentData.save();
        res.status(201).json({
          storeStudentData,
        });
      } else if (req.body.mode === "edit") {
        let query =  {id: req.body.data.id};
        const editStudentData = await studentdata.findOneAndUpdate(
          query,
          {
            name: req.body.data.name,
            class: req.body.data.class,
            subjects: Object.assign(
              {},
              { subject1: req.body.data.subject1, subject2: req.body.data.subject2 }
            ),
            updatedAt: Date.now(),
          },
          {
            new: true,
            runValidators: true,
            upsert: true,
            setDefaultsOnInsert: true,
          }
        );
        if (!editStudentData) {
          return res.status(404).json({ message: "Student data not found" });
        } else {
          res.status(201).json({
            editStudentData,
          });
          return;
        }
      }
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// @desc      DELETE studentdata
// @route     DELETE /dy/template/id/
// @access    Public
exports.deleteStudentData = async (req, res, next) => {
  try {
    const temp = await studentdata.findOneAndDelete({
      id: req.params.id,
    });
    if (temp != null) {
      res.status(201).json({ message: "Template deleted" });
    } else {
      res.status(404).json({ message: "Template not found" });
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
