const Task = require("../models/Task");
const tryCatch = require("../middleware/async");
const { createCustomError } = require("../errors/custom-error");

const getAllTask = tryCatch(async (req, res) => {
  const getId = req.user;
  const { searchTerm, sortBy, projectId } = req.query;
  let filter = {
    user: getId,
  };

  console.log(sortBy);
  console.log(projectId);

  if (projectId && projectId.trim() !== "") {
    filter.project = projectId;
  }

  if (searchTerm) {
    filter.$or = [
      { title: { $regex: searchTerm, $options: "i" } },
      { name: { $regex: searchTerm, $options: "i" } },
    ];
  }

  let tasks;
  if (sortBy === "completed") {
    tasks = await Task.find({ ...filter, completed: true });
    console.log(tasks);
  } else if (sortBy === "incomplete") {
    tasks = await Task.find({ ...filter, completed: false });
  } else {
    tasks = await Task.find(filter);
  }

  console.log(tasks);
  return res.status(200).json({ tasks });
});
const createTask = tryCatch(async (req, res) => {
  const { title, name } = req.body;
  const getId = req.user;
  const createtask = new Task({
    user: getId,
    title: title,
    name: name,
  });
  await createtask.save();
  return res
    .status(201)
    .json({ message: `Task: ${title} created successfully` });
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
