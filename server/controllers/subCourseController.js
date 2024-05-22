import SubCourse from "../models/subCourseModel.js";
import Course from "../models/courseModel.js";
import createError from "../utils/errorHandler.js";
import cloudinary from "cloudinary";

// to create a subCourse and add to its main course =>/api/sub-course/new/:courseId
export const createSubCourse = async (req, res, next) => {
  try {
    const mainCourse = req.params.courseId;

    // firstly create the sub course
    const course = new SubCourse({
      ...req.body,
      author: req.user.id,
      mainCourse: mainCourse,
    });

    if (req.file) {
      const { public_id, secure_url } = await cloudinary.v2.uploader.upload(
        req.file.path,
        {
          folder: "RisingStarAcademy/CourseImages",
        }
      );

      course.image = { public_id, url: secure_url };
    }

    await course.save();

    // then attach the course to the main course
    await Course.findByIdAndUpdate(mainCourse, {
      $push: { subCourses: course._id },
    });

    res.status(200).json({
      success: true,
      message: "Sub Course created successfully",
      course,
    });
  } catch (error) {
    next(error);
  }
};

// to get a subCourse =>/api/sub-course/single/:id
export const getSingleSubCourse = async (req, res, next) => {
  try {
    const course = await SubCourse.findById(req.params.id);
    if (!course) {
      return next(createError(404, "No course found"));
    }

    res.status(200).json({
      success: true,
      course,
    });
  } catch (error) {
    next(error);
  }
};

// to get all courses =>/api/sub-courses/admin/all everybody
export const getAllSubCourses = async (req, res, next) => {
  try {
    const courses = await SubCourse.find();

    res.status(200).json({
      success: true,
      courses,
    });
  } catch (error) {
    next(error);
  }
};

export const updateCourse = async (req, res, next) => {
  try {
    let course = await SubCourse.findById(req.params.id);
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

    course = await SubCourse.findByIdAndUpdate(
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

// to delete a course (admin) =>/api/sub-courses/delete/:courseId/:id
export const deleteCourse = async (req, res, next) => {
  const mainCourse = req.params.courseId;
  try {
    let course = await SubCourse.findById(req.params.id);
    if (!course) {
      return next(createError(404, "No course found"));
    }

    if (course.image.public_id) {
      const { result } = await cloudinary.v2.uploader.destroy(
        course.image.public_id
      );
      if (result !== "ok") {
        return next(createError(400, "Could not remove image from cloud"));
      }
    }
    //   we remove the subCourse from the main course
    await Course.findById(mainCourse, { $pull: { subCourses: course._id } });

    course = await SubCourse.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Deleted Successfully",
    });
  } catch (error) {
    next(error);
  }
};

// to find all courses with a particular main course id i.e this shows these sets of courses are under a particular
// main course
export const findAllCourses = async (req, res, next) => {
  try {
    const allCourses = await SubCourse.find({ mainCourse: req.params.id });

    res.status(200).json({
      success: true,
      allCourses,
    });
  } catch (error) {
    next(error);
  }
};
