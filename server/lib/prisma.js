// server/lib/prisma.js

// Initializes a single PrismaClient instance and reuses it globally to avoid multiple connections in development.

const { PrismaClient } = require("@prisma/client");

let prisma;

if(!global.prisma) {
  global.prisma = new PrismaClient();
}

prisma = global.prisma;

module.exports = prisma;