// import express
import express from "express";

// import code file
import protectRoute from "../middleware/protectRoute.js";
import {
  moveTasks,
  autoMoveTaks,
  getPrimaryDoneTasks,
  getSecondaryDoneTasks,
  getSelectedDone,
  deleteSelectedDone,
} from "../controllers/donecontroller.js";

// router setup
const router = express.Router();

// router api

router.put("/move/:id", protectRoute, moveTasks);
router.put("/automove", protectRoute, autoMoveTaks);
router.get("/primary/task", protectRoute, getPrimaryDoneTasks);
router.get("/secondary/task", protectRoute, getSecondaryDoneTasks);
router.get("/:id", protectRoute, getSelectedDone);
router.delete("/delete/:id", protectRoute, deleteSelectedDone);

export default router;
