const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient(); // Connect to PostgreSQL
console.log("Connected to PostgreSQL");

module.exports = prisma;
