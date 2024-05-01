// import mongoose
import mongoose from "mongoose";

const TaskSchema = mongoose.Schema({
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  title: {
    type: String,
    required: true,
    maxLength: 40,
  },
  description: {
    type: String,
    required: true,
    maxLength: 1200,
  },
  category: {
    type: String,
    enum: ["Primary", "Secondary"],
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  dueDate: {
    type: Date,
    required: true,
  },
});

const Task = mongoose.model("Task", TaskSchema);

export default Task;
