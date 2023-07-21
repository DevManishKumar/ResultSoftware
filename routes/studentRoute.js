const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const router = express.Router();
const {
  addStudent,
  getAllStudent,
  getStudentByID,
  updateStudent,
  deleteStudent,
} = require("../controllers/studentController");

// add new student
router.post("/add-student", authMiddleware, addStudent);

// get all students
router.post("/get-all-students", authMiddleware, getAllStudent);

// get student by rollNo
router.post("/get-student/:rollNo", authMiddleware, getStudentByID);

// update student
router.post("/update-student/:rollNo", authMiddleware, updateStudent);

// delete student
router.post("/delete-student/:rollNo", authMiddleware, deleteStudent);

module.exports = router;
