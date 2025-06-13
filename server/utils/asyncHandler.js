// server/utils/asyncHandler.js

// Utility to wrap async route handlers and forward errors to the error handler.

module.exports = fn => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next);