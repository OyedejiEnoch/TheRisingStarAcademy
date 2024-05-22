const createError = (statusCode, message) => {
  const err = new Error();
  (err.statusCode = statusCode), (err.message = message);
  // this is customizing and creating our own errors then passing through the middlewares
  return err;
};

export default createError;
