import React, { useEffect, useState } from "react";
import PageTitle from "../../components/PageTitle";
import { useNavigate } from "react-router-dom";
import {
  Modal,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Button,
  IconButton,
  Fade,
  Zoom,
  Box,
  TextField,
} from "@mui/material";
import axios from "axios";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { HideLoading, ShowLoading } from "../../redux/alerts";
import { useParams } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";
import { AddOutlined } from "@mui/icons-material";

function ResultInfo() {
  const [obtainedMarks, setObtainedMarks] = useState(null);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [showStudentsModal, setShowStudentsModal] = useState(false);
  const [students, setStudents] = useState([]);
  const params = useParams();
  const [result, setResult] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
        const tempObtainedMarks = {};
        response.data.data.subjects.forEach((subject) => {
          tempObtainedMarks[subject.name] = 0;
        });
        setObtainedMarks(tempObtainedMarks);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      dispatch(HideLoading());
      toast.error(error.message);
    }
  };

  const getStudents = async () => {
    try {
      dispatch(ShowLoading());
      const response = await axios.post(
        "/api/student/get-all-students",
        {
          class: result.class,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(HideLoading());
      if (response.data.success) {
        setStudents(response.data.data);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      dispatch(HideLoading());
      toast.error(error.message);
    }
  };

  const saveStudentResult = async () => {
    let verdict = "pass";
    Object.keys(obtainedMarks).forEach((key) => {
      const subjectName = key;
      const marks = obtainedMarks[key];
      const passMarks = result.subjects.find(
        (subject) => subject.name === subjectName
      ).passMarks;
      if (Number(marks) < Number(passMarks)) {
        verdict = "fail";
      }
      return;
    });
    try {
      dispatch(ShowLoading());
      const response = await axios.post(
        "/api/results/save-student-result",
        {
          resultId: params.resultId,
          examination: result.examination,
          studentId: selectedStudent._id,
          obtainedMarks: obtainedMarks,
          verdict,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(HideLoading());
      if (response.data.success) {
        toast.success(response.data.message);
        setObtainedMarks(null);
        setSelectedStudent(null);
        getStudents();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      dispatch(HideLoading());
      toast.error(error.message);
    }
  };



  useEffect(() => {
    if (!result) {
      getResult();
    }
  }, []);

  useEffect(() => {
    if (result) {
      getStudents();
    }
  }, [result]);

  const handleStudentClick = (record) => {
    setSelectedStudent(record);
    const resultExists = record.results.find(
      (result) => result.resultId === params.resultId
    );
    if (resultExists) {
      setObtainedMarks(resultExists.obtainedMarks);
    }
    setShowStudentsModal(false);
  };

  return (
    <Box
      sx={{
        backgroundColor: "#ffffff",
        boxShadow: "10",
        padding: "20px",
      }}
    >
      <PageTitle title="Result Info" />
      {result && (
        <>
          <Box component="div" sx={{mb: 3, mt: 3 }}>
            <Typography variant="subtitle1">
              Name : {result.examination}
            </Typography>
            <Typography variant="subtitle1">Class : {result.class}</Typography>
            <Typography variant="subtitle1">Section : {result.section}</Typography>
            <Typography variant="subtitle1">Date : {result.date}</Typography>
          </Box>
          <hr />
          {!selectedStudent ? (
            <Typography
              variant="subtitle1"
              sx={{
                mt: 3,
                textDecoration: "underline",
                cursor: "pointer",
                transition: "0.3s",
                "&:hover": { color: "#4caf50" },
              }}
            >
              <Button
                onClick={() => {
                  setShowStudentsModal(true);
                }}
                startIcon={<AddOutlined />}
                variant="outlined"
              >
                Add Student
              </Button>
            </Typography>
          ) : (
            <>
              <div
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  card: true,
                  flexDirection: "row",
                  p: 2,
                }}
              >
                <Typography variant="subtitle1">
                  Student Name : {selectedStudent?.firstName}{" "}
                  {selectedStudent?.lastName}
                </Typography>
                <IconButton
                  onClick={() => {
                    const tempObtainedMarks = {};
                    result.subjects.forEach((subject) => {
                      tempObtainedMarks[subject.name] = 0;
                    });
                    setObtainedMarks(tempObtainedMarks);
                    setSelectedStudent(null);
                  }}
                >
                  <CloseIcon />
                </IconButton>
              </div>

              <TableContainer component={Paper}>
                <Table>
                  <TableHead sx={{ backgroundColor: "#cadaed" }}>
                    <TableRow>
                      <TableCell>Subject</TableCell>
                      <TableCell>Total Marks</TableCell>
                      <TableCell>Obtained Marks</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody sx={{ backgroundColor: "#caffff" }}>
                    {result?.subjects?.map((subject, index) => (
                      <TableRow key={index}>
                        <TableCell>{subject?.name}</TableCell>
                        <TableCell>{subject?.totalMarks}</TableCell>
                        <TableCell>
                          <TextField
                            type="text"
                            className="w-110"
                            value={obtainedMarks[subject?.name]}
                            onChange={(e) => {
                              const tempObtainedMarks = { ...obtainedMarks };
                              tempObtainedMarks[subject.name] = e.target.value;
                              console.log(tempObtainedMarks);
                              setObtainedMarks(tempObtainedMarks);
                            }}
                          />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>

              <Zoom in={!!selectedStudent}>
                <Button
                  onClick={saveStudentResult}
                  sx={{
                    mt: 2,
                    backgroundColor: "#55c2da",
                    color: "black",
                    "&:hover": {
                      backgroundColor: "#55c2da",
                    },
                  }}
                >
                  SAVE
                </Button>
              </Zoom>
            </>
          )}
        </>
      )}

      <Modal
        title="Select Student"
        open={showStudentsModal}
        onClose={() => {
          setShowStudentsModal(false);
        }}
      >
        <Fade in={showStudentsModal}>
          <div
            style={{
              width: "80vw",
              position: "absolute",
              top: "40%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              backgroundColor: "#fff",
              borderRadius: "8px",
              padding: "20px",
              boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
            }}
          >
            <Typography variant="h5">Select Student</Typography>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>First Name</TableCell>
                    <TableCell>Last Name</TableCell>
                    <TableCell>Class</TableCell>
                    <TableCell>Roll No</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody
                  sx={{
                    transition: "background-color 0.3s",
                    "&:hover": {
                      backgroundColor: "#cadaed",
                    },
                  }}
                >
                  {students.map((record) => (
                    <TableRow
                      key={record._id}
                      onClick={() => handleStudentClick(record)}
                      style={{
                        cursor: "pointer",
                        transition: "0.3s",
                        "&:hover": { backgroundColor: "#f1f1f1" },
                      }}
                    >
                      <TableCell>{record.firstName}</TableCell>
                      <TableCell>{record.lastName}</TableCell>
                      <TableCell>{record.class}</TableCell>
                      <TableCell>{record.rollNo}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </Fade>
      </Modal>
    </Box>
  );
}

export default ResultInfo;
