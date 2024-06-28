const studentdata = require('../model/studentdata')

// @desc      Get Templates
// @route     GET /templates
// @access    Public

exports.getStudentData = async (req, res, next) => {
  try {
    const studentInfo = await studentdata.find(
      { Id: req.query.Id },
      {
        rollno: 1,
        name: 1,
      })
      res.status(200).json({
        studentInfo,
      })
  } catch (e) {
    res.status(500).json({ message: e })
  }
}

// @desc      POST studentdata
// @route     POST /studentdata
// @access    Public
exports.createStudentData = async (req, res, next) => {
  try {
    if (
      req.body.reqBody.constructor === Object &&
      !req.body.reqBody.hasOwnProperty('rollno') &&
      !req.body.reqBody.hasOwnProperty('name')
    ) {
      res.status(400).json({ message: "name or roll number is null" });
      return 
    }
    else{

    if (req.body.reqBody.dataMode === 'Create') {
    
        const nTemplate = new studentdata({
          rollno: req.body.reqBody.rollno,
          name: req.body.reqBody.name,
          class: req.body.reqBody.class,
          subjectmarks: req.body.reqBody.subjectmarks,
          createdAt: Date.now,
        })
        const rTemplate = await nTemplate.save()
        res.status(201).json({
          rTemplate,
        })
      
    } else if (req.body.reqBody.templateMode === 'Edit') {
      /*app.put('/api/document/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const updateData = req.body;

    const updatedDocument = await MyModel.findByIdAndUpdate(id, updateData, { new: true, runValidators: true });

    if (!updatedDocument) {
      return res.status(404).send({ error: 'Document not found' });
    }

    res.send(updatedDocument);
  } catch (err) {
    res.status(500).send({ error: 'An error occurred while updating the document' });
  }
});*/
      let query = { rollno: req.body.reqBody.rollno }
      req.body.reqBody.Updated = Date.now()
      const sTemplate = await studentdata.findByIdAndUpdate(
        query,
        {
          name: req.body.reqBody.name,
          class: req.body.reqBody.class,
          subjectmarks: req.body.reqBody.subjectmarks,
          totalmarks: req.body.reqBody.totalmarks,
          updatedAt: Date.now(),
        },
        {
          new: true,
          runValidators: true,
          upsert: true,
          setDefaultsOnInsert: true,
        }
      )

      if (!sTemplate) {
        return res.status(404).json({ message: 'Template not found' })
      } else {
        res.status(201).json({
          sTemplate,
        })
        return
      }
    }
    }
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
}

// @desc      DELETE studentdata
// @route     DELETE /dy/template/id/
// @access    Public
exports.deleteStudentData = async (req, res, next) => {
  try {
    const temp = await studentdata.findByIdAndDelete({ rollno: req.query.rollno })
    if (temp != null) {
      res.status(201).json({ message: 'Template deleted' })
    } else {
      res.status(404).json({ message: 'Template not found' })
    }
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
}