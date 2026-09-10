const errorMiddleware = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;

  console.error("ERROR:", err);

  res.status(statusCode).json({
    success: false,
    message: err.message || "Internal Server Error",
    error: err,
  });
};

export default errorMiddleware;