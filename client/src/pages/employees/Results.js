import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { EditOutlined } from "@mui/icons-material";
import PageTitle from "../../components/PageTitle";
import { HideLoading, ShowLoading } from "../../redux/alerts";

function Results() {
  const dispatch = useDispatch();
  const [results, setResults] = useState([]);
  const navigate = useNavigate();

  const getResults = async () => {
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

  const deleteResult = async (resultId) => {
    try {
      dispatch(ShowLoading());
      const response = await axios.post(
        `/api/result/delete-result/${resultId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(HideLoading());
      if (response.data.success) {
        getResults();
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
    getResults();
  }, []);

  return (
    <Box
      sx={{
        padding: 2,
      }}
    >
      <PageTitle title="Results" />
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
            navigate("/employee/results/add");
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
          Add Result
        </Button>
      </Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="center">Examination</TableCell>
              <TableCell align="center">Class</TableCell>
              <TableCell align="center">Section</TableCell>
              <TableCell align="center">Date</TableCell>
              <TableCell align="center">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {results.map((result) => (
              <TableRow key={result._id}>
                <TableCell align="center">{result.examination}</TableCell>
                <TableCell align="center">{result.class}</TableCell>
                <TableCell align="center">{result.section}</TableCell>
                <TableCell align="center">{result.date}</TableCell>
                <TableCell align="center">
                  <IconButton
                    onClick={() => {
                      navigate(`/employee/results/edit/${result._id}`);
                    }}
                    color="primary"
                    sx={{
                      backgroundColor: "#52c41a",
                      transition: "background-color 0.3s",
                      "&:hover": {
                        backgroundColor: "#389e0d",
                      },
                    }}
                  >
                    <EditOutlined />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default Results;
