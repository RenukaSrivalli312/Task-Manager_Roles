/**
 * Global Error Handler Middleware
 *
 * Express calls this automatically when next(error) is called,
 * or when an unhandled error occurs in a route.
 */
const errorHandler = (err, req, res, next) => {
  // Log error details in development
  if (process.env.NODE_ENV === "development") {
    console.error("❌ Error:", err);
  }

  let statusCode = err.statusCode || 500;
  let message = err.message || "Internal Server Error";

  // ── Mongoose Errors ───────────────────────────────────────────────────────

  // Duplicate key error (e.g. duplicate email)
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue)[0];
    statusCode = 409;
    message = `An account with this ${field} already exists.`;
  }

  // Mongoose validation error (e.g. required field missing)
  if (err.name === "ValidationError") {
    statusCode = 400;
    message = Object.values(err.errors)
      .map((e) => e.message)
      .join(", ");
  }

  // Invalid MongoDB ObjectId
  if (err.name === "CastError") {
    statusCode = 400;
    message = `Invalid ID format: ${err.value}`;
  }

  res.status(statusCode).json({
    success: false,
    message,
    // Show stack trace only in development for debugging
    ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
  });
};

module.exports = errorHandler;
