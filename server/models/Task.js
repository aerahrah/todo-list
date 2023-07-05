const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
  title: {
    type: "string",
    required: [true, "must provide name"],
    maxlength: [24, "title must not exceed 24 characters"],
  },
  name: {
    type: String,
    required: [true, "must provide name"],
  },
  completed: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("Task", TaskSchema);
