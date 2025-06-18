// server/middleware/errorHandler.js

// Global error handler middleware.
// Logs the error and sends a formatted JSON response to the client.

const ERROR_MESSAGES = require("../utils/errorMessages");

module.exports = (error, req, res, next) => {
  console.error(error);
  res.status(error.status || 500).json({ error: error.message || ERROR_MESSAGES.INTERNAL });
}