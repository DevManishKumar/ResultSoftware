import axios from "axios";
import React, { useEffect } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import PageTitle from "../../components/PageTitle";
import { HideLoading, ShowLoading } from "../../redux/alerts";
import {
  Box,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { IconButton } from "@mui/material";
import { DeleteOutline, EditOutlined } from "@mui/icons-material";

function Students() {
  const dispatch = useDispatch();
  const [students, setStudents] = React.useState([]);
  const navigate = useNavigate();
  const getStudents = async (values) => {
    try {
      dispatch(ShowLoading());
      const response = await axios.post(
        "/api/student/get-all-students",
        {},
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

  const deleteStudent = async (rolNo) => {
    try {
      dispatch(ShowLoading());
      const response = await axios.post(
        `/api/student/delete-student/${rolNo}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(HideLoading());
      if (response.data.success) {
        getStudents();
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      dispatch(HideLoading());
      toast.error(error.message);
    }
  };

  useEffect(() => {
    getStudents();
  }, []);

  const columns = [
    {
      title: "Class",
      dataIndex: "class",
      key: "class",
    },
    {
      title: "Roll No",
      dataIndex: "rollNo",
      key: "rollNo",
    },
    {
      title: "First Name",
      dataIndex: "firstName",
      key: "firstName",
    },
    {
      title: "Last Name",
      dataIndex: "lastName",
      key: "lastName",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Phone Number",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
    },
    {
      title: "Section",
      dataIndex: "section",
      key: "section",
    },
    {
      title: "Action",
      key: "action",
    },
  ];
  return (
    <Box
      sx={{
        minHeight: "100vh",
        padding: "20px",
        transition: "background-color 0.5s ease",
      }}
    >
      <PageTitle title="Student" />
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
          my: 3,
        }}
      >
        <Button
          onClick={() => {
            navigate("/employee/students/add");
          }}
          sx={{
            backgroundColor: "#55c2da",
            color: "black",
            transition: "transform 0.2s ease",
            "&:hover": {
              transform: "scale(1.05)",
              backgroundColor: "#55c2da",
            },
          }}
        >
          Add Student
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table
          sx={{
            minWidth: 650,
            boxShadow: "10",
          }}
        >
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.key}
                  align="center"
                  sx={{
                    fontWeight: "bold",
                    color: "#333",
                    transition: "color 0.3s ease",
                  }}
                >
                  {column.title}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {students.map((student) => (
              <TableRow
                key={student.id}
                sx={{
                  "&:hover": {
                    backgroundColor: "#d2e7e6",
                    transition: "background-color 0.3s ease",
                  },
                }}
              >
                <TableCell align="center">{student.class}</TableCell>
                <TableCell align="center">{student.rollNo}</TableCell>
                <TableCell align="center">{student.firstName}</TableCell>
                <TableCell align="center">{student.lastName}</TableCell>
                <TableCell align="center">{student.email}</TableCell>
                <TableCell align="center">{student.phoneNumber}</TableCell>
                <TableCell align="center">{student.section}</TableCell>
                <TableCell align="center">
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      "& .MuiIconButton-root": {
                        transition: "background-color 0.3s",
                      },
                      "& .MuiIconButton-root:hover": {
                        backgroundColor: "#fd0",
                      },
                    }}
                  >
                    <IconButton
                      onClick={() => {
                        deleteStudent(student.rollNo);
                      }}
                      color="error"
                      sx={{
                        backgroundColor: "#ff4d4f",
                        "& .MuiIconButton-label": {
                          color: "#fff",
                        },
                      }}
                    >
                      <DeleteOutline />
                    </IconButton>
                    <IconButton
                      onClick={() => {
                        navigate(`/employee/students/edit/${student.rollNo}`);
                      }}
                      color="primary"
                      sx={{
                        backgroundColor: "#52c41a",
                        "& .MuiIconButton-label": {
                          color: "#fff",
                        },
                      }}
                    >
                      <EditOutlined />
                    </IconButton>
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default Students;
