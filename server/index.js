// server/index.js

// Main server setup and route integration.

require("dotenv").config();
const express = require("express");
const session = require("express-session");
const cors = require("cors");
const bodyParser = require("body-parser");
const authRoutes = require("./routes/auth");
const scoreRoutes = require("./routes/score");
const userRoutes = require("./routes/user");
const errorHandler = require("./middleware/errorHandler");

const app = express();
const PORT = 3001;

// Enable CORS for frontend origin and credentials (cookies).
app.use(cors({ origin: process.env.FRONTEND_ORIGIN, credentials: true }));
app.use(bodyParser.json());

// Configure session management with cookie settings.
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
  },
}));

// Mount route modules.
app.use("/api", authRoutes);
app.use("/api", scoreRoutes);
app.use("/api", userRoutes);

// Simple health check endpoint.
app.get("/health", (req, res) => res.json({ status: "ok" }));


// Global error handler middleware.
app.use(errorHandler);

// Start the server.
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);