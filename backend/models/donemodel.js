// import mongoose
import mongoose from "mongoose";

const doneSchema = new mongoose.Schema({
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  title: {
    type: String,
    required: true,
    maxLength: 26,
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
  completedAt: {
    type: Date,
    default: Date.now,
  },
});

const Done = mongoose.model("Done", doneSchema);

export default Done;
