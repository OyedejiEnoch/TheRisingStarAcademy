import express from "express";
import {
  createUser,
  loginUser,
  googleLogin,
  forgotPassword,
  resetPassword,
  logOut,
} from "../controllers/authController.js";

const router = express.Router();

router.post("/register", createUser);
router.post("/login", loginUser);
router.post("/logout", logOut);
router.post("/google", googleLogin);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);

export default router;
