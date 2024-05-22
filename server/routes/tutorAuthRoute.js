import express from "express";
import {
  registerTutor,
  loginTutor,
  googleSignIn,
} from "../controllers/tutorController.js";

const router = express.Router();

router.post("/register", registerTutor);
router.post("/login", loginTutor);
router.post("/forgot-password", googleSignIn);

export default router;
