// server/routes/auth.js

// Routes for user authentication: register, login, logout.

const express = require("express");
const bcrypt = require("bcryptjs");
const prisma = require("../lib/prisma");
const asyncHandler = require("../utils/asyncHandler");
const ERROR_MESSAGES = require("../utils/errorMessages");

const router = express.Router();

// Register a new user and start a session.
router.post("/register", asyncHandler(async (req, res) => {
  const { username, password } = req.body;

  const existing = await prisma.user.findUnique({ where: { username } });
  if(existing) {
    return res.status(400).json({ error: ERROR_MESSAGES.USERNAME_TAKEN });
  }

  const hash = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({ data: { username, password: hash } });
  req.session.userId = user.id;
  res.json({ success: true });
}));

// Login an existing user and start a session.
router.post("/login", asyncHandler(async (req, res) => {
  const { username, password } = req.body;
  const user = await prisma.user.findUnique({ where: { username } });

  if (user && await bcrypt.compare(password, user.password)) {
    req.session.userId = user.id;
    req.session.save(error => {
      if(error) return res.status(500).json({ error: ERROR_MESSAGES.INTERNAL });
      res.json({ success: true, user: { id: user.id, username: user.username } });
    });
  } else {
    res.status(401).json({ error: ERROR_MESSAGES.INVALID_CREDENTIALS });
  }
}));

// Destroy the session (logout).
router.post("/logout", (req, res) => {
  req.session.destroy(() => {
    res.clearCookie("connect.sid");
    res.json({ success: true });
  });
});

module.exports = router;