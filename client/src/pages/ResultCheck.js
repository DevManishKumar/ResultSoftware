import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  Box,
  Button,
  Card,
  Divider,
  Input,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { ShowLoading, HideLoading } from "../redux/alerts";
import Header from "../components/Header";
import axios from "axios";
import toast from "react-hot-toast";
import { PrintOutlined } from "@mui/icons-material";

const ResultCheck = () => {
  const navigate = useNavigate();
  const [rollNo, setRollNo] = React.useState("");
  const [studentResult, setStudentResult] = React.useState(null);
  const params = useParams();
  const [result, setResult] = React.useState(null);
  const dispatch = useDispatch();

  const getResult = async () => {
    try {
      dispatch(ShowLoading());
      const response = await axios.post(
        `/api/results/get-result/${params.resultId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(HideLoading());
      if (response.data.success) {
        setResult(response.data.data);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      dispatch(HideLoading());
      toast.error(error.message);
    }
  };

  const getStudentResult = async () => {
    try {
      dispatch(ShowLoading());
      const response = await axios.post(
        `/api/results/get-student-result`,
        {
          rollNo: rollNo,
          resultId: params.resultId,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(HideLoading());
      if (response.data.success) {
        setStudentResult(response.data.data);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      dispatch(HideLoading());
      toast.error(error.message);
    }
  };

  // Function to get grade from percentage
  const getGradeFromPercentage = (percentage, getStudentResult) => {
    if (percentage >= 80 && percentage <= 100) {
      return "A+";
    } else if (percentage >= 70 && percentage < 80) {
      return "A";
    } else if (percentage >= 60 && percentage < 70) {
      return "B+";
    } else if (percentage >= 50 && percentage < 60) {
      return "B";
    }else if (percentage >= 40 && percentage < 50) {
      return "C";
    }
     else {
      return "Fail";
    }
  };

  useEffect(() => {
    if (!result) {
      getResult();
    }
  }, []);

  const getPercenatge = () => {
    let totalMarks = 0;
    let obtainedMarks = 0;
    result.subjects.forEach((subject) => {
      totalMarks += Number(subject.totalMarks);
    });
    console.log(totalMarks);
    Object.keys(studentResult.obtainedMarks).forEach((key) => {
      obtainedMarks += Number(studentResult.obtainedMarks[key]);
    });
    console.log(obtainedMarks);
    return (obtainedMarks / totalMarks) * 100;
  };

  const handlePrintResult = () => {
    const printableWindow = window.open("", "_blank");
    printableWindow.document.open();
    printableWindow.document.write(
      `<html>
      <head>
        <title>Student Result</title>
        <style>
          @media print {
            body {
              background-color: #f9f9f9;
            }
            .printable-content {
              width: 90%;
              height: 90%;
              margin: 0;
              padding: 20px;
              border: 10px solid #3498db;
              display: flex;
              flex-direction: column;
              align-items: start;
              justify-content: center;
            }
            table {
              width: 100%;
              margin-bottom: 20px;
              border-collapse: collapse;
              text-align: center;
              border: 1px solid #333;
            }
            th, td {
              padding: 8px;
              border: 1px solid #333;
            }
            
          }
        </style>
      </head>
      <body onload="window.print()">
        <div class="printable-content">
          <h2>Name: ${studentResult.firstName} ${studentResult.lastName}</h1>
          <h2>Class: ${result.class}</h2>
          <table>
            <thead>
              <tr>
                <th>Subject</th>
                <th>Total Marks</th>
                <th>Obtained Marks</th>
                <th>Grade</th>
              </tr>
            </thead>
            <tbody>
              ${result.subjects
                .map(
                  (subject, index) => `
                <tr>
                  <td>${subject.name}</td>
                  <td>${subject.totalMarks}</td>
                  <td>${studentResult.obtainedMarks[subject?.name] || 0}</td>
                  <td>${getGradeFromPercentage(
                    (studentResult.obtainedMarks[subject?.name] /
                      subject.totalMarks) *
                      100
                  )}</td>
                </tr>
              `
                )
                .join("")}
            </tbody>
          </table>
          <div>
            <h3>Percentage : ${getPercenatge().toFixed(
              2
            )} % , Result : ${studentResult?.verdict?.toUpperCase()}</h3>
          </div>
        </div>
      </body>
    </html>`
    );
    printableWindow.document.close();
  };

  return (
    <>
      <Header />
      <Box sx={{ alignItems: "center" }}>
        {result && (
          <Card sx={{ mt: 3, p: 3, m: 2, backgroundColor: "#ffffff" }}>
            <Typography variant="h5" sx={{ color: "text.primary", mb: 1 }}>
              Examination: {result.examination}
            </Typography>
            <Typography variant="h5" sx={{ color: "text.primary" }}>
              Class: {result.class}
            </Typography>
            <Typography variant="h5" sx={{ color: "text.primary" }}>
              Section: {result.section}
            </Typography>
          </Card>
        )}
        <Card
          sx={{
            display: "flex",
            gap: 3,
            p: 3,
            m: 2,
            flexDirection: "row",
            my: 3,
            backgroundColor: "#ffffff",
          }}
        >
          <Input
            type="text"
            placeholder="Roll No"
            sx={{ width: "300px" }}
            value={rollNo}
            onChange={(e) => setRollNo(e.target.value)}
          />
          <Button
            onClick={getStudentResult}
            sx={{
              backgroundColor: "#55c2da",
              color: "black",
              "&:hover": {
                backgroundColor: "#55c2da",
              },
            }}
          >
            Get Result
          </Button>
        </Card>

        {studentResult && (
          <Card sx={{ p: 3, m: 2, backgroundColor: "#ffffff" }}>
            <div>
              <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                <b>
                  Name: {studentResult.firstName} {studentResult.lastName}
                </b>
              </Typography>
              {result && (
                <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                  Class :{result.class}
                </Typography>
              )}
            </div>
            <Divider />
            <TableContainer
              component={Card}
              sx={{
                mt: 3,
                border: "1px solid #ccc",
                "& .MuiTableCell-root": {
                  borderBottom: "1px solid #ccc",
                },
              }}
            >
              <Table
                sx={{
                  backgroundColor: "#cadaed",
                }}
              >
                <TableHead>
                  <TableRow>
                    <TableCell align="center">Subject</TableCell>
                    <TableCell align="center">Total Marks</TableCell>
                    <TableCell align="center">Obtained Marks</TableCell>
                    <TableCell align="center">Grade</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {result.subjects.map((subject, index) => (
                    <TableRow key={index}>
                      <TableCell align="center">{subject.name}</TableCell>
                      <TableCell align="center">{subject.totalMarks}</TableCell>
                      <TableCell align="center">
                        {studentResult.obtainedMarks[subject?.name] || 0}
                      </TableCell>
                      <TableCell align="center">
                        {getGradeFromPercentage(
                          (studentResult.obtainedMarks[subject?.name] /
                            subject.totalMarks) *
                            100
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>

            <Box
              sx={{
                backgroundColor: "#cadaed",
                color: "#0f0f0f",
                p: 2,
                mt: 1,
                textAlign: "center",
              }}
            >
              <Typography variant="h5">
                Percentage : {getPercenatge().toFixed(2)} % , Result :{" "}
                {studentResult?.verdict?.toUpperCase()}
              </Typography>
            </Box>

            <div sx={{ display: "flex", justifyContent: "center", my: 3 }}>
              <Button
                startIcon={<PrintOutlined />}
                variant="contained"
                onClick={handlePrintResult}
                sx={{
                  mt: 2,
                  backgroundColor: "#555555",
                  color: "#FFFFFF",
                  transition: "background-color 0.2s, color 0.2s",
                  "&:hover": {
                    backgroundColor: "#444444",
                  },
                }}
              >
                Print Result
              </Button>
            </div>
          </Card>
        )}
      </Box>
    </>
  );
};

export default ResultCheck;
