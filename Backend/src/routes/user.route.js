import express from "express";
import { signup, login, logout ,getUser, getUserByEmail, updateUserProfile,forgotPassword, resetPassword } from "../controllers/user.controller.js";
import { protect } from "../middleware/auth.middleware.js";
const router = express.Router();


router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);
router.get("/",protect("admin"), getUser);
router.get("/:email",protect('user'), getUserByEmail);
router.put("/:userId",protect('user'), updateUserProfile);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);

export default router;
