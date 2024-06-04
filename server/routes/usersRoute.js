import express from "express";
import {
  getProfile,
  updateProfile,
  updatePassword,
  uploadAvatar,
  getAllUsers,
  getSingleUser,
  updateUser,
  getUsersStats,
  deleteUser,
} from "../controllers/userController.js";
import {
  authorizedRoles,
  verifyToken,
  verifyTutor,
} from "../utils/verifyUser.js";
import { uploadImage } from "../middlewares/multer.js";

const router = express.Router();

router.get("/my-profile", verifyToken, getProfile),
  router.put("/update-profile", verifyToken, updateProfile);
router.put("/update-password", verifyToken, updatePassword);
router.put(
  "/avatar-upload",
  verifyToken,
  uploadImage.single("image", 1),
  uploadAvatar
);

router.get(
  "/admin/all",
  verifyTutor,
  authorizedRoles("admin", "tutor"),
  getAllUsers
);
router.get(
  "/admin/user/:id",
  verifyTutor,
  authorizedRoles("admin"),
  getSingleUser
);
router.put(
  "/admin/update/:id",
  verifyTutor,
  authorizedRoles("admin"),
  updateUser
);
router.delete(
  "/admin/delete/:id",
  verifyTutor,
  authorizedRoles("admin"),
  deleteUser
);
router.get(
  "/admin/user-stats",
  verifyTutor,
  authorizedRoles("admin"),
  getUsersStats
);

export default router;
