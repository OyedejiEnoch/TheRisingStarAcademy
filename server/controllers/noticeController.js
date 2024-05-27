import Notice from "../models/noticeModel.js";
import createError from "../utils/errorHandler.js";

// create a new model
export const newNotice = async (req, res, next) => {
  try {
    const notice = new Notice({
      ...req.body,
      author: req.user.id,
    });

    await createNotice.save();

    res.status(201).json({
      success: true,
      message: "Notice created successfully",
      notice,
    });
  } catch (error) {
    next(error);
  }
};

// get all notice
export const allNotice = async (req, res, next) => {
  try {
    const notice = await Notice.find();

    res.status(200).json({
      success: true,
      notice,
    });
  } catch (error) {
    next(error);
  }
};

// get single notice
export const singleNotice = async (req, res, next) => {
  try {
    const notice = await Notice.findById(req.params.id);
    if (!notice) {
      return next(createError(400, "No Notice found"));
    }

    res.status(200).json({
      success: true,
      notice,
    });
  } catch (error) {
    next(error);
  }
};

// get latest 5 notice
export const latestNotice = async (req, res, next) => {
  try {
    const notice = await Notice.find().sort({ _id: -1 }).limit(5);

    res.status(200).json({
      success: true,
      notice,
    });
  } catch (error) {
    next(error);
  }
};

// to  delete a notice

export const deleteNotice = async (req, res, next) => {
  try {
    let notice = await Notice.findById(req.params.id);

    if (!notice) {
      return next(createError(400, "No Notice found"));
    }

    notice = await Notice.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Deleted Successfully",
    });
  } catch (error) {
    next(error);
  }
};
