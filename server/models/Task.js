const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "Users" },
  project: { type: mongoose.Schema.Types.ObjectId, ref: "Project" },
  title: {
    type: "string",
    required: [true, "Must provide a title for the task"],
    maxlength: [24, "title must not exceed 24 characters"],
  },
  name: {
    type: String,
  },
  completed: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("Task", TaskSchema);
