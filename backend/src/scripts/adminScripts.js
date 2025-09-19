import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import User from "../models/authModel.js"; // adjust path if needed

dotenv.config();

const MONGO_URI = process.env.MONGODB_URI;

const createAdmin = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("✅ Connected to MongoDB");

    const existingAdmin = await User.findOne({ role: "admin" });
    if (existingAdmin) {
      console.log("⚠️ Admin user already exists:", existingAdmin.email);
      process.exit(0);
    }

    const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASS, 10);

    const admin = new User({
      username: process.env.ADMIN_NAME,
      email: process.env.ADMIN_EMAIL,
      password: hashedPassword,
      confirmPassword: hashedPassword, 
      role: "admin",
    });

    await admin.save();
    console.log("🎉 Admin user created successfully:", admin.email);
    process.exit(0);
  } catch (err) {
    console.error("❌ Error creating admin:", err.message);
    process.exit(1);
  }
};

createAdmin();
