/**
 * Seed Script — creates a default admin user.
 * Run with: npm run seed
 */

const dotenv = require("dotenv");
dotenv.config();

const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const connectDB = require("./db");
const User = require("../models/User");

const seedAdmin = async () => {
  await connectDB();

  const existing = await User.findOne({ email: "admin@example.com" });

  if (existing) {
    console.log("⚠️  Admin user already exists. Skipping seed.");
    process.exit(0);
  }

  const hashedPassword = await bcrypt.hash("Admin@123", 10);

  await User.create({
    name: "Super Admin",
    email: "admin@example.com",
    password: hashedPassword,
    role: "admin",
  });

  console.log("✅ Admin user created:");
  console.log("   Email:    admin@example.com");
  console.log("   Password: Admin@123");
  console.log("   Role:     admin");

  process.exit(0);
};

seedAdmin().catch((err) => {
  console.error("Seed failed:", err.message);
  process.exit(1);
});
