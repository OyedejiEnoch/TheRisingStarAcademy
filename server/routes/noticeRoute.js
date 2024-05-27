import express from "express";
import {
  newNotice,
  allNotice,
  singleNotice,
  latestNotice,
  deleteNotice,
} from "../controllers/noticeController.js";
import { verifyTutor } from "../utils/verifyUser.js";

const router = express.Router();

router.post("/new", verifyTutor, newNotice);
router.get("/all", allNotice);
router.get("/:id", singleNotice);
router.get("/latest", latestNotice);
router.get("/delete/:id", deleteNotice);

export default router;
