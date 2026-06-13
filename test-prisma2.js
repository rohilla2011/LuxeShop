const { PrismaClient } = require('@prisma/client');
try {
  const prisma = new PrismaClient({ url: process.env.DATABASE_URL });
  console.log("Success with url");
} catch (e) {
  console.error("Error with url:", e.message);
}
