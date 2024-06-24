// try catch middleware..........
const TryCatch = (controller) => (req, res, next) => {
  try {
    return controller(req, res, next);
  } catch (error) {
    next(error);
  }
};

// error handle middleware........
const ErrorHandle = (err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || "Something went wrong";
  return res.status(status).json({
    success: false,
    status,
    message,
  });
};

export { TryCatch, ErrorHandle };
