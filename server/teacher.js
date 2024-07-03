const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const multer = require('multer');
const jwt = require('jsonwebtoken');

const app = express();
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/teacherExamApp', { useNewUrlParser: true, useUnifiedTopology: true });

const teacherSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
});

const classSchema = new mongoose.Schema({
  teacher_id: mongoose.Schema.Types.ObjectId,
  class_name: String,
});

const subjectSchema = new mongoose.Schema({
  class_id: mongoose.Schema.Types.ObjectId,
  subject_name: String,
});

const studentSchema = new mongoose.Schema({
  class_id: mongoose.Schema.Types.ObjectId,
  student_name: String,
  student_email: String,
});

const questionSchema = new mongoose.Schema({
  subject_id: mongoose.Schema.Types.ObjectId,
  question_text: String,
  option_1: String,
  option_2: String,
  option_3: String,
  option_4: String,
  correct_option: String,
});

const Teacher = mongoose.model('Teacher', teacherSchema);
const Class = mongoose.model('Class', classSchema);
const Subject = mongoose.model('Subject', subjectSchema);
const Student = mongoose.model('Student', studentSchema);
const Question = mongoose.model('Question', questionSchema);

// Authentication routes
app.post('/register', async (req, res) => {
  const { name, email, password } = req.body;
  const teacher = new Teacher({ name, email, password });
  await teacher.save();
  res.send({ message: 'Teacher registered successfully' });
});

app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const teacher = await Teacher.findOne({ email, password });
  if (teacher) {
    const token = jwt.sign({ id: teacher._id }, 'secretKey');
    res.send({ token });
  } else {
    res.status(401).send({ message: 'Invalid credentials' });
  }
});

// Middleware to authenticate and set req.teacher
const auth = (req, res, next) => {
  const token = req.headers['authorization'];
  if (token) {
    jwt.verify(token, 'secretKey', (err, decoded) => {
      if (err) {
        res.status(401).send({ message: 'Invalid token' });
      } else {
        req.teacher = decoded;
        next();
      }
    });
  } else {
    res.status(401).send({ message: 'No token provided' });
  }
};

// Class, Subject, and Student routes
app.post('/classes', auth, async (req, res) => {
  const { class_name } = req.body;
  const newClass = new Class({ teacher_id: req.teacher.id, class_name });
  await newClass.save();
  res.send(newClass);
});

app.get('/classes', auth, async (req, res) => {
  const classes = await Class.find({ teacher_id: req.teacher.id });
  res.send(classes);
});

app.post('/subjects', auth, async (req, res) => {
  const { class_id, subject_name } = req.body;
  const newSubject = new Subject({ class_id, subject_name });
  await newSubject.save();
  res.send(newSubject);
});

app.post('/students', auth, async (req, res) => {
  const { class_id, student_name, student_email } = req.body;
  const newStudent = new Student({ class_id, student_name, student_email });
  await newStudent.save();
  res.send(newStudent);
});

// Upload Question Bank
const upload = multer({ dest: 'uploads/' });

app.post('/upload-questions', auth, upload.single('file'), async (req, res) => {
  const { class_id, subject_id } = req.body;
  const file = req.file;

  // Parse the CSV file and save questions to the database
  const csv = require('csv-parser');
  const fs = require('fs');
  const results = [];

  fs.createReadStream(file.path)
    .pipe(csv())
    .on('data', (data) => results.push(data))
    .on('end', async () => {
      for (const row of results) {
        const { question_text, option_1, option_2, option_3, option_4, correct_option } = row;
        const newQuestion = new Question({ subject_id, question_text, option_1, option_2, option_3, option_4, correct_option });
        await newQuestion.save();
      }
      res.send({ message: 'Questions uploaded successfully' });
    });
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
