// components/LoginButtons.js
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import SelectComponent from "./SelectComponent";
import { StudentContext } from "../store/studentcontext";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

const LoginButtons = () => {
  const { studentsInfo, setStudentsInfo } = useContext(StudentContext);

  const fetchStudents = async () => {
    const response = await axios.get("/studentsinfo");
    setStudentsInfo(response.data);
    return response.data;
  };

  const { data, error, isLoading, isError } = useQuery({
    queryKey: ["data"],
    queryFn: fetchStudents,
  });

  // useEffect(() => {
  //   data && setStudentsInfo(data);
  // }, [data]);

  return (
    <div>
      <h1>Login</h1>
      <Button
        variant="contained"
        color="primary"
        component={Link}
        to="/teacher-screen"
      >
        Teacher
      </Button>
      <SelectComponent label="Select your Name" options={data?.studentInfo} />
      <Button
        variant="contained"
        color="primary"
        component={Link}
        to="/student-screen"
      >
        Student
      </Button>
    </div>
  );
};

export default LoginButtons;
