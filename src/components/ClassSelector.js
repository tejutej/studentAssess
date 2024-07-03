import React, {useContext} from 'react';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import {StudentContext} from "../store/studentcontext"

const ClassSelector = ({ options, label,  onSelectedOption }) => {
  return (
    <FormControl fullWidth>
      <InputLabel id="class-select-label">{label}</InputLabel>
      <Select
        labelId="class-select-label"
        id="class-select"
        onChange={(e) => onSelectedOption(e.target.value)}
        label="Select Class"
        required="true"
      >
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
        {options.map((cls, index) => (
          <MenuItem key={index} value={cls}>
            {cls}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default ClassSelector;
