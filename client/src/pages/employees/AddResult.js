import React from "react";
import PageTitle from "../../components/PageTitle";
import ResultForm from "../../components/ResultForm";
import { Box } from "@mui/material";

function AddResult() {
  return (
    <Box sx={{ boxShadow: "10", padding:"20px" }}>
      <PageTitle title="Add Result" />
      <img
        src="\Result-vec.svg"
        alt=""
        height={100}
        width={100}
        className="my-2"
      />
      <ResultForm />
    </Box>
  );
}

export default AddResult;
