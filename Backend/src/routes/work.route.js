import express from 'express';
import { getAllWorks, createWork } from '../controllers/work.controller.js';
import { protect } from '../middleware/auth.middleware.js';
const router = express.Router();


router.post("/work",protect("driver"), createWork );
router.get("/find",protect("admin"), getAllWorks)

export default router;

