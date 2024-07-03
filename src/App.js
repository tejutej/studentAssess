// src/App.js
import React from 'react';
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginButtons from './components/LoginButtons';
import TeacherScreen from './components/TeacherScreen';
import StudentScreen from './components/StudentScreen';
import { createTheme, ThemeProvider } from '@mui/material/styles'
import Dashboard from './components/Dashboard';

const theme = createTheme({
  typography: {
    fontFamily: `'Inter', 'sans-serif'`,
  },
})

const App = () => {

  return (
    <ThemeProvider theme={theme}>
    <Router>
      <div className="App">

        <Routes>
        <Route path="/" element={ <LoginButtons/> } />
        <Route path="/teacher-screen" element={ <Dashboard /> } />
        <Route path="/student-screen" element={ <StudentScreen /> } />
        </Routes>
      </div>
    </Router>
    </ThemeProvider>
  );
};

export default App;