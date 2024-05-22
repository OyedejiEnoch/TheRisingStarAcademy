import tutorModel from "../models/tutorModel.js";
import Tutor from "../models/tutorModel.js";
import createError from "../utils/errorHandler.js";
import cloudinary from "cloudinary";

export const getProfile = async (req, res, next) => {
  try {
    const tutor = await Tutor.findById(req.user.id);
    if (!tutor) {
      return next(createError(404, "No your found"));
    }

    res.status(200).json({
      success: true,
      tutor,
    });
  } catch (error) {
    next(error);
  }
};

export const updateProfile = async (req, res, next) => {
  const updateData = {
    name: req.body.name,
    email: req.body.email,
    phoneNo: req.body.phoneNo,
    bio: req.body.bio,
    profession: req.body.profession,
    course: req.body.course,
  };
  try {
    const tutor = await Tutor.findByIdAndUpdate(
      req.user.id,
      { $set: updateData },
      { new: true }
    );

    res.status(200).json({
      success: true,
      tutor,
    });
  } catch (error) {
    next(error);
  }
};

// upload avatar => /api/users/avatar-upload
export const uploadAvatar = async (req, res, next) => {
  try {
    if (!req.file) {
      return next(createError(400, "No file uploaded"));
    }

    let tutor = await Tutor.findById(req.user.id);
    if (!tutor) {
      return next(createError(404, "No your tutor found"));
    }

    // in uploading an avatar there is a possibility that there could have being a previous avatar
    // so we will firstly delete the previous avatar then upload the new one
    if (req.file) {
      if (tutor.avatar?.public_id) {
        await cloudinary.v2.uploader.destroy(tutor.avatar?.public_id);
      }
      //   after deleting the previous avatar, we upload the new one
      const { public_id, secure_url } = await cloudinary.v2.uploader.upload(
        req.file.path,
        {
          folder: "RisingStarAcademy/UsersAvatars",
          width: 500,
          height: 500,
          gravity: "face",
          crop: "thumb",
        }
      );

      req.body.avatar = { public_id, url: secure_url };
    }

    tutor = await Tutor.findByIdAndUpdate(
      req.user.id,
      {
        $set: req.body,
      },
      { new: true }
    );

    res.status(201).json({
      success: true,
      message: "Uploaded Successfully",
      tutor,
    });
  } catch (error) {
    next(error);
  }
};

export const updatePassword = async (req, res, next) => {
  try {
    const tutor = await Tutor.findById(req.user.id);
    if (!tutor) {
      return next(createError(404, "No your found"));
    }

    // there would be two inputs, previous password and the new password
    // we would firstly check if the previous password matched the old password in the DB
    const checkPrePassword = await tutor.comparePassword(req.body.oldPassword);
    if (!checkPrePassword) {
      return next(createError(400, "Password doesn't match previous password"));
    }

    if (req.body.newPassword !== req.body.confirmPassword) {
      return next(
        createError(400, "New password & Confirm password do not match")
      );
    }

    // if it matches, we can then replace the old password with the password
    tutor.password = req.body.newPassword;
    await tutorModel.save();
    // then we attach a new token to the user and re-sign the user with a new cookie

    const token = Jwt.sign({ id: tutor._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_TIME,
    });

    const { password, ...userDetails } = tutor._doc;

    res
      .cookie("accessToken", token, {
        httpOnly: true,
        expires: new Date(
          Date.now() + process.env.COOKIE_EXPIRES_TIME * 24 * 60 * 60 * 1000
        ),
      })
      .status(201)
      .json({
        success: true,
        userDetails,
        token,
      });
  } catch (error) {
    next(error);
  }
};

// admin
// get all users =>/api/users/admin/all
export const getAllTutors = async (req, res, next) => {
  try {
    const allTutors = await Tutor.find();
    const totalTutors = await Tutor.countDocuments();
    res.status(200).json({
      success: true,
      totalTutors,
      allTutors,
    });
  } catch (error) {
    next(error);
  }
};

export const getSingleTutor = async (req, res, next) => {
  try {
    const singleTutor = await Tutor.findById(req.params.id);
    if (!singleTutor) {
      return next(createError(404, "No Tutor found"));
    }

    res.status(200).json({
      success: true,
      singleTutor,
    });
  } catch (error) {
    next(error);
  }
};

// to update user
export const updateTutor = async (req, res, next) => {
  const tutorData = {
    name: req.body.name,
    email: req.body.email,
    role: req.body.role,
  };

  try {
    const tutor = await Tutor.findByIdAndUpdate(
      req.params.id,
      { $set: tutorData },
      { new: true }
    );

    res.status(200).json({
      success: true,
      tutor,
      message: "Updated Successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const deleteTutor = async (req, res, next) => {
  try {
    const tutor = await Tutor.findById(req.params.id);
    if (!tutor) {
      return next(createError(400, "Tutor not found"));
    }

    if (tutor.avatar?.public_id) {
      await cloudinary.v2.uploader.destroy(tutor.avatar?.public_id);
    }

    await tutor.deleteOne();
    res.status(200).json({
      success: true,
      message: "Deleted Successfully",
    });
  } catch (error) {
    next(error);
  }
};
