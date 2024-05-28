import User from "../models/usersModel.js";
import ForgotPasswordModel from "../models/forgotPasswordModel.js";
import crypto from "crypto";
import sendEmail from "../utils/sendEmail.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import createError from "../utils/errorHandler.js";
import { isValidObjectId } from "mongoose";

// to create a new user => /api/auth/register
export const createUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    const user = await User.create({
      name,
      email,
      password,
    });

    // attach a token to the user and assign to the cookies

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_TIME,
    });

    const { password: Password, ...userDetails } = user._doc;

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
        message: "User created successfully",
        userDetails,
        token,
      });

    // const hashPassword = await bcryptjs.hash(req.body.password, 10)

    // const newUser = new User({
    //     ...req.body,
    //     password:hashPassword
    // });
  } catch (error) {
    next(error);
  }
};

// to login a user => /api/auth/login

export const loginUser = async (req, res, next) => {
  try {
    if (!req.body.email || !req.body.password) {
      return next(createError(400, "Please enter email & password"));
    }

    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      return next(createError(404, "No user found"));
    }
    // if there is a user, then we compare password

    const comparePassword = await user.comparePassword(req.body.password);
    if (!comparePassword) {
      return next(createError(404, "Invalid email or password"));
    }

    // if password is valid then we send or login the user
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_TIME,
    });

    const { password: Password, ...userDetails } = user._doc;

    res
      .cookie("accessToken", token, {
        httpOnly: true,
        expires: new Date(
          Date.now() + process.env.COOKIE_EXPIRES_TIME * 24 * 60 * 60 * 1000
        ),
      })
      .status(200)
      .json({
        success: true,
        message: "logged in successfully",
        userDetails,
        token,
      });
  } catch (error) {
    next(error);
  }
};

// google login => /api/auth/google-login

export const googleLogin = async (req, res, next) => {
  try {
    // firstly check if a user with the email exist as google logins in with email
    const user = await User.findOne({ email: req.body.email });
    // if there is a user we login the user, else we create a new user
    if (user) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
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
        .status(200)
        .json({
          success: true,
          message: "logged in successfully",
          userDetails,
          token,
        });
    } else {
      // if no user we create a new user
      // firstly we generate a password for the user
      const generatePassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);

      // then we create the user
      const user = await User.create({
        name: req.body.name.split(" ").join("").toLowerCase(),
        email: req.body.email,
        password: generatePassword,
      });

      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
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
        .status(200)
        .json({
          success: true,
          message: "logged in successfully",
          userDetails,
          token,
        });
    }
  } catch (error) {
    next(error);
  }
};

// forgot password => /api/auth/forgot-password
export const forgotPassword = async (req, res, next) => {
  try {
    // firstly find the user by the input email
    const user = await User.findOne({ email: req.body.email });
    if (!user) return next(createError(404, "No user found"));

    // if email exist, check if there is a forgot password token already for the user
    const checkToken = await ForgotPasswordModel.findOne({ owner: user._id });
    if (checkToken) {
      return next(
        createError(400, "You can only request for a new OTP after an hour")
      );
    }

    // if there is none, then we create the token
    const resetToken = crypto.randomBytes(20).toString("hex");

    const createForgotPassword = new ForgotPasswordModel({
      owner: user._id,
      token: resetToken,
    });

    await createForgotPassword.save();

    //   finally we have created the forgotPassword token, then we send the mail
    // firstly we create the reset link we want to send the mail

    const resetLink = `http://localhost:5173/auth/reset-password?token=${resetToken}&id=${user._id}`;

    const transport = sendEmail();
    const message = {
      from: "noreply@runorder.store",
      to: user.email,
      subject: "Reset password link",
      html: `<h2>Click this link to change your password </h2>
                <p>${resetLink}</p>
                `,
    };

    await transport.sendMail(message);

    res.status(200).json({
      success: true,
      message: `Reset password link has being sent to ${user.email}`,
    });
  } catch (error) {
    next(error);
  }
};

// reset password => /api/auth/reset-password
export const resetPassword = async (req, res, next) => {
  try {
    // firstly we will check if the id of the user is valid
    if (!isValidObjectId(req.body.userId)) {
      return next(createError(404, "Invalid User"));
    }

    // we would check if there is a forgotPassword token attached for the user
    const checkToken = await ForgotPasswordModel.findOne({
      owner: req.body.userId,
    });
    if (!checkToken) {
      return next(createError(400, "Token/OTP Expired"));
    }

    // if there is a token we want to compare the token
    const compareToken = await checkToken.compareToken(req.body.token);
    if (!compareToken) return next(createError(400, "Invalid Token"));

    // if there is a token and the token is valid, we then find the user so as to update the password
    const user = await User.findById(req.body.userId);
    if (!user) {
      return next(createError(400, "Invalid user"));
    }

    // then we check if the new password is not equal to the previous password
    const isMatched = await user.comparePassword(req.body.newPassword);
    if (isMatched)
      return next(
        createError(
          400,
          "New password must be different from previous password"
        )
      );

    // if they are different i.e. not matched, we will then check if the new password is and confirm password are the
    // same
    if (req.body.newPassword !== req.body.confirmPassword) {
      return next(createError(400, "Passwords do not match"));
    }

    // if at last they match, we then update the user password
    user.password = req.body.newPassword;

    // finally we save the password and send a mail
    await user.save();

    const transport = sendEmail();

    const message = {
      from: "noreply@runorder.store",
      to: user.email,
      subject: "Password Reset Successfully",
      html: `<h2>Password reset successful </h2>

      `,
    };

    await transport.sendEmail(message);

    res.status(201).json({
      success: true,
      message: "Password reset successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const logOut = async (req, res, next) => {
  try {
    res.cookie("accessToken", null, {
      httpOnly: true,
      expires: new Date(Date.now()),
    });

    res.status(200).json({
      success: true,
      message: "Logged out successfully",
    });

    // res.clearCookie("accessToken").status(200).json({
    //   success: true,
    //   message: "Logged out successfully",
    // })
  } catch (err) {
    next(err);
  }
};
