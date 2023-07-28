const mongoose = require("mongoose");
const Task = require("./Task");

const ProjectSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "Users" },
  projectTitle: {
    type: String,
    required: [true, "Must provide a title for the task"],
    maxlength: [16, "Title must not exceed 16 characters"],
  },
});

module.exports = mongoose.model("Project", ProjectSchema);
