import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
        trim: true,
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        match: [
            /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
            "Please enter a valid email",
        ],
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        minlength: [6, "Password must be at least 6 characters long"],
    },
    mobile: {
        type: String,
        required: [true, "Mobile number is required"],
        unique: true,
        match: [
            /^[0-9]{10}$/, // Ensures the mobile number is 10 digits long
            "Please enter a valid 10-digit mobile number",
        ],
    },
    city: {
        type: String,
        required: [true, "City is required"],
    },
});

const Admin = mongoose.model("Admin", adminSchema);

export default Admin;
