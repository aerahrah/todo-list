const Task = require("../models/Task");
const tryCatch = require("../middleware/async");
const { createCustomError } = require("../errors/custom-error");

const getAllTask = tryCatch(async (req, res) => {
  const tasks = await Task.find({});
  return res.status(200).json({ tasks });
});
const createTask = tryCatch(async (req, res) => {
  const task = await Task.create(req.body);
  return res
    .status(201)
    .json({ message: `Task: ${task} created successfully` });
});
const getSingleTask = tryCatch(async (req, res, next) => {
  const { id: taskId } = req.params;
  const task = await Task.findOne({ _id: taskId });
  if (!task) {
    return next(createCustomError(`No task with id : ${taskId}`, 404));
  }
  return res.status(200).json({ task });
});
const deleteTask = tryCatch(async (req, res, next) => {
  const { id: taskId } = req.params;
  const task = await Task.findOneAndDelete({ _id: taskId });
  console.log(task);
  if (!task) {
    return next(createCustomError(`No task with id : ${taskId}`, 404));
  }
  return res.status(200).json("Successfully deleted task");
});
const updateTask = tryCatch(async (req, res, next) => {
  const { id: taskId } = req.params;
  const task = await Task.findOneAndUpdate({ _id: taskId }, req.body, {
    new: true,
    runValidators: true,
  });
  if (!task) {
    return next(createCustomError(`No task with id : ${taskId}`, 404));
  }
  return res.status(200).json({ task });
});

module.exports = {
  getAllTask,
  createTask,
  getSingleTask,
  updateTask,
  deleteTask,
};
