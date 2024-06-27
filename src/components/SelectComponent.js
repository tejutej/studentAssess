import React, { useState } from 'react';
import { Select, MenuItem, FormControl, InputLabel } from '@mui/material';

const SelectComponent = props => {
  const [selectedValue, setSelectedValue] = useState('');

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };

  return (
    <FormControl fullWidth>
      <InputLabel id="demo-simple-select-label">{props.label}</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={selectedValue}
        label={props.label}
        onChange={handleChange}
      >
        <MenuItem value={10}>Option 1</MenuItem>
        <MenuItem value={20}>Option 2</MenuItem>
        <MenuItem value={30}>Option 3</MenuItem>
      </Select>
    </FormControl>
  );
};

export default SelectComponent;
