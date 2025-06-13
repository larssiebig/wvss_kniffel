// server/middleware/errorHandler.js

// Global error handler middleware.
// Logs the error and sends a formatted JSON response to the client.

module.exports = (error, req, res, next) => {
  console.error(error);
  res.status(error.status || 500).json({ error: error.message || "Internal server error" });
}