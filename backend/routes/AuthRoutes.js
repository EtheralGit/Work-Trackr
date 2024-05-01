// imoprt express
import express from "express";

// import controllers
import { signup, login, logout } from "../controllers/authcontroller.js";

// router setup
const router = express.Router();

// router api
router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);

export default router;
