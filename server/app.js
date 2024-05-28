import express from "express";
import errorMiddleware from "./middlewares/error.js";
import cookieParser from "cookie-parser";
import authRoute from "./routes/authRoute.js";
import tutorAuthRoute from "./routes/tutorAuthRoute.js";
import tutorRoute from "./routes/tutorRoute.js";
import userRoute from "./routes/usersRoute.js";
import coursesRoute from "./routes/coursesRoute.js";
import subCoursesRoute from "./routes/subCourseRoute.js";
import noticeRoute from "./routes/noticeRoute.js";
import cors from "cors";

const app = express();
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:5174",
  "http://localhost:5175",
  "https://the-rising-star-academy.vercel.app",
  "https://the-rising-star-academy-dashboard-goz8.vercel.app",
];
app.use(
  cors({
    origin: function (origin, callback) {
      // Check if the origin is in the array of allowed origins
      if (!origin || allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(cookieParser());

app.use("/api/auth", authRoute);
app.use("/api/auth/tutor", tutorAuthRoute);
app.use("/api/users", userRoute);
app.use("/api/users/tutor", tutorRoute);
app.use("/api/courses", coursesRoute);
app.use("/api/sub-courses", subCoursesRoute);
app.use("/api/notice", noticeRoute);
app.use(errorMiddleware);

export default app;
