/* eslint-disable no-unused-vars */
import {
  Button,
  Grid,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import { AddOutlined, DeleteOutline } from "@mui/icons-material";
import axios from "axios";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { HideLoading, ShowLoading } from "../redux/alerts";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { useNavigate } from "react-router-dom";

function ResultForm() {
  const { employee } = useSelector((state) => state.employee);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    control,
    handleSubmit,
    formState: { errors },
    register,
    setValue,
  } = useForm({
    defaultValues: {
      examination: "",
      date: "",
      class: "",
      subjects: [],
    },
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "subjects",
  });

  const onSubmit = async (data) => {
    data.createdBy = employee._id;
    try {
      dispatch(ShowLoading());
      const response = await axios.post("/api/results/add-result", data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      dispatch(HideLoading());
      if (response.data.success) {
        toast.success(response.data.message);
        navigate(-1);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      dispatch(HideLoading());
      toast.error(error.message);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container mb={1} spacing={2}>
          <Grid item xs={12} sm={4}>
            <Controller
              name="examination"
              control={control}
              defaultValue=""
              rules={{ required: "Please enter the Examination" }}
              render={({ field }) => (
                <TextField
                  label="Examination"
                  variant="outlined"
                  fullWidth
                  error={!!errors?.examination}
                  helperText={errors?.examination?.message}
                  {...field}
                />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <Controller
              name="date"
              control={control}
              defaultValue=""
              rules={{ required: "Please enter the Date" }}
              render={({ field }) => (
                <TextField
                  label="Date"
                  type="date"
                  variant="outlined"
                  fullWidth
                  error={!!errors?.date}
                  helperText={errors?.date?.message}
                  {...field}
                />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <Controller
              name="class"
              control={control}
              defaultValue=""
              rules={{ required: "Please enter the Class" }}
              render={({ field }) => (
                <TextField
                  label="Class"
                  type="number"
                  variant="outlined"
                  fullWidth
                  error={!!errors?.class}
                  helperText={errors?.class?.message}
                  {...field}
                />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <Controller
              label="Select"
              name="section"
              control={control}
              defaultValue=""
              rules={{ required: "Please enter the Section" }}
              render={({ field }) => (
                <TextField
                  select
                  label="Select Section"
                  type="string"
                  variant="outlined"
                  fullWidth
                  error={!!errors?.section}
                  helperText={errors?.section?.message}
                  {...field}
                  sx={{ color: "black" }}
                >
                  <MenuItem value="Section A">Section A</MenuItem>
                  <MenuItem value="Section B">Section B</MenuItem>
                  <MenuItem value="Section C">Section C</MenuItem>
                </TextField>
              )}
            />
          </Grid>
        </Grid>
        <hr />
        {fields.map((item, index) => (
          <Grid container mt={2} spacing={2} key={item.id}>
            <Grid item xs={12} sm={4}>
              <Controller
                name={`subjects[${index}].name`}
                control={control}
                defaultValue=""
                rules={{ required: "Please enter the Subject Name" }}
                render={({ field }) => (
                  <TextField
                    label="Subject Name"
                    variant="outlined"
                    fullWidth
                    error={!!errors?.subjects?.[index]?.name}
                    helperText={errors?.subjects?.[index]?.name?.message}
                    {...field}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <Controller
                name={`subjects[${index}].totalMarks`}
                control={control}
                defaultValue=""
                rules={{ required: "Please enter the Total Marks" }}
                render={({ field }) => (
                  <TextField
                    label="Total Marks"
                    type="number"
                    variant="outlined"
                    fullWidth
                    error={!!errors?.subjects?.[index]?.totalMarks}
                    helperText={errors?.subjects?.[index]?.totalMarks?.message}
                    {...field}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <Controller
                name={`subjects[${index}].passMarks`}
                control={control}
                defaultValue=""
                rules={{ required: "Please enter the Pass Marks" }}
                render={({ field }) => (
                  <TextField
                    label="Pass Marks"
                    type="number"
                    variant="outlined"
                    fullWidth
                    error={!!errors?.subjects?.[index]?.passMarks}
                    helperText={errors?.subjects?.[index]?.passMarks?.message}
                    {...field}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={1} mb={1}>
              <Button
                startIcon={<DeleteOutline />}
                variant="outlined"
                color="secondary"
                onClick={() => remove(index)}
              >
                Delete
              </Button>
            </Grid>
          </Grid>
        ))}
        <Typography
          variant="h6"
          className="text-medium underline mt-3 cursor-pointer"
        >
          <Button
            startIcon={<AddOutlined />}
            variant="outlined"
            onClick={() => append({ name: "", totalMarks: "", passMarks: "" })}
          >
            Add Subject
          </Button>
        </Typography>
        <div
          style={{ display: "flex", justifyContent: "flex-end", marginTop: 10 }}
        >
          <Button
            type="submit"
            sx={{
              mt: 2,
              backgroundColor: "#55c2da",
              color: "black",
              "&:hover": {
                backgroundColor: "#55c2da",
              },
            }}
          >
            Save
          </Button>
        </div>
      </form>
    </div>
  );
}

export default ResultForm;
