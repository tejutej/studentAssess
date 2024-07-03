import React, { useState } from "react";
import shortid from "shortid";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Button,
  Grid,
  Box,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  FormHelperText,
} from "@mui/material";
import { Delete, Add } from "@mui/icons-material";

const subjects = [
  "Mathematics",
  "Science",
  "Social",
  "Hindi",
  "English",
  "Sanskrit",
];

const ClassSubjectTable = props => {
  const [rows, setRows] = useState([]);
  const [newRow, setNewRow] = useState({
    id: "",
    subject: "",
    file: null,
  });
  const [errors, setErrors] = useState({ subject: "", file: "" });

  const validateForm = () => {
    let formIsValid = true;
    let errors = {};

    if (!newRow.subject) {
      formIsValid = false;
      errors.subject = "Subject is required";
    }
    if (!newRow.file) {
      formIsValid = false;
      errors.file = "File is required";
    }

    setErrors(errors);
    return formIsValid;
  };

  const handleAddRow = async () => {
    if (!validateForm()) return;

    const rowWithId = { ...newRow, id: shortid() };
    console.log([...rows])
    const data = [...rows, rowWithId]
    console.log("[...rows, rowWithId]", rowWithId)
    console.log("hhh", data[0].file.name)
    const formData = new FormData();
    formData.append('file', rowWithId.file);
    formData.append('id',rowWithId.id);
    formData.append('sclass', props.selectedClass);
    formData.append('subject', rowWithId.subject ); // Add additional parameter

    try {
      const response = await axios.post('/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('File uploaded successfully', response.data);
    } catch (error) {
      console.error('Error uploading file', error);
    }

    setRows([...rows, rowWithId]);
    setNewRow({ id: "", subject: "", file: null });
    setErrors({});
  };

  const handleDeleteRow = async (id) => {
    try {
      const response = await axios.delete(`/studentsinfo/${id}`);
      const deleteQuestBank = await axios.delete(`/studentsinfo/${id}`);
      setRows(rows.filter((row) => row.id !== id));
      return response.data.message;
    } catch (error) {
      console.log("Error deleting record");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewRow({ ...newRow, [name]: value });
  };

  const handleFileChange = (e) => {
    setNewRow({ ...newRow, file: e.target.files[0] });
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom>
        Subject and Question Bank
      </Typography>
      <Grid container spacing={2} mb={2}>
        <Grid item xs={12} sm={4}>
          <FormControl fullWidth error={!!errors.subject}>
            <InputLabel>Subject</InputLabel>
            <Select
              name="subject"
              value={newRow.subject}
              onChange={handleInputChange}
              label="Subject"
            >
              {subjects.map((subject) => (
                <MenuItem key={subject} value={subject}>
                  {subject}
                </MenuItem>
              ))}
            </Select>
            {errors.subject && (
              <FormHelperText>{errors.subject}</FormHelperText>
            )}
          </FormControl>
        </Grid>
        <Grid item xs={10} sm={4}>
          <Button
            variant="contained"
            component="label"
            fullWidth
            error={!!errors.file}
          >
            Upload .csv File
            <input
              type="file"
              accept=".csv"
              hidden
              onChange={handleFileChange}
            />
          </Button>
          {errors.file && <Typography color="error">{errors.file}</Typography>}
          {newRow.file && <Typography>{newRow.file.name}</Typography>}
        </Grid>
        <Grid item xs={12} sm={3}>
          <Button
            variant="contained"
            color="primary"
            startIcon={<Add />}
            onClick={handleAddRow}
          >
            Add
          </Button>
        </Grid>
      </Grid>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Subject</TableCell>
              <TableCell>Attach File</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.id}</TableCell>
                <TableCell>{row.subject}</TableCell>
                <TableCell>
                  {row.file ? row.file.name : "No file attached"}
                </TableCell>
                <TableCell>
                  <IconButton onClick={() => handleDeleteRow(row.id)}>
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default ClassSubjectTable;
