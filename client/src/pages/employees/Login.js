import { Box, Button, TextField, Typography } from "@mui/material";
import axios from "axios";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { HideLoading, ShowLoading } from "../../redux/alerts";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onFinish = async (values) => {
    try {
      dispatch(ShowLoading());
      const response = await axios.post("/api/employee/login", values);
      dispatch(HideLoading());
      if (response.data.success) {
        toast.success(response.data.message);
        localStorage.setItem("token", response.data.data);
        navigate("/employee");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      dispatch(HideLoading());
      toast.error(error.message);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const values = {};
    formData.forEach((value, key) => {
      values[key] = value;
    });

    onFinish(values);
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
    >
      <Box
        component="form"
        onSubmit={handleSubmit}
        width="400px"
        p={4}
        boxShadow={2}
        borderRadius={8}
        sx={{ backgroundColor: "#ffffff", boxShadow: "10" }}
      >
        <Typography variant="h5" align="center" gutterBottom>
          Teacher - Login
        </Typography>
        <TextField
          variant="filled"
          label="Teacher ID"
          name="employeeId"
          fullWidth
          required
          margin="normal"
        />
        <TextField
          variant="filled"
          label="Password"
          name="password"
          type="password"
          fullWidth
          required
          margin="normal"
        />
        <Button
          type="submit"
          fullWidth
          sx={{
            backgroundColor: "#5adbb5",
            color: "black",
            mt: 2,
            transition: "transform 0.2s ease",
            "&:hover": {
              transform: "scale(1.05)",
              backgroundColor: "#5adbb5",
            },
          }}
        >
          Login
        </Button>
        <Typography variant="body2" align="center" mt={1}>
          Not Registered? <Link to="/register">Click Here To Register</Link>
        </Typography>
      </Box>
    </Box>
  );
}

export default Login;
