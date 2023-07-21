import React from "react";
import { useNavigate } from "react-router-dom";
import PageTitle from "../../components/PageTitle";
import StudentForm from "../../components/StudentForm";
import { Box } from "@mui/material";

function AddStudent() {
  const navigate = useNavigate();
  return (
    <Box
      sx={{
        boxShadow: "10",
        padding: "20px",
      }}
    >
      <PageTitle title="Add Student" />
      <img src="\Student2-vec.svg" alt="" height={100} width={100} />
      <StudentForm />
    </Box>
  );
}

export default AddStudent;
