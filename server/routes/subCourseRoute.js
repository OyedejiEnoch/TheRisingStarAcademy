import express from "express";
import {
  createSubCourse,
  getAllSubCourses,
  getSingleSubCourse,
  updateCourse,
  deleteCourse,
  findAllCourses,
} from "../controllers/subCourseController.js";
import { authorizedRoles, verifyTutor } from "../utils/verifyUser.js";
import { uploadImage } from "../middlewares/multer.js";

const router = express.Router();

router.post(
  "/admin/new/:courseId",
  verifyTutor,
  authorizedRoles("admin", "tutor"),
  uploadImage.single("image"),
  createSubCourse
),
  router.get("/all", getAllSubCourses),
  router.get("/single/:id", getSingleSubCourse),
  router.put(
    "/admin/update/:id",
    verifyTutor,
    authorizedRoles("admin", "tutor"),
    uploadImage.single("image"),
    updateCourse
  ),
  router.delete(
    "/admin/delete/:courseId/:id",
    verifyTutor,
    authorizedRoles("admin", "tutor"),
    deleteCourse
  );
router.get("/subCourses/:id", findAllCourses);

export default router;
