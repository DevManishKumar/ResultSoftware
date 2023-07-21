const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const {
  addNewResult,
  getAllResult,
  getResultByID,
  addStudentResult,
  getStudentResultByID,
  deleteResult,
} = require("../controllers/resultController");
const router = express.Router();

//  add new result
router.post("/add-result", authMiddleware, addNewResult);

// get all results
router.post("/get-all-results", getAllResult);

// get result by id
router.post("/get-result/:resultId", getResultByID);

// add student result
router.post("/save-student-result", authMiddleware, addStudentResult);

// get student result by id
router.post("/get-student-result", getStudentResultByID);

// delete result
router.post("/delete-result/:resultId", authMiddleware, deleteResult);

module.exports = router;
