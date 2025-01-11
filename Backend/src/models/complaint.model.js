// models/Complaint.js
import mongoose from "mongoose";

const complaintSchema = new mongoose.Schema({
    binArea: {
        type: String,
        required: true,
    },
    userEmail: {
        type: String,
        required: true,
        lowercase: true,
    },
    complaint: {
        type: String,
        required: true,
    },
    date: {
        type: String, // Store date in YYYY-MM-DD format
        required: true,
    },
    time: {
        type: String, // Store time in HH:MM format
        required: true,
    },
    status: {
        type: String,
        enum: ['Pending', 'Resolved', 'Rejected'],
        default: 'Pending',
    },
});

const Complaint = mongoose.model('Complaint', complaintSchema);

export default Complaint;
