const mongoose = require("mongoose");

const ProjectSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "Users" },
  projectTitle: {
    type: "string",
    required: [true, "Must provide a title for the task"],
    maxlength: [16, "title must not exceed 16 characters"],
  },
});

module.exports = mongoose.model("Project", ProjectSchema);
