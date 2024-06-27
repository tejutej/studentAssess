// components/LoginButtons.js
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';
import SelectComponent from './SelectComponent';

const LoginButtons = () => {
  return (
    <div>
      <h1>Login</h1>
      <Button variant="contained" color="primary" component={Link} to="/teacher-screen">
        Teacher
      </Button>
      <SelectComponent label = "Select your Name"/>
      <SelectComponent label = "Select your Class"/>
      <Button variant="contained" color="primary" component={Link} to="/student-screen">
        Student
      </Button>
    </div>
  );
};

export default LoginButtons;