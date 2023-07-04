const express = require("express");
const router = express.Router();
const authenticate = require("../middleware/authValidation");
const {
  getAllTask,
  createTask,
  getSingleTask,
  updateTask,
  deleteTask,
} = require("../controllers/tasks");

router.route("/").get(authenticate, getAllTask).post(authenticate, createTask);
router
  .route("/:id")
  .get(authenticate, getSingleTask)
  .delete(authenticate, deleteTask)
  .patch(authenticate, updateTask);

module.exports = router;
