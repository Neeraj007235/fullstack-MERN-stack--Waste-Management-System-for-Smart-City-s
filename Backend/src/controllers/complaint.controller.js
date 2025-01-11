// controllers/complaintController.js
import Complaint from "../models/complaint.model.js";

// Get all complaints
export const getAllComplaints = async (req, res) => {
    try {
        const complaints = await Complaint.find();
        res.status(200).json(complaints);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Create a new complaint
export const createComplaint = async (req, res) => {
    try {
        const { binArea, userEmail, complaint, date, time } = req.body;

        if (!binArea || !userEmail || !complaint) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const newComplaint = new Complaint({
            binArea,
            userEmail,
            complaint,
            date,
            time
        });

        const savedComplaint = await newComplaint.save();

        res.status(201).json({ 
            message: 'Complaint created successfully',
            complaint: savedComplaint 
        });
    } catch (error) {
        console.error('Error creating complaint:', error.message);
        res.status(500).json({ message: 'Server error' });
    }
};

// Update complaint status
export const updateComplaintStatus = async (req, res) => {
    try {
        const { complaintId } = req.params;
        const { status } = req.body;

        // Validate status
        if (!['Pending', 'Resolved', 'Rejected'].includes(status)) {
            return res.status(400).json({ message: 'Invalid status' });
        }

        const complaint = await Complaint.findById(complaintId);
        if (!complaint) {
            return res.status(404).json({ message: 'Complaint not found' });
        }

        complaint.status = status;
        await complaint.save();

        res.status(200).json({ message: 'Complaint status updated', complaint });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};
