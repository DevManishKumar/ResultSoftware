import {Box, Card, CardActionArea, CardContent, Grid, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

const cardsData = [
  {
    id: 1,
    title: "Students",
    image: "Student2-vec.svg",
    route: "/employee/students",
  },
  {
    id: 2,
    title: "Results",
    image: "Result-vec.svg",
    route: "/employee/results",
  },
];

function EmployeeHome() {
  const navigate = useNavigate();

  return (
    <Box
      sx={{ minHeight: "100vh", padding: "20px"}}
    >
      <Grid container spacing={2} justifyContent="center">
        {cardsData.map((card) => (
          <Grid item xs={12} sm={6} md={4} key={card.id}>
            <Card
              sx={{
                color: "#333333",
                borderRadius: "10px",
                boxShadow: "10",
                padding: 2,
                cursor: "pointer",
                transition: "transform 0.2s ease",
                "&:hover": {
                  transform: "scale(1.05)",
                  boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",
                },
              }}
              onClick={() => navigate(card.route)}
            >
              <CardActionArea
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  p: 3,
                }}
              >
                <img src={card.image} alt={card.title} height={50} width={50} />
                <Typography variant="h5" sx={{ ml: 2 }}>
                  {card.title}
                </Typography>
              </CardActionArea>
              <CardContent>
                <Typography variant="body1">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Vestibulum ut felis lectus.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default EmployeeHome;
