import React, { useState } from 'react';
import { Container, Grid, Typography } from '@mui/material';
import ClassSelector from './ClassSelector';
import ClassSubjectTable from './ClassSubjectTable';

const TeacherScreen = () => {
  const [selectedClass, setSelectedClass] = useState('');
  const classes = [
    "Class I",
    "Class II",
    "Class III",
    "Class IV",
    "Class V",
    "Class VI",
    "Class VII",
    "Class VIII",
    "Class IX",
    "Class X",
    "Class XI",
    "Class XII",
  ];

  const handleSelectClass = (cls) => {
    setSelectedClass(cls);
  };

  return (
    <Container>
      <Grid container spacing={3}>
      
        <Grid item xs={12}>
        <Typography variant="h7" gutterBottom>
        Class Selection
      </Typography>
          <ClassSelector options={classes} label={"select class"} onSelectedOption={handleSelectClass} />
        </Grid>
        <Grid item xs={12}>
        <ClassSubjectTable selectedClass={selectedClass} />
        </Grid>
      </Grid>
    </Container>
  );
};

export default TeacherScreen;
