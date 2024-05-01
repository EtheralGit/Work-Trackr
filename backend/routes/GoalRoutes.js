// import express
import express from "express";

// import coding file
import protectRoute from "../middleware/protectRoute.js";
import {
  createGoal,
  deleteGoal,
  getAllGoals,
  getSelectedGoal,
} from "../controllers/goalcontroller.js";

// router setup
const router = express.Router();

// router api
router.post("/create", protectRoute, createGoal);
router.get("/user", protectRoute, getAllGoals);
router.get("/:id", protectRoute, getSelectedGoal);
router.delete("/delete/:id", protectRoute, deleteGoal);

export default router;
