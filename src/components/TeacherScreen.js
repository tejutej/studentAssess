import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import SelectComponent from "./SelectComponent";
import { StudentContext } from "../store/studentcontext";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

const TeacherScreen = () => {
  const { studentsInfo, setStudentsInfo } = useContext(StudentContext);
  
  const fetchStudents = async () => {
    const response = await axios
      .get("/studentsinfo");
      setStudentsInfo(response.data)
      return response.data;
  };

  const { data, error, isLoading, isError } = useQuery({
    queryKey: ['data'],
    queryFn: fetchStudents,
  });

  // useEffect(() => {
  //   data && setStudentsInfo(data);
  // }, [data]);

  return (
    <div>
      <h1>Teacher Screen</h1>
     
        <SelectComponent label="Select your Name" options={data?.studentInfo} />
        <SelectComponent label="Select your Name" options={data?.studentInfo} />
    </div>
  );
};

export default TeacherScreen;
