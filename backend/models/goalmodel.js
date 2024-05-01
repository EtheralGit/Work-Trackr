// import mongoose
import mongoose from "mongoose";

const goalSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
    maxLength: 42,
  },
  text: {
    type: String,
    required: true,
    maxLength: 500,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  completedAt: {
    type: String,
    required: true,
  },
});

const Goal = mongoose.model("Goals", goalSchema);

export default Goal;
