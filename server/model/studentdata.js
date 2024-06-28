const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//create Schema for student information

const studentInfo = new Schema({
    rollno: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    class: { 
        type: String,
        required: true,
    },
    subjectmarks: {
        type: Object,
        required: false,
    },
    totalmarks: { 
        type: Number, 
        required: false, 
    },      
    createdAt: { 
        type: Date, 
        default: Date.now, 
    },
    updatedAt: {
        type: Date, 
        default: Date.now, 
    }
})

studentInfo.index(
    {
        name: 1,
        rollno: 1,
    },
    {
        unique: true,
    }
)

module.exports = mongoose.model("studentdata", studentInfo)