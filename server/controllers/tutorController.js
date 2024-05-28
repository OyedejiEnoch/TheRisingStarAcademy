import Tutor from "../models/tutorModel.js";
import jwt from "jsonwebtoken";
import createError from "../utils/errorHandler.js";
import ForgotPasswordModel from "../models/forgotPasswordModel.js";
import crypto from "crypto";
import sendEmail from "../utils/sendEmail.js";

export const registerTutor = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const newTutor = await Tutor.create({
      name,
      email,
      password,
    });

    const token = jwt.sign({ id: newTutor._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_TIME,
    });

    const { password: Password, ...tutorDetails } = newTutor._doc;

    // const transport = sendEmail();
    // const message = {
    //   from: "noreply@runorder.store",
    //   to: user.email,
    //   subject: "Registering as a Facilitator",
    //   html: `<h2>Congratulations on Joining The Rising Star Academy as A Facilitator </h2>
    //             `,
    // };

    // await transport.sendMail(message);

    res
      .cookie("accessToken", token, {
        httpOnly: true,
        expires: new Date(
          Date.now() + process.env.COOKIE_EXPIRES_TIME * 24 * 60 * 60 * 1000
        ),
        sameSite: "None",
        secure: true,
      })
      .status(201)
      .json({
        success: true,
        message: "Registered Successfully",
        tutorDetails,
        token,
      });
  } catch (error) {
    next(error);
  }
};

// to login a tutor
export const loginTutor = async (req, res, next) => {
  try {
    if (!req.body.email || !req.body.password) {
      return next(createError(401, "Input Email & Password"));
    }

    const tutor = await Tutor.findOne({ email: req.body.email });
    if (!tutor) {
      return next(createError(404, "No user found"));
    }
    // if there is a tutor with that email, we check if the password is correct
    const checkPassword = await tutor.comparePassword(req.body.password);
    if (!checkPassword) {
      return next(createError(401, "Invalid email or password"));
    }
    // and if everything is right, we login the user

    const token = jwt.sign({ id: tutor._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_TIME,
    });

    const { password: Password, ...tutorDetails } = tutor._doc;

    res
      .cookie("accessToken", token, {
        httpOnly: true,
        expires: new Date(
          Date.now() + process.env.COOKIE_EXPIRES_TIME * 24 * 60 * 60 * 1000
        ),
        sameSite: "None",
        secure: true,
      })
      .status(201)
      .json({
        success: true,
        message: "Logged in Successfully",
        tutorDetails,
        token,
      });
  } catch (error) {
    next(error);
  }
};

// to sign in with google
export const googleSignIn = async (req, res, next) => {
  try {
    // find the user
    const tutor = await Tutor.findOne({ email: req.body.email });

    // if there is a tutor, we sign the tutor in
    if (tutor) {
      const token = jwt.sign({ id: tutor._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_TIME,
      });

      const { password: Password, ...tutorDetails } = tutor._doc;

      res
        .cookie("accessToken", token, {
          httpOnly: true,
          expires: new Date(
            Date.now() + process.env.COOKIE_EXPIRES_TIME * 24 * 60 * 60 * 1000
          ),
          sameSite: "None",
          secure: true,
        })
        .status(201)
        .json({
          success: true,
          message: "Signed in Successfully",
          tutorDetails,
          token,
        });
    }

    // else if the tutor doesn't exist, we create a new tutor
    // we firstly generate a password for the tutor

    const generatePassword =
      Math.random().toString(36).slice(-8) +
      Math.random().toString(36).slice(-8);

    const newTutor = await Tutor.create({
      name: req.body.name.split(" ").join("").toLowerCase(),
      email: req.body.email,
      password: generatePassword,
    });

    const token = jwt.sign({ id: newTutor._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_TIME,
    });

    const { password: Password, ...tutorDetails } = newTutor._doc;

    res
      .cookie("accessToken", token, {
        httpOnly: true,
        expires: new Date(
          Date.now() + process.env.COOKIE_EXPIRES_TIME * 24 * 60 * 60 * 1000
        ),
        sameSite: "None",
        secure: true,
      })
      .status(201)
      .json({
        success: true,
        message: "Registered Successfully",
        tutorDetails,
        token,
      });
  } catch (error) {
    next(error);
  }
};

export const forgotPassword = async (req, res, next) => {
  try {
    // firstly the user has to input their email
    const tutor = await Tutor.findOne({ email: req.body.email });
    if (!tutor) {
      return next(createError(400, "No user found"));
    }

    // if there is a user with the email, we would check if the user had already requested for a forgotPassword earlier

    const checkToken = await ForgotPasswordModel.findOne({ owner: tutor._id });
    // if there is a token assigned for the user already, we tell them they can't get a new token now
    if (checkToken) {
      return next(
        createError(400, "You can only request for a new link after an hour")
      );
    }
    // if there is no forgotPassword token, we create a new one, with the user id

    const resetToken = crypto.randomBytes(20).toString("hex");

    const createForgotPassword = new ForgotPasswordModel({
      owner: tutor._id,
      token: resetToken,
    });

    await createForgotPassword.save();

    // then after creating our token, we create our reset link and send to the user
    const resetLink = `http://localhost:5173/auth/reset-password?token=${resetToken}&id=${user._id}`;

    const transport = sendEmail();
    const message = {
      from: "noreply@runorder.store",
      to: tutor.email,
      subject: "Reset password link",
      html: `<h2>Click this link to change your password </h2>
                <p>${resetLink}</p>
                `,
    };

    await transport.sendMail(message);

    res.status(200).json({
      success: true,
      message: `Reset password link has being sent to ${tutor.email}`,
    });
  } catch (error) {}
};

export const resetPassword = async (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
};
