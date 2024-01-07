const express = require("express");
const router = express.Router();
const authenticate = require("../middleware/authValidation");
const {
  getAllTask,
  createTask,
  updateTask,
  deleteTask,
} = require("../controllers/tasksController");

router.route("/").get(authenticate, getAllTask).post(authenticate, createTask);
router
  .route("/:id")
  .delete(authenticate, deleteTask)
  .patch(authenticate, updateTask);

module.exports = router;
