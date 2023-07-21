import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { HideLoading, ShowLoading } from "../redux/alerts";
import { Box, Button, Grid, MenuItem, Select, TextField } from "@mui/material";

function StudentForm({ student, type }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState(student || {});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const onFinish = async (e) => {
    e.preventDefault();
    try {
      dispatch(ShowLoading());
      let response = null;
      if (type === "edit") {
        response = await axios.post(
          `/api/student/update-student/${formValues.rollNo}`,
          formValues,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
      } else {
        response = await axios.post("/api/student/add-student", formValues, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
      }

      dispatch(HideLoading());
      if (response.data.success) {
        toast.success(response.data.message);
        navigate("/employee/students");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      dispatch(HideLoading());
      toast.error(error.message);
    }
  };

  return (
    <Box component={"div"} sx={{ marginTop: "1.4rem" }}>
      <form onSubmit={onFinish}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={4}>
            <TextField
              label="First Name"
              name="firstName"
              variant="outlined"
              fullWidth
              required
              value={formValues.firstName || ""}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              label="Last Name"
              name="lastName"
              variant="outlined"
              fullWidth
              required
              value={formValues.lastName || ""}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              label="Roll No"
              name="rollNo"
              variant="outlined"
              fullWidth
              required
              type="number"
              disabled={type === "edit"}
              value={formValues.rollNo || ""}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              label="Email"
              name="email"
              variant="outlined"
              fullWidth
              required
              value={formValues.email || ""}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              label="Phone Number"
              name="phoneNumber"
              variant="outlined"
              fullWidth
              required
              value={formValues.phoneNumber || ""}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              label="Class"
              name="class"
              variant="outlined"
              fullWidth
              required
              type="number"
              value={formValues.class || ""}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              select
              label="Select Section"
              name="section"
              variant="outlined"
              fullWidth
              required
              value={formValues.section || ""}
              onChange={handleChange}
            >
              <MenuItem value="Section A">Section A</MenuItem>
              <MenuItem value="Section B">Section B</MenuItem>
              <MenuItem value="Section C">Section C</MenuItem>
            </TextField>
          </Grid>
        </Grid>

        <div
          style={{ display: "flex", justifyContent: "flex-end", marginTop: 10 }}
        >
          <Button
            variant="contained"
            type="submit"
            sx={{
              backgroundColor: "#55c2da",
              color: "black",
              transition: "background-color 0.2s, color 0.2s",
              "&:hover": {
                backgroundColor: "#55c2da",
              },
            }}
          >
            Save
          </Button>
        </div>
      </form>
    </Box>
  );
}

export default StudentForm;
