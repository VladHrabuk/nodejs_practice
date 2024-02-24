function handleErrors(error, req, res, next) {
  error.statusCode = error.statusCode || 500;
  res.status(error.statusCode).json({
    message: error.message,
  });
}

function tryCatch(controller) {
  return async (req, res, next) => {
    try {
      await controller(req, res);
    } catch (error) {
      next(error);
    }
  };
}

module.exports = { handleErrors, tryCatch };
