import React, { useState } from 'react';
import { Select, MenuItem, FormControl, InputLabel } from '@mui/material';

const SelectComponent = props => {
  const [selectedValue, setSelectedValue] = useState('');

  return (
    <FormControl fullWidth>
      <InputLabel id="demo-simple-select-label">{props.label}</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={selectedValue}
        label={props.label}
        onChange={event => { 
          setSelectedValue(event.target.value)}}
      >
        {props.options?.map((option, index) =>  ( 
        <MenuItem key={index} value={option.rollno}>{option.name}</MenuItem>
         ))}
      </Select>
    </FormControl>
  );
};

export default SelectComponent;
