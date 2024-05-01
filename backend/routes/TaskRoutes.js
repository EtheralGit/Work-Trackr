// import express
import express from "express";
// import middleware
import protectRoute from "../middleware/protectRoute.js";
// import coding file
import {
  createTask,
  getPrimaryTask,
  getSecondaryTask,
  getSelectedTask,
} from "../controllers/taskcontroller.js";

// router setup
const router = express.Router();

// router api
router.post("/create", protectRoute, createTask);
router.get("/primary-task", protectRoute, getPrimaryTask);
router.get("/secondary-task", protectRoute, getSecondaryTask);
router.get("/:id", protectRoute, getSelectedTask);

export default router;
