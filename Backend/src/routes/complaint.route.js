import express from 'express';
import { createComplaint, getAllComplaints, updateComplaintStatus } from "../controllers/complaint.controller.js";
import { protect } from '../middleware/auth.middleware.js';

const router = express.Router();

// Route to create a new complaint
router.post('/complaints',protect("user"), createComplaint);

// Route to get all complaints
router.get('/complaints', getAllComplaints);

// Route to update complaint status
router.put('/complaints/:complaintId',protect("admin"), updateComplaintStatus);

export default router;
