import bcrypt from "bcrypt";
import crypto from "crypto"; // For generating secure tokens
import User from "../models/user.model.js";
import dotenv from 'dotenv';
import { generateToken } from "../lib/utils.js";
import { sendPasswordResetEmail, sendResetSuccessEmail } from "../mailtrap/emails.js";

dotenv.config();

// Get all users
export const getUser = async (req, res) => {
  try {
    const user = await User.find();
    res.status(200).json(user);
  } catch (error) {
    console.error("Error fetching in users:", error);
    res.status(500).json({ message: "Error fetching user", error });
  }
};

// Get user by email
export const getUserByEmail = async (req, res) => {
  const { email } = req.params; // Retrieve the email from the request parameters

  try {
    // Find the user with the given email
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      mobile: user.mobile,
      city: user.city,
    });
  } catch (error) {
    console.error("Error fetching user by email:", error);
    res.status(500).json({ message: "Error fetching user by email", error });
  }
};

// Controller for updating user profile
export const updateUserProfile = async (req, res) => {
  const userId = req.user._id;
  const { email, mobile, city } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check for email or mobile conflicts
    const existingUser = await User.findOne({
      $or: [{ email }, { mobile }],
      _id: { $ne: userId },
    });

    if (existingUser) {
      return res.status(400).json({ message: "Email or mobile number is already registered" });
    }

    // Update user fields
    user.email = email || user.email;
    user.mobile = mobile || user.mobile;
    user.city = city || user.city;

    await user.save();

    console.log("User updated successfully:", user); 

    res.status(200).json(user);
  } catch (error) {
    console.error("Error updating user profile:", error);
    res.status(500).json({ message: "Error updating user profile", error: error.message });
  }
};

export const signup = async (req, res) => {
  try {
    const { name, email, password, mobile, city } = req.body; 

    if (password.length < 6) {
      return res.status(400).json({ message: "Password must be at least 6 characters long" });
    }

    // Check if user already exists by email or mobile
    const existingUser = await User.findOne({ $or: [{ email }, { mobile }] });
    if (existingUser) {
      return res.status(400).json({ message: "This email or mobile number is already in use." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // Create and save new user
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      mobile,
      city,
    });
    await newUser.save();

    generateToken(newUser._id, res);
    res.status(201).json({
      message: "User account created successfully.",
      user: {
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        mobile: newUser.mobile,
        city: newUser.city,
      },
    });
  } catch (error) {
    console.log("Error: " + error.message);
    res.status(500).json({ message: "Internal server error. Please try again later." });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "No account found with this email." });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Incorrect password. Please try again." });
    }

    generateToken(user._id, res);
    res.status(200).json({
      message: "Login successful! You are now logged in.",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.log("Error: " + error.message);
    res.status(500).json({ message: "Internal server error. Please try again later." });
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

// Controller (forgotPassword & resetPassword)
export const forgotPassword = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ success: false, message: "User not found" });
    }

    const resetToken = crypto.randomBytes(32).toString("hex");
    user.resetToken = resetToken;
    user.resetTokenExpiry = Date.now() + 3600000; // 1 hour expiry
    await user.save();

    await sendPasswordResetEmail(user.email, `${process.env.FRONTEND_URL}/reset-password/${resetToken}`);
    res.status(200).json({ success: true, message: "Password reset link sent to your email" });
  } catch (error) {
    console.log("Error in forgotPassword", error);
    res.status(400).json({ success: false, message: error.message });
  }
};

export const resetPassword = async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;
  try {
    const user = await User.findOne({
      resetToken: token,
      resetTokenExpiry: { $gt: Date.now() }, // Ensure token is not expired
    });

    if (!user) {
      return res.status(400).json({ success: false, message: "Invalid or expired reset token" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    user.password = hashedPassword;
    user.resetToken = undefined;
    user.resetTokenExpiry = undefined;
    await user.save();

    await sendResetSuccessEmail(user.email);
    res.status(200).json({ success: true, message: "Password reset successful" });
  } catch (error) {
    console.log("Error in resetPassword", error);
    res.status(400).json({ success: false, message: error.message });
  }
};
