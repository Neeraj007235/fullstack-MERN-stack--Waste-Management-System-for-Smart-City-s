import Driver from "../models/driver.model.js" // Adjust path as needed
import { generateToken } from "../lib/utils.js";
import bcrypt from "bcrypt";

// Create a new driver
export const createDriver = async (req, res) => {
  const { name, email, password, mobile, address, area, id } = req.body;

  try {
    if (password.length < 6) {
      return res.status(400).json({ message: "Password must be at least 6 characters long" });
    }
    const existingDriver = await Driver.findOne({ $or: [{ email }, { mobile }] });
    if (existingDriver) {
      return res.status(400).json({ message: "This email or mobile number is already in use." });
    }
    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    const newDriver = new Driver({
      name,
      email,
      password: hashedPassword, 
      mobile,
      address,
      area,
      id,
    });
    await newDriver.save();
    res.status(201).json({ message: 'Driver created successfully.', driver: newDriver });
  } catch (error) {
    console.error('Error creating driver:', error); 
    res.status(500).json({ message: 'Internal server error. Please try again later.' });
  }
};

export const getAllDrivers = async (req, res) => {
  try {
    const drivers = await Driver.find();
    res.status(200).json(drivers);
  } catch (error) {
    console.error("Error fetching drivers:", error);
    res.status(500).json({ message: 'Error fetching drivers', error: error.message });
  }
};


export const getDriverByEmail = async (req, res) => {
  const { email } = req.params; // Get the email from URL params

  try {
    // Use a regular expression to match all drivers whose email contains the provided email
    const drivers = await Driver.find({ email: { $regex: email, $options: 'i' } });

    if (drivers.length === 0) {
      return res.status(404).json({ message: 'No drivers found matching this email' });
    }

    res.status(200).json(drivers[0]); // Return the first driver in the array
  } catch (error) {
    console.error('Error fetching drivers by email:', error);
    res.status(500).json({ message: 'Error fetching drivers', error: error.message });
  }
};


export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const driver = await Driver.findOne({ email });

    if (!driver) {
      return res.status(400).json({ message: "No account found with this email." });
    }

    const isMatch = await bcrypt.compare(password, driver.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Incorrect password. Please try again." });
    }

    generateToken(driver._id, res);
    res.status(200).json({
      message: "Login successful! You are now logged in.",
      driver: {
        _id: driver._id,
        name: driver.name,
        email: driver.email,
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

// Update Driver
export const updateDriver = async (req, res) => {
  const { name, email, mobile, address, area, id: normalId } = req.body;
  const { id } = req.params; // Get the 'id' from the URL params

  try {

    const query = id.length === 24 ? { _id: id } : { id }; // Check if 'id' is MongoDB ObjectId or a normal ID

    const updatedDriver = await Driver.findOneAndUpdate(
      query,
      { name, email, mobile, address, area, id: normalId }, // Update normal 'id' as well if provided
      { new: true }
    );

    if (!updatedDriver) {
      return res.status(404).json({ message: 'Driver not found' });
    }

    res.status(200).json({ message: 'Driver updated successfully', driver: updatedDriver });
  } catch (error) {
    console.error('Error updating driver:', error);
    res.status(500).json({ message: 'Error updating driver', error: error.message });
  }
};

// Delete Driver
export const deleteDriver = async (req, res) => {
  const { id } = req.params; // Get the 'id' from URL params

  try {

    const query = id.length === 24 ? { _id: id } : { id }; // Check if 'id' is MongoDB ObjectId or a normal ID

    const deletedDriver = await Driver.findOneAndDelete(query);

    if (!deletedDriver) {
      return res.status(404).json({ message: 'Driver not found' });
    }

    res.status(200).json({ message: 'Driver deleted successfully', driver: deletedDriver });
  } catch (error) {
    console.error('Error deleting driver:', error);
    res.status(500).json({ message: 'Error deleting driver', error: error.message });
  }
};
