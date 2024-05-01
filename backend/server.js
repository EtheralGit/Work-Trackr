// import npm file
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

const app = express();
// import coding file
import MongoConnect from "./db/MongoConnect.js";
import authRoutes from "./routes/AuthRoutes.js";
import TaskRoutes from "./routes/TaskRoutes.js";
import DoneRoutes from "./routes/DoneRoutes.js";
import NoteRoutes from "./routes/NoteRoutes.js";
import GoalRoutes from "./routes/GoalRoutes.js";

// server setup
const PORT = process.env.PORT || 8080;
dotenv.config();

// express
app.use(express.json());
app.use(cookieParser());

// api
app.use("/api/auth", authRoutes);
app.use("/api/task", TaskRoutes);
app.use("/api/done", DoneRoutes);
app.use("/api/note", NoteRoutes);
app.use("/api/goal", GoalRoutes);

// Server Listen
app.listen(PORT, () => {
  MongoConnect();
  console.log(`Server Running On Port ${PORT}`);
});
