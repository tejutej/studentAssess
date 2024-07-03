import React from 'react';
import { Button, Input, Typography } from '@mui/material';
import Papa from 'papaparse';

const CsvUploader = ({ onUploadCsv, onFileNameChange }) => {
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      Papa.parse(file, {
        header: true,
        complete: (results) => {
          onUploadCsv(results.data);
        },
      });
      onFileNameChange(file.name);
    }
  };

  return (
    <div>
      <Input
        accept=".csv"
        id="csv-uploader"
        type="file"
        style={{ display: 'none' }}
        onChange={handleFileChange}
      />
      <label htmlFor="csv-uploader">
        <Button variant="contained" component="span" color="secondary">
          Upload CSV
        </Button>
      </label>
    </div>
  );
};

export default CsvUploader;
