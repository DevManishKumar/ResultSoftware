import { AppBar, Button, Toolbar, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";


const Header = () => {
    const navigate = useNavigate();
  return (
    <div>
      <AppBar
        position="static"
        sx={{
          backgroundColor: "#FFCF2D",
          height: "5rem",
          justifyContent: "center",
        }}
      >
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Typography variant="h5" component="div" sx={{ color: "#272121" }}>
            <Typography
              variant="p"
              sx={{ color: "#3B0000", fontWeight: "700" }}
            >
              Result
            </Typography>{" "}
            Software
          </Typography>
          <Button
            color="inherit"
            sx={{
              fontSize: "1.1rem",
              color: "#272121",
              textDecoration: "underline",
            }}
            onClick={() => {
              navigate("/login");
            }}
          >
            LOGIN
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}
export default Header