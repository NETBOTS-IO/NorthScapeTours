import { Router } from "express";
import { register, login, forgotPassword, logout, verifyToken } from "../auth/authController.js";

const router = Router();

router.post("/register", verifyToken, register);
router.post("/login",  login);
router.post("/forgot-password", verifyToken, forgotPassword);
router.post("/logout", logout);

//authentication routes used at dashboard
router.get("/me", verifyToken, (req, res) => {
  res.json({ user: req.user, token: req.cookies.token }); // role + id available
});

export default router;