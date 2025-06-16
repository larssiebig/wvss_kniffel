// server/routes/score.js

// Routes for managing scores: create, fetch highscores, personal scores and history.

const express = require("express");
const prisma = require("../lib/prisma");
const isAuthenticated = require("../middleware/auth");
const asyncHandler = require("../utils/asyncHandler");

const router = express.Router();

// Submit a new score for the logged-in user.
router.post("/score", isAuthenticated, asyncHandler(async (req, res) => {
  const { value } = req.body;
  await prisma.score.create({ data: { value, userId: req.session.userId } });
  res.json({ success: true });
}));

// Get top 10 highscores across all users.
router.get("/highscores", asyncHandler(async (req, res) => {
  const scores = await prisma.score.findMany({
    orderBy: { value: "desc" },
    take: 10,
    include: { user: true }
  });
  res.json(scores);
}));

// Get top 10 scores of the logged-in user.
router.get("/my-scores", isAuthenticated, asyncHandler(async (req, res) => {
  const scores = await prisma.score.findMany({
    where: { userId: req.session.userId },
    orderBy: { value: "desc" },
    take: 10,
  });
  res.json(scores);
}));

// Get full score history of the logged-in user, ordered by date.
router.get("/my-history", isAuthenticated, asyncHandler(async (req, res) => {
  const history = await prisma.score.findMany({
    where: { userId: req.session.userId },
    orderBy: { date: "desc" },
  });
  res.json(history);
}));

module.exports = router;