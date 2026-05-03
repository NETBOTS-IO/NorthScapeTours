import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import User from "../models/authModel.js";

dotenv.config();

const MONGO_URI = process.env.MONGODB_URI;
const ADMIN_EMAIL = process.env.ADMIN_EMAIL;
const ADMIN_PASS = process.env.ADMIN_PASS;

const verifyAdmin = async () => {
  console.log("🔍 Starting Admin Login Verification...");
  console.log(`📧 Email to check: ${ADMIN_EMAIL}`);

  try {
    if (!MONGO_URI) {
      throw new Error("MONGODB_URI is not defined in .env");
    }

    await mongoose.connect(MONGO_URI);
    console.log("✅ Connected to MongoDB");

    const user = await User.findOne({ email: ADMIN_EMAIL });
    if (!user) {
      console.error("❌ Admin user not found in database. Run 'npm run create-admin' first.");
      process.exit(1);
    }

    console.log("✅ User found in database.");
    console.log(`✅ User role: ${user.role}`);

    const isMatch = await bcrypt.compare(ADMIN_PASS, user.password);
    if (isMatch) {
      console.log("🎉 Login Test Successful: Password matches correctly!");
      
      if (user.role !== "admin") {
        console.warn("⚠️ Warning: User exists but does not have 'admin' role.");
      }
    } else {
      console.error("❌ Login Test Failed: Password does not match the hashed password in database!");
      console.log("💡 Tip: Check if the ADMIN_PASS in .env matches the password used when the user was created.");
    }

    await mongoose.disconnect();
    process.exit(0);
  } catch (err) {
    console.error("❌ Error during verification:", err.message);
    process.exit(1);
  }
};

verifyAdmin();
