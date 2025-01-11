import Admin from "../models/admin.model.js";
import { generateToken } from "../lib/utils.js";
import bcrypt from "bcrypt";

export const getAdmin = async (req, res) => {
  try {
    const admin = await Admin.find();
    res.status(200).json(admin);
  } catch (error) {
    console.error("Error fetching in admin:", error);
    res.status(500).json({ message: "Error fetching admin", error });
  }
};

export const signup = async (req, res) => {
  try {
    const { name, email, password, mobile, city } = req.body;

    if (password.length < 6) {
      return res.status(400).json({ message: "Password must be at least 6 characters" });
    }
    // Check if admin already exists by email or mobile
    const existingAdmin = await Admin.findOne({ $or: [{ email }, { mobile }] });
    if (existingAdmin) {
      return res.status(400).json({ message: "Email or mobile number is already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // Create and save new user
    const newAdmin = new Admin({
      name,
      email,
      password: hashedPassword,
      mobile,
      city,
    });
    await newAdmin.save();

    generateToken(newAdmin._id, res);

    res.status(201).json({
      message: "Admin created successfully!",
      Admin: {
        _id: newAdmin._id,
        name: newAdmin.name,
        email: newAdmin.email,
        mobile: newAdmin.mobile,
        city: newAdmin.city,
      },
    });
  } catch (error) {
    console.log("Error: " + error.message);
    res.status(500).json({ message: "Internal Server error" });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const admin = await Admin.findOne({ email });
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!admin || !isMatch) {
      return res.status(400).json({ message: "Invalid adminemail or password" });
    }

    generateToken(admin._id, res);
    res.status(200).json({
      message: "Login successful",
      admin: {
        _id: admin._id,
        name: admin.name,
        email: admin.email,
      },
    });
  } catch (error) {
    console.log("Error: " + error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const logout = (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.log("Error in logout controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};