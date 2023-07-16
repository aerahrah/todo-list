const express = require("express");
const router = express.Router();
const authenticate = require("../middleware/authValidation");
const {
  getAllProject,
  getSingleProject,
  deleteProject,
  createProject,
} = require("../controllers/projectController");

router
  .route("/")
  .get(authenticate, getAllProject)
  .post(authenticate, createProject);

router
  .route("/:id")
  .get(authenticate, getSingleProject)
  .delete(authenticate, deleteProject);

module.exports = router;
