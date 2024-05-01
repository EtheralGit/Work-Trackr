// import express
import express from "express";
// import middleware
import protectRoute from "../middleware/protectRoute.js";

// import all controllers file
import {
  getAllNotes,
  getSelectedNote,
  postNote,
  editNote,
  deleteNote,
} from "../controllers/notecontroller.js";

const router = express.Router();

router.post("/create", protectRoute, postNote);
router.get("/get", protectRoute, getAllNotes);
router.get("/:id", protectRoute, getSelectedNote);
router.put("/edit/:id", protectRoute, editNote);
router.delete("/delete/:id", protectRoute, deleteNote);

export default router;
