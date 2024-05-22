import createError from "./errorHandler.js";
import User from "../models/usersModel.js";
import Tutor from "../models/tutorModel.js";
import jwt from "jsonwebtoken";

export const verifyToken = async (req, res, next) => {
  const token = req.cookies.accessToken;

  if (!token) {
    return next(createError(401, "Login first to access this resource"));
  }

  jwt.verify(token, process.env.JWT_SECRET, async (err, user) => {
    if (err) {
      return next(createError(403, "Invalid Token"));
    }

    // req.user = user;
    req.user = await User.findById(user.id);
    next();
  });
};

export const verifyTutor = async (req, res, next) => {
  const token = req.cookies.accessToken;

  if (!token) {
    return next(createError(401, "Login first to access this resource"));
  }

  jwt.verify(token, process.env.JWT_SECRET, async (err, tutor) => {
    if (err) {
      return next(createError(403, "Invalid Token"));
    }

    // req.user = user;
    req.user = await Tutor.findById(tutor.id);
    next();
  });
};

export const authorizedRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        createError(
          403,
          `${req.user.role} is not allowed to access this resource`
        )
      );
    }
    next();
  };
};
