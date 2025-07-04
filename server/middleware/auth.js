// server/middleware/auth.js

// Middleware to check if the user is authenticated.
// Blocks requests if there is no active session.

const ERROR_MESSAGES = require("../utils/errorMessages");

module.exports = function isAuthenticated(req, res, next) {
  if(!req.session.userId) return res.status(401).json({ error: ERROR_MESSAGES.NOT_LOGGED_IN });
  next();
}