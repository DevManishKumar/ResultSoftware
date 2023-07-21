import React from "react";
import CircularProgress from "@mui/material/CircularProgress";

function Spinner() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <CircularProgress color="primary" />
    </div>
  );
}

export default Spinner;
