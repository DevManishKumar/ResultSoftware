import { Grid, Box, AppBar, Toolbar, Typography, Button, Card, CardContent } from "@mui/material";
import axios from "axios";
import React, { useEffect } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { HideLoading, ShowLoading } from "../redux/alerts";
import Header from "../components/Header";

function Home() {
  const dispatch = useDispatch();
  const [results, setResults] = React.useState([]);
  const navigate = useNavigate();
  const getResults = async (values) => {
    try {
      dispatch(ShowLoading());
      const response = await axios.post(
        "/api/results/get-all-results",
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(HideLoading());
      if (response.data.success) {
        setResults(response.data.data);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      dispatch(HideLoading());
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (results.length === 0) {
      getResults();
    }
  }, []);

  return (
    <Box>
      <Header />

      {results.length > 0 ? (
        <Grid sx={{ padding: "10px" }} container spacing={2}>
          <Grid item xs={12}>
            <Typography
              variant="h1"
              sx={{
                fontSize: "2.2rem",
                marginTop: "1rem",
                marginBottom: "1rem",
                textAlign: "center",
                color: "#000",
                textDecoration: "underline",
              }}
            >
              Welcome to Result Portal - Result Software
            </Typography>
            <Typography
              variant="h1"
              sx={{
                fontSize: "1.8rem",
                marginTop: "3rem",
                marginBottom: "1rem",
              }}
            >
              Select Your Examination
            </Typography>
            <hr />
          </Grid>

          {results.map((result) => (
            <Grid item xs={6} sm={4} md={3} key={result._id}>
              <Card
                sx={{
                  cursor: "pointer",
                  backgroundColor: "#ffffff",
                  boxShadow: "10",
                }}
                onClick={() => navigate(`/result/${result._id}`)}
              >
                <CardContent>
                  <Typography
                    variant="h5"
                    sx={{
                      fontSize: "1.5rem",
                      marginBottom: "2.5rem",
                      textAlign: "center",
                    }}
                  >
                    {result.examination}
                  </Typography>
                  <hr />
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      mt: 3,
                    }}
                  >
                    <Typography
                      variant="body1"
                      sx={{ fontSize: "1rem", margin: "0" }}
                    >
                      Class: {result.class}
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{ fontSize: "1rem", margin: "0" }}
                    >
                      Section: {result.section}
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      ) : (
        <div
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginTop: "5rem",
          }}
        >
          <Typography
            variant="h1"
            sx={{
              fontSize: "1.25rem",
              margin: "0",
              justifyContent: "center",
              padding: "10px",
            }}
          >
            No Results Found
          </Typography>
        </div>
      )}
    </Box>
  );
}

export default Home;
