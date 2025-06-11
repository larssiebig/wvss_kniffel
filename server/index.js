// server/index.js
const express = require("express");
const session = require("express-session");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const bodyParser = require("body-parser");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();
const app = express();
const PORT = 3001;

// CORS setup to allow frontend access with credentials (cookies)
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(bodyParser.json());

// Session config with cookie options
app.use(
  session({
    secret: "supersecret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: false, // set to true if using HTTPS in production
      sameSite: "lax",
    },
  })
);

// REGISTER
app.post("/api/register", async (req, res) => {
  const { username, password } = req.body;
  const hash = await bcrypt.hash(password, 10);
  try {
    const user = await prisma.user.create({
      data: { username, password: hash },
    });
    req.session.userId = user.id;
    res.json({ success: true });
  } catch (e) {
    res.status(400).json({ error: "Username exists" });
  }
});

// LOGIN
app.post("/api/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await prisma.user.findUnique({ where: { username } });
  if (user && (await bcrypt.compare(password, user.password))) {
    req.session.userId = user.id;

    req.session.save((error) => {
      if(error) {
        console.error("Session save error:", error);
        return res.status(500).json({ error: "Internal server error" });
      }
    })
    res.json({ success: true, user: { id: user.id, username: user.username } });
  } else {
    res.status(401).json({ error: "Invalid credentials" });
  }
});

// LOGOUT
app.post("/api/logout", (req, res) => {
  req.session.destroy(() => {
    res.clearCookie("connect.sid"); // default cookie name used by express-session
    res.json({ success: true });
  });
});

// GET CURRENT USER
app.get("/api/user", async (req, res) => {
  if (!req.session.userId) return res.json(null);
  const user = await prisma.user.findUnique({
    where: { id: req.session.userId },
  });
  res.json({ username: user.username });
});

// SAVE SCORE
app.post("/api/score", async (req, res) => {
  if (!req.session.userId)
    return res.status(401).json({ error: "Not logged in" });
  const { value } = req.body;
  await prisma.score.create({ data: { value, userId: req.session.userId } });
  res.json({ success: true });
});

// GET TOP 10 SCORES (only with existing user)
app.get("/api/highscores", async (req, res) => {
  try {
    const users = await prisma.user.findMany({ select: { id: true } });
    const userIds = users.map(u => u.id);
    const scores = await prisma.score.findMany({
      where: { userId: { in: userIds } },
      orderBy: { value: "desc" },
      take: 10,
      include: { user: true },
  });
  res.json(scores);
  } catch (error) {
    console.error("Error loading highscores:", error);
    res.status(500).json({ error: "Internal server error", details: error.message });
  }
});

app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);