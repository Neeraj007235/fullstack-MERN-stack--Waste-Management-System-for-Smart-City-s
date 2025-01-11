import express from "express";
import { getAdmin, login, signup, logout } from "../controllers/admin.controller.js";
import { protect } from "../middleware/auth.middleware.js";
const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);
router.get("/",protect('admin'), getAdmin);

export default router;
