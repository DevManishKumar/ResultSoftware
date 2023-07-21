import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  IconButton,
} from "@mui/material";
import { Logout } from "@mui/icons-material";

function DefaultLayout(props) {
  const { employee } = useSelector((state) => state.employee);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <Box>
      <AppBar
        position="static"
        sx={{
          backgroundColor: "#FFCF2D",
          height: "5rem",
          justifyContent: "center",
        }}
      >
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Box display="flex" alignItems="center" sx={{ color: "#272121" }}>
              <Typography
                variant="p"
                sx={{ color: "#3B0000", fontWeight: "700", marginRight: "4px" }}
              >
                Result
              </Typography>
              Software
            </Box>
          </Typography>
          {employee && (
            <Box display="flex" alignItems="center" gap={4}>
              <Typography
                variant="body1"
                color="white"
                onClick={() => {
                  navigate("/");
                }}
                sx={{ cursor: "pointer", color: "#272121" }}
              >
                {employee.name.toUpperCase()}
              </Typography>
              <IconButton sx={{ color: "#272121" }} onClick={handleLogout}>
                <Logout />
              </IconButton>
            </Box>
          )}
        </Toolbar>
      </AppBar>
      <Box p={4}>{props.children}</Box>
    </Box>
  );
}

export default DefaultLayout;
