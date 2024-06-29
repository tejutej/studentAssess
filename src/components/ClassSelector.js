import React, { useState } from 'react';

const ClassSelector = ({ classes, setClasses }) => {
  const [newClass, setNewClass] = useState('');

  const addClass = () => {
    setClasses([...classes, newClass]);
    setNewClass('');
  };

  return (
    <div>
      <select>
        {classes.map((cls, index) => (
          <option key={index} value={cls}>{cls}</option>
        ))}
      </select>
      <input 
        type="text" 
        value={newClass} 
        onChange={(e) => setNewClass(e.target.value)} 
        placeholder="Add new class"
      />
      <button onClick={addClass}>Add Class</button>
    </div>
  );
};

export default ClassSelector;
