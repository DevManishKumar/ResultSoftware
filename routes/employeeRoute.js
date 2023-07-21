const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");
const {
  registerNewEmployee,
  loginEmployee,
  getEmployeeByID,
} = require("../controllers/employeeController");

// register new employee
router.post("/register", registerNewEmployee);

// login employee
router.post("/login", loginEmployee);

// get employee by id
router.post("/get-employee-by-id", authMiddleware, getEmployeeByID);

module.exports = router;
