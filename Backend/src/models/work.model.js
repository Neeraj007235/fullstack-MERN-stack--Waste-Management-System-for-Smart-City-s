import mongoose from 'mongoose';

// Define the Work schema
const workSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        match: [
            /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
            "Please enter a valid email",
        ],
    },
    area: { type: String, required: true },
    status: {
        type: String,
        enum: ['In Progress', 'Completed', 'Incomplete'], // Enum for the status field
        required: true
    },
    time: { type: String, required: true }, // Time in a suitable format (e.g., "HH:mm")
    date: { type: String, required: true }, // Store date as a Date object
});

// Create the Work model from the schema
const Work = mongoose.model('Work', workSchema);

export default Work;
