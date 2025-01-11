import Work from "../models/work.model.js";

// Create a new work for a particular driver with status, time, date, and email, area
export const createWork = async (req, res) => {
  const { email, area, status, time, date } = req.body;

  try {
    // Check if the work with the same area already exists
    const existingWork = await Work.findOne({ area });
    if (existingWork) {
      return res.status(400).json({ message: 'Work with this area already exists' });
    }

    // Create a new work instance with the provided information
    const newWork = new Work({
      email,
      area,
      status,
      date,
      time
    });

    // Save the work to the database
    await newWork.save();

    res.status(201).json({ message: 'Work submitted to the database successfully', work: newWork });
  } catch (error) {
    console.error('Error creating work:', error);
    res.status(500).json({ message: 'Error creating work', error: error.message });
  }
};


// Get all works
export const getAllWorks = async (req, res) => {
  try {
    const works = await Work.find();
    res.status(200).json(works);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching works', error: error.message });
  }
};
