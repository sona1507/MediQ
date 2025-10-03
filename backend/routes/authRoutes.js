import express from "express";
import { registerUser, loginUser } from "../controllers/authController.js";

const router = express.Router();

// ✅ Register a new user
router.post("/register", registerUser);

// ✅ Login existing user
router.post("/login", loginUser);

// ✅ (Optional) Logout route — clears session or token
router.post("/logout", (req, res) => {
  // If using sessions or cookies, clear them here
  res.status(200).json({ success: true, message: "Logged out successfully" });
});

export default router;
