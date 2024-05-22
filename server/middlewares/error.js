export default (err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something Went Wrong";

  if (err.name === "CastError") {
    const message = `Resource not found. Invalid: ${err?.path}`;
    return res.status(404).json({
      success: false,
      message: message,
      stack: err.stack,
    });
  }

  if (err.name === "ValidationError") {
    const message = Object.values(err.errors).map((value) => value.message);
    // to tap into an object, there are two properties, the key and the values,
    // so here we are taping into the values(which is errors:[{}] i.e the key is errors and the values is an array off obj)
    return res.status(400).json({
      success: false,
      message: message,
    });
  }

  if (err.code === 11000) {
    const message = `${Object.keys(err.keyValue)} already exist`;
    return res.status(400).json({
      success: false,
      message: message,
    });
  }

  // handling wrong jwt error
  if (err.name === "JsonwebTokenError") {
    const message = "Json web token is invalid. Try again";
    return res.status(400).json({
      success: false,
      message: message,
    });
  }

  // handling expired jwt error
  if (err.name === "TokenExpiredError") {
    const message = "Json web token is expired. Try again";
    return res.status(400).json({
      success: false,
      message: message,
    });
  }

  if (process.env.NODE_ENV === "DEVELOPMENT") {
    res.status(errorStatus).json({
      success: false,
      status: errorStatus,
      message: errorMessage,
      stack: err.stack,
    });
  }

  if (process.env.NODE_ENV === "PRODUCTION") {
    res.status(errorStatus).json({
      success: false,
      message: errorMessage,
    });
  }
};
