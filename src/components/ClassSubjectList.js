import React, { useState } from 'react';
import { Grid, Button, TextField } from '@mui/material';

const FileAttachmentGrid = () => {
  const [fileName, setFileName] = useState('');

  const handleFileChange = (event) => {
    if (event.target.files.length > 0) {
      setFileName(event.target.files[0].name);
    }
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={4}>
        <TextField label="Subject Name" variant="outlined" fullWidth />
      </Grid>
      <Grid item xs={4}>
        <Button variant="contained" component="label">
          Attach File
          <input type="file" hidden onChange={handleFileChange} />
        </Button>
      </Grid>
      <Grid item xs={4}>
        <TextField
          label="File Name"
          variant="outlined"
          fullWidth
          value={fileName}
          InputProps={{
            readOnly: true,
          }}
        />
      </Grid>
    </Grid>
  );
};

export default FileAttachmentGrid;
