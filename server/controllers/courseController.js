import Course from "../models/courseModel.js";
import createError from "../utils/errorHandler.js";
import User from "../models/usersModel.js";
import cloudinary from "cloudinary";
import dotenv from "dotenv";

dotenv.config();

// to create a new course, =>/api/courses/admin/new
export const createCourse = async (req, res, next) => {
  try {
    const newCourse = new Course({
      ...req.body,
      author: req.user.id,
    });

    if (req.file) {
      cloudinary.v2.config({
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET,
        secure: true,
      });

      const { public_id, secure_url } = await cloudinary.v2.uploader.upload(
        req.file.path,
        {
          folder: "RisingStarAcademy/CourseImages",
        }
      );

      newCourse.image = { url: secure_url, public_id: public_id };
    }

    const course = await newCourse.save();

    res.status(201).json({
      success: true,
      message: "Course Created Successfully",
      course,
    });
  } catch (error) {
    next(error);
  }
};

// fetch a single course => /api/courses/single/:id everybody

export const getSingleCourse = async (req, res, next) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) {
      return next(createError(400, "No course found"));
    }

    res.status(200).json({
      success: true,
      course,
    });
  } catch (error) {
    next(error);
  }
};

// to get all courses =>/api/courses/all everybody
export const getAllCourses = async (req, res, next) => {
  try {
    const courses = await Course.find();

    res.status(200).json({
      success: true,
      courses,
    });
  } catch (error) {
    next(error);
  }
};

// to update a course (admin) =>/api/courses/admin/update/:id

export const updateCourse = async (req, res, next) => {
  try {
    let course = await Course.findById(req.params.id);
    if (!course) {
      return next(createError(404, "No course found"));
    }
    // if there is a file i.e. if we are updating the image of the course, we will firstly check if there is a
    // image with the course, if there is we would firstly delete, then upload to cloudinary

    if (req.file) {
      if (course.image.public_id) {
        const { result } = await cloudinary.v2.uploader.destroy(
          course.image.public_id
        );
        if (result !== "ok") {
          return next(createError(400, "Could not remove image from cloud"));
        }
      }
      // else, we upload to cloudinary
      const { public_id, secure_url } = await cloudinary.v2.uploader.upload(
        req.file.path,
        {
          folder: "RisingStarAcademy/CourseImages",
        }
      );

      req.body.image = { public_id, url: secure_url };
    }

    course = await Course.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "Updated Successfully",
      course,
    });
  } catch (error) {
    next(error);
  }
};

// to delete a course (admin) =>/api/courses/delete/:id
export const deleteCourse = async (req, res, next) => {
  try {
    let course = await Course.findById(req.params.id);
    if (!course) {
      return next(createError(404, "No course found"));
    }

    if (course.image?.public_id) {
      cloudinary.v2.config({
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET,
        secure: true,
      });
      const { result } = await cloudinary.v2.uploader.destroy(
        course.image.public_id
      );
      if (result !== "ok") {
        return next(createError(400, "Could not remove image from cloud"));
      }
    }

    course = await Course.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Deleted Successfully",
    });
  } catch (error) {
    next(error);
  }
};

// to enroll for a course =>/api/courses/enroll/:id
export const enrollCourse = async (req, res, next) => {
  try {
    // firstly we get the user that is enrolling for the course
    let user = await User.findById(req.user.id);
    if (!user) {
      return next(createError(400, "No User Found"));
    }

    let course = await Course.findById(req.params.id);
    if (!course) {
      return next(createError(400, "No Course Found"));
    }

    // we then update the user by adding the id of the course the user is enrolling for to the user courses
    user = await User.findByIdAndUpdate(req.user.id, {
      $push: { myCourses: course._id },
    });

    // we also want to know which user or how many user has enrolled for a course, so therefore we would add the
    // user_id to the courses enrolledUsers array
    course = await Course.findByIdAndUpdate(req.params.id, {
      $push: { enrolledUsers: user._id },
    });

    res.status(200).json({
      success: true,
      message: "Enrolled successfully",
      user,
      course,
    });
  } catch (error) {
    next(error);
  }
};

// to unenroll a course =>/api/courses/unenroll/:id
export const unEnrollCourse = async (req, res, next) => {
  try {
    // to unenroll for a course all we need to do is to remove the id of the course from the myCourses array
    // in the user schema

    // so we firstly find the user trying to unenroll
    let user = await User.findById(req.user.id);
    if (!user) {
      return next(createError(400, "No User Found"));
    }

    // we find the course we are trying to unenroll from also
    let course = await Course.findById(req.params.id);
    if (!course) {
      return next(createError(400, "No Course Found"));
    }

    // we can check firstly if the user is even enrolled for the course i.e. if the course id is in the user
    // myCourses array
    const checkCourse = user.myCourses.find((id) => id === course._id);
    if (!checkCourse) {
      return next(createError(400, "You are not enrolled for this course"));
    }

    user = await User.findByIdAndUpdate(req.user.id, {
      $pull: { myCourses: course._id },
    });

    course = await Course.findByIdAndUpdate(req.params.id, {
      $pull: { enrolledUsers: user._id },
    });

    res.status(200).json({
      success: true,
      message: "Unenrolled Successfully",
      user,
      course,
    });
  } catch (error) {
    next(error);
  }
};

// to get all my courses i.e courses created as a tutor =>/api/courses/tutor-courses
export const getAllTutorCourses = async (req, res, next) => {
  try {
    const courses = await Course.find({ author: req.user.id });

    res.status(200).json({
      success: true,
      courses,
    });
  } catch (error) {
    next(error);
  }
};

export const getMyCourses = async (req, res, next) => {
  try {
    const courses = await Course.find({ author: req.user.id });

    res.status(200).json({
      success: true,
      courses,
    });
  } catch (error) {
    next(error);
  }
};

// to get all enrolled students in a course => /api/courses/enrolled-students/:id
export const getAllEnrolledStudents = async (req, res, next) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) return next(createError(400, "No course found"));

    const getAllStudents = await course.enrolledUsers.find();

    res.status(200).json({
      success: true,
      getAllStudents,
    });

    // another logic that can be done is on the front end after getting or fetching a single course,
    // in the array of enrolled users, we map over in getting us each id of the enrolled student, then
    // we pass each id into a component,  were we now fetch each user details by id.
  } catch (error) {
    next(error);
  }
};

// get latest courses
export const latestCourses = async (req, res, next) => {
  try {
    const courses = await Course.find().sort({ _id: -1 }).limit(6);

    res.status(200).json({
      success: true,
      courses,
    });
  } catch (error) {
    next(error);
  }
};
