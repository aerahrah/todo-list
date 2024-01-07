const express = require("express");
const router = express.Router();
const authenticate = require("../middleware/authValidation");
const {
  getAllProject,
  deleteProject,
  createProject,
  updateProject,
} = require("../controllers/projectController");

router
  .route("/")
  .get(authenticate, getAllProject)
  .post(authenticate, createProject);

router
  .route("/:id")
  .delete(authenticate, deleteProject)
  .patch(authenticate, updateProject);

module.exports = router;
