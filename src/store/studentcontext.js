import React, { createContext, useState, useEffect } from "react";
export const StudentContext = createContext();

const StudentContextProvider = ({ children }) => {
  const [studentsInfo, setStudentsInfo] = useState();

  return (
    <StudentContext.Provider
      value={{
        studentsInfo,
        setStudentsInfo,
      }}
    >
      {children}
    </StudentContext.Provider>
  );
};

export default StudentContextProvider;
