import User from "../models/usersModel.js";
import createError from "../utils/errorHandler.js";
import cloudinary from "cloudinary";

// to get my profile => /api/users/my-profile
export const getProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return next(createError(404, "No your found"));
    }

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    next(error);
  }
};

// to update my profile => /api/users/update-profile
export const updateProfile = async (req, res, next) => {
  const updateData = {
    name: req.body.name,
    email: req.body.email,
  };
  try {
    const user = await User.findByIdAndUpdate(
      req.user.id,
      { $set: updateData },
      { new: true }
    );

    res.status(200).json({
      success: true,
      user,
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

    let user = await User.findById(req.user.id);
    if (!user) {
      return next(createError(404, "No your found"));
    }

    // in uploading an avatar there is a possibility that there could have being a previous avatar
    // so we will firstly delete the previous avatar then upload the new one
    if (req.file) {
      if (user.avatar?.public_id) {
        await cloudinary.v2.uploader.destroy(user.avatar?.public_id);
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

    user = await User.findByIdAndUpdate(
      req.user.id,
      {
        $set: req.body,
      },
      { new: true }
    );

    res.status(201).json({
      success: true,
      message: "Uploaded Successfully",
      user,
    });
  } catch (error) {
    next(error);
  }
};

// update password => /api/users/update-password
export const updatePassword = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return next(createError(404, "No your found"));
    }

    // there would be two inputs, previous password and the new password
    // we would firstly check if the previous password matched the old password in the DB
    const checkPrePassword = await user.comparePassword(req.body.oldPassword);
    if (!checkPrePassword) {
      return next(createError(400, "Password doesn't match previous password"));
    }

    if (req.body.newPassword !== req.body.confirmPassword) {
      return next(
        createError(400, "New password & Confirm password do not match")
      );
    }

    // if it matches, we can then replace the old password with the password
    user.password = req.body.newPassword;
    await user.save();
    // then we attach a new token to the user and re-sign the user with a new cookie

    const token = Jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_TIME,
    });

    const { password, ...userDetails } = user._doc;

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
export const getAllUsers = async (req, res, next) => {
  try {
    const allUsers = await User.find();
    const totalUsers = await User.countDocuments();
    res.status(200).json({
      success: true,
      totalUsers,
      allUsers,
    });
  } catch (error) {
    next(error);
  }
};

export const getSingleUser = async (req, res, next) => {
  try {
    const singleUser = await User.findById(req.params.id);
    if (!singleUser) {
      return next(createError(404, "No user found"));
    }

    res.status(200).json({
      success: true,
      singleUser,
    });
  } catch (error) {
    next(error);
  }
};

// to update user
export const updateUser = async (req, res, next) => {
  const userData = {
    name: req.body.name,
    email: req.body.email,
    role: req.body.role,
  };

  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { $set: userData },
      { new: true }
    );

    res.status(200).json({
      success: true,
      user,
      message: "Updated Successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return next(createError(400, "User not found"));
    }

    if (user.avatar?.public_id) {
      await cloudinary.v2.uploader.destroy(user.avatar?.public_id);
    }

    await user.deleteOne();
    res.status(200).json({
      success: true,
      message: "Deleted Successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const getUsersStats = async (req, res, next) => {
  try {
    const data = await User.aggregate([
      {
        $project: {
          month: { $month: `$createdAt` },
          year: { $year: `$createdAt` },
          // check the month using createdAt
        },
      },
      {
        $group: {
          _id: "$month",
          total: { $sum: 1 },
          // what we want it to return
        },
      },
    ]);

    res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    next(error);
  }
};
