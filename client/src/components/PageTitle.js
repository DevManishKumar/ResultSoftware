import { Box, Divider, IconButton, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import React from "react";
import { useNavigate } from "react-router-dom";

function PageTitle({ title }) {
  const navigate = useNavigate();
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: "5px",
        marginBottom: "10px",
        paddingLeft: "8px",
      }}
    >
      <IconButton onClick={() => navigate(-1)}>
        <ArrowBackIcon />
      </IconButton>
      <Typography variant="h6">{title}</Typography>
      <Divider orientation="horizontal" flexItem sx={{ flexGrow: 1 }} />
    </Box>
  );
}

export default PageTitle;
