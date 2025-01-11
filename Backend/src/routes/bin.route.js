import express from 'express';
import { getBin, createBin, updateBin, deleteBin, getBinsByArea} from "../controllers/bin.controller.js";
import { protect } from '../middleware/auth.middleware.js';
const router = express.Router();

// Get all bins
router.get("/", getBin);

//get bin using area
router.get("/:area",protect("driver"), getBinsByArea)

// Create,update and delete a new bin
router.post("/create",protect("admin"), createBin);
router.put("/:id",protect("admin"), updateBin);
router.delete("/:id",protect("admin"), deleteBin);

export default router;
