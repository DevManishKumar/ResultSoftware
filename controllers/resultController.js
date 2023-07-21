const Result = require("../models/resultsModel");
const Student = require("../models/studentModel");

// Add New Result
// Add New Result
exports.addNewResult = async (req, res) => {
  try {
    const resultExists = await Result.findOne({
      examination: req.body.examination,
    });

    if (resultExists) {
      return res.status(200).json({
        message: "Result already exists",
        success: false,
      });
    }

    const newResult = new Result(req.body);
    await newResult.save();

    res.status(200).json({
      message: "Result added successfully",
      success: true,
      data: newResult, // You can choose to send the newly created result data
    });
  } catch (error) {
    res.status(500).json({
      message: "Error adding new result",
      success: false,
      error: error.message,
    });
  }
};

// Get All Result
exports.getAllResult = async (req, res) => {
  try {
    const results = await Result.find();
    res.status(200).send({
      message: "Results retrieved successfully",
      success: true,
      data: results,
    });
  } catch (error) {
    res.status(500).send({
      message: error.message,
      success: false,
    });
  }
};

// Get Result By ID
exports.getResultByID = async (req, res) => {
  try {
    const result = await Result.findById(req.params.resultId);
    res.status(200).send({
      message: "Result retrieved successfully",
      success: true,
      data: result,
    });
  } catch (error) {
    res.status(500).send({
      message: error.message,
      success: false,
    });
  }
};

// Add Student Result
exports.addStudentResult = async (req, res) => {
  try {
    const student = await Student.findById(req.body.studentId);
    if (!student) {
      return res.status(200).send({
        message: "Student not found",
        success: false,
      });
    }
    let newResults = student.results;
    const existingResults = student.results;
    const resultExists = existingResults.find(
      (result) => result.resultId === req.body.resultId
    );

    if (resultExists) {
      newResults = existingResults.map((result) => {
        if (result.resultId === req.body.resultId) {
          return {
            ...result,
            obtainedMarks: req.body.obtainedMarks,
            verdict: req.body.verdict,
          };
        }
        return result;
      });
    } else {
      newResults = [...existingResults, req.body];
    }

    const updatedStudent = await Student.findByIdAndUpdate(
      req.body.studentId,
      {
        results: newResults,
      },
      { new: true }
    );
    res.status(200).send({
      message: "Result saved successfully",
      success: true,
      data: updatedStudent,
    });
  } catch (error) {
    res.status(500).send({
      message: error.message,
      success: false,
    });
  }
};

// Get Student Result By ID
exports.getStudentResultByID = async (req, res) => {
  try {
    const student = await Student.findOne({
      rollNo: req.body.rollNo,
    });
    if (!student) {
      return res.status(200).send({
        message: "Student not found",
        success: false,
      });
    }
    const resultExists = student.results.find(
      (result) => result.resultId === req.body.resultId
    );
    if (!resultExists) {
      return res.status(200).send({
        message: "Result not found",
        success: false,
      });
    }
    res.status(200).send({
      message: "Result retrieved successfully",
      success: true,
      data: {
        ...resultExists,
        studentId: student._id,
        firstName: student.firstName,
        lastName: student.lastName,
      },
    });
  } catch (error) {
    res.status(500).send({
      message: error.message,
      success: false,
    });
  }
};

// Delete Result
exports.deleteResult = async (req, res) => {
  try {
    const result = await Result.findByIdAndDelete(req.params.resultId);
    if (!result) {
      return res.status(404).json({
        message: "Result not found",
        success: false,
      });
    }
    res.status(200).json({
      message: "Result deleted successfully",
      success: true,
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
      success: false,
    });
  }
};
