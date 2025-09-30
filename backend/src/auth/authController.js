import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/authModel.js";

const JWT_SECRET = process.env.JWT_SECRET || "dev_secret";
const JWT_EXPIRES_IN = "15m";

// REGISTER
export const register = async (req, res) => {
  try {
    const { username, email, password, confirmPassword, role } = req.body;

    if (!username || !email || !password || !confirmPassword) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }
    if (password !== confirmPassword) {
      return res
        .status(400)
        .json({ success: false, message: "Passwords do not match" });
    }

    const exists = await User.findOne({ $or: [{ email }, { username }] });
    if (exists) {
      return res
        .status(409)
        .json({ success: false, message: "Username or email already in use" });
    }

    const hashed = await bcrypt.hash(password, 10);

    const user = await User.create({
      username,
      email,
      password: hashed,
      confirmPassword: hashed,
      role: role || "admin",
    });

    // don't return password
    const { password: _, ...safe } = user.toObject();
    return res
      .status(201)
      .json({
        success: true,
        message: "User Registered successfully",
        user: safe,
      });
  } catch (err) {
    return res
      .status(500)
      .json({ success: false, message: "Register failed", error: err.message });
  }
};

// LOGIN
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res
        .status(400)
        .json({ success: false, message: "Email and password required" });

    const user = await User.findOne({ email });
    if (!user)
      return res
        .status(401)
        .json({ success: false, message: "Invalid credentials" });

    const ok = await bcrypt.compare(password, user.password);
    if (!ok)
      return res
        .status(401)
        .json({ success: false, message: "Invalid credentials" });

    const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, {
      expiresIn: JWT_EXPIRES_IN,
    });

    res.cookie("token", token, {
      httpOnly: true, // ❌ JS can't read this
      secure: process.env.NODE_ENV === "production", // only HTTPS in prod
      sameSite: "strict", // CSRF protection
      path: "/", // available across site
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    });

    const userObj = user.toObject();

    const { password: _, confirmPassword: __, ...safe } = userObj;
    return res
      .status(200)
      .json({ success: true, message: "Logged in", token, user: safe });
  } catch (err) {
    return res
      .status(500)
      .json({ success: false, message: "Login failed", error: err.message });
  }
};

export const forgotPassword = async (req, res) => {
  try {
    const { email, oldPassword, newPassword } = req.body;

    // 1. Check user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // 2. Check old password matches
    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Old password is incorrect" });
    }

    // 3. Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // 4. Save new password
    user.password = hashedPassword;
    user.confirmPassword = hashedPassword;
    await user.save();

    res.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
    console.error("Forgot password error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// LOGOUT
export const logout = (req, res) => {
  res.clearCookie("token", { path: "/" });
  res.status(200).json({ success: true, message: "Logged out" });
};

// const JWT_SECRET = process.env.JWT_SECRET || "supersecret";

export const verifyToken = (req, res, next) => {
  try {
    const token = req.cookies.token; // from cookie
    if (!token)
      return res
        .status(401)
        .json({ success: false, message: "Token expired or Unauthenticated try" });

    // console.log("token", token);

    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    console.log("error", err);
    return res
      .status(401)
      .json({ success: false, message: "Invalid or expired token" });
  }
};
