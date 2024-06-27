// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginButtons from './components/LoginButtons';
import TeacherScreen from './components/TeacherScreen';
import StudentScreen from './components/StudentScreen';

const App = () => {

  return (
    <Router>
      <div className="App">

        <Routes>
        <Route path="/" element={ <LoginButtons/> } />
        <Route path="/teacher-screen" element={ <TeacherScreen /> } />
        <Route path="/student-screen" element={ <StudentScreen /> } />
        </Routes>
      </div>
    </Router>
  );
};

export default App;

