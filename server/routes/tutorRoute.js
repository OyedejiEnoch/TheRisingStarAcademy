import express from "express";
import {
  getProfile,
  updateProfile,
  getAllTutors,
  updatePassword,
  uploadAvatar,
  getSingleTutor,
  updateTutor,
  deleteTutor,
} from "../controllers/tutorProfileController.js";
import { authorizedRoles, verifyTutor } from "../utils/verifyUser.js";

const router = express.Router();

router.get("/my-profile", verifyTutor, getProfile),
  router.get("/update-avatar", verifyTutor, uploadAvatar),
  router.get("/update-password", verifyTutor, updatePassword),
  router.put("/update-profile", verifyTutor, updateProfile);
router.get("/admin/tutors", verifyTutor, getAllTutors),
  router.get("/tutor/:id", getSingleTutor),
  router.get("/admin/tutor/:id", verifyTutor, getSingleTutor),
  router.put("/admin/tutor/:id", verifyTutor, updateTutor),
  router.delete("/admin/tutor/:id", verifyTutor, deleteTutor);

export default router;
