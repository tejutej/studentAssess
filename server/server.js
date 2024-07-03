const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const fs = require("fs");
const Papa = require("papaparse");
const multer = require("multer");
const csv = require("csv-parser");
const path = require("path");
const app = express();
const port = 5000;
const { savequestionbankdata } = require("./controller/savequestionbank");

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

app.post("/upload", upload.single("file"), (req, res) => {
  console.log(req.file);
  const file = req.file;
  const rowdata = req.body.rowinfo;

  if (!file) {
    return res.status(400).send("No file uploaded.");
  }

  console.log("Additional Parameter:", req.body.rowinfo);

  const results = [];
  const filePath = path.join(__dirname, "uploads", file.filename);
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      console.error("Error reading CSV file:", err);
      res.status(500).send("Error processing file.");
      return;
    }

    // Parse the CSV data
    const parsedData = Papa.parse(data, {
      header: true, // Consider the first row as headers
      dynamicTyping: true, // Convert numeric values to numbers
    });

    savequestionbankdata(
      parsedData.data,
      req.body.id,
      req.body.sclass,
      req.body.subject
    );

    // Store the parsed data in the database as needed
    // For example, you can save the data to a database
    // db.saveCsvData(results);

    res.send("File uploaded and processed successfully.");
  });
});

const studentsData = require("./route/studentdata");
const classnsubjects = require("./route/classnsubjects");

app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/student-assess?authSource=admin", {
  // useNewUrlParser: true,
  // useUnifiedTopology: true,
});

app.use("/studentsinfo", studentsData);
app.use("/classnsubjects", classnsubjects);

app.get("/message", (req, res) => {
  res.json({ message: "Hello from server!" });
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB");
});

// Define a simple schema and model for demonstration
const itemSchema = new mongoose.Schema({
  name: String,
});

const Item = mongoose.model("Item", itemSchema);

// Routes
app.get("/items", async (req, res) => {
  try {
    const items = await Item.find();
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.post("/items", async (req, res) => {
  const item = new Item({
    name: req.body.name,
  });

  try {
    const newItem = await item.save();
    res.status(201).json(newItem);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
