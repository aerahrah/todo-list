const mongoose = require("mongoose");

const ProjectSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "Users" },
  projectTitle: {
    type: "string",
    maxlength: [24, "title must not exceed 24 characters"],
  },
});

module.exports = mongoose.model("Project", ProjectSchema);
