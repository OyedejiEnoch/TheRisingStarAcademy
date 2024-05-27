import express from "express";
import {
  createCourse,
  getAllCourses,
  getSingleCourse,
  updateCourse,
  deleteCourse,
  enrollCourse,
  unEnrollCourse,
  latestCourses,
  getAllTutorCourses,
  getMyCourses,
} from "../controllers/courseController.js";
import {
  authorizedRoles,
  verifyToken,
  verifyTutor,
} from "../utils/verifyUser.js";
import { uploadImage } from "../middlewares/multer.js";

const router = express.Router();

router.post(
  "/admin/new",
  verifyTutor,
  authorizedRoles("admin", "tutor"),
  uploadImage.single("image"),
  createCourse
),
  router.get("/all", getAllCourses),
  router.get(
    "/admin/my-courses",
    verifyTutor,
    authorizedRoles("admin", "tutor"),
    getAllTutorCourses
  ),
  router.get("/single/:id", getSingleCourse);
router.put(
  "/admin/update/:id",
  verifyTutor,
  authorizedRoles("admin", "tutor"),
  uploadImage.single("image"),
  updateCourse
),
  router.delete(
    "/admin/delete/:id",
    verifyTutor,
    authorizedRoles("admin", "tutor"),
    deleteCourse
  ),
  router.put("/enroll/:id", enrollCourse),
  router.put("/unenroll/:id", unEnrollCourse);

router.get("/all/latest", latestCourses);

router.get("/admin/personal-courses", verifyTutor, getMyCourses);

export default router;
