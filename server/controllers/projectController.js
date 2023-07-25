const Project = require("../models/Project");
const tryCatch = require("../middleware/async");
const { createCustomError } = require("../errors/custom-error");

const getAllProject = tryCatch(async (req, res, next) => {
  const userId = req.user;
  const project = await Project.find({ user: userId });
  return res.status(200).json({ project });
});

const getSingleProject = tryCatch(async (req, res, next) => {
  const { id: projectId } = req.params;
  const project = await Project.findOne({ _id: projectId });
  if (!project) {
    next(createCustomError(`No task with id : ${projectId}`, 404));
  }
  return res.status(200).json({ project });
});

const createProject = tryCatch(async (req, res, next) => {
  const { projectTitle } = req.body;
  const userId = req.user;

  const createProject = new Project({
    user: userId,
    projectTitle: projectTitle,
  });
  await createProject.save();
  return res.status(201).json({ message: "successfully created project" });
});

const updateProject = tryCatch(async (req, res, next) => {
  const { id: projectId } = req.params;
  const project = await Project.findOneAndUpdate({ _id: projectId }, req.body, {
    new: true,
    runValidators: true,
  });
  if (!project) {
    return next(createCustomError(`No task with id : ${projectId}`, 404));
  }
  return res.status(200).json({ project });
});

const deleteProject = tryCatch(async (req, res, next) => {
  const { id: projectId } = req.params;
  const project = await Project.findOneAndDelete({ _id: projectId });
  if (!project) {
    next(createCustomError((`No task with id : ${projectId}`, 404)));
  }
  return res.status(201).json({ project });
});
module.exports = {
  getAllProject,
  getSingleProject,
  createProject,
  deleteProject,
  updateProject,
};
