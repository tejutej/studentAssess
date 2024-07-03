import React, { useState } from 'react';
import { Button, TextField } from '@mui/material';

const SubjectAdder = ({ onAddSubject }) => {
  const [subject, setSubject] = useState('');

  const handleAdd = () => {
    if (subject) {
      onAddSubject(subject);
      setSubject('');
    }
  };

  return (
    <div>
      <TextField
        fullWidth
        label="Add Subject"
        value={subject}
        onChange={(e) => setSubject(e.target.value)}
        variant="outlined"
        margin="normal"
      />
      <Button onClick={handleAdd} variant="contained" color="primary">
        Add Subject
      </Button>
    </div>
  );
};

export default SubjectAdder;
