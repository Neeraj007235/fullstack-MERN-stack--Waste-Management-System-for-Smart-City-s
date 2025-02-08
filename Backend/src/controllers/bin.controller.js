import Bin from "../models/bin.model.js";
import axios from 'axios';

// Get all bins
export const getBin = async (req, res) => {
  try {
    const bins = await Bin.find();
    res.status(200).json(bins);
  } catch (error) {
    console.error("Error fetching bins:", error);
    res.status(500).json({ message: "Error fetching bins", error });
  }
};

// Get bins by area (bin field)
export const getBinsByArea = async (req, res) => {
  const { area } = req.params; // Get the area from the URL params (which corresponds to 'bin')

  try {
    // Use case-insensitive regex to match `locality` and `landmark` (either can match the area)
    const bins = await Bin.find({
      $or: [
        { locality: { $regex: new RegExp(area, 'i') } },  // Search in locality
        { landmark: { $regex: new RegExp(area, 'i') } }   // Search in landmark
      ]
    });

    if (bins.length === 0) {
      return res.status(404).json({ message: `No bins found in area: ${area}` });
    }

    res.status(200).json(bins); // Return the bins array
  } catch (error) {
    console.error("Error fetching bins by area:", error);
    res.status(500).json({ message: 'Error fetching bins by area', error });
  }
};

// Create a new bin
export const createBin = async (req, res) => {
  const { bin, locality, landmark, city, loadType, driverEmail, cyclePeriod, bestRoute } = req.body;

  try {
    const newBin = new Bin({
      bin,
      locality,
      landmark,
      city,
      loadType,
      driverEmail,
      cyclePeriod,
      bestRoute,
    });

    await newBin.save();
    res.status(201).json({ message: 'Bin created successfully', bin: newBin });
  } catch (error) {
    console.error("Error creating bin:", error);
    res.status(500).json({ message: 'Error creating bin', error })
  }
};

// Update a bin
export const updateBin = async (req, res) => {
  const { locality, landmark, city, bin, loadType, driverEmail, cyclePeriod, bestRoute } = req.body;

  if (!locality || !city) {
    return res.status(400).json({ message: "Locality and city are required." });
  }

  const address = `${locality}, ${landmark || ''}, ${city}`;
  console.log('Constructed Address:', address);

  try {
    // Geocoding and bin update logic remains unchanged, as it ensures latitude/longitude are updated
    const geocodeResponse = await axios.get('https://nominatim.openstreetmap.org/search', {
      params: { q: address, format: 'json', addressdetails: 1 },
      headers: { 'User-Agent': 'WasteManagementSystem/1.0' },
    });

    console.log('Geocode API Response:', JSON.stringify(geocodeResponse.data, null, 2));

    if (geocodeResponse.data.length > 0) {
      // Use the most relevant result
      const { lat, lon, display_name } = geocodeResponse.data[0];

      // Update bin location
      const updatedBin = await Bin.findByIdAndUpdate(req.params.id, {
        bin, locality, landmark, city, loadType, driverEmail, cyclePeriod, bestRoute,
        latitude: lat,
        longitude: lon,
        locationName: display_name // Optional: Save the resolved location name
      }, { new: true });

      return res.status(200).json({ message: 'Bin updated', bin: updatedBin });
    } else {
      // Retry with reduced address
      const fallbackAddress = `${locality}, ${city}`;
      console.log(`Fallback Address: ${fallbackAddress}`);

      const fallbackResponse = await axios.get('https://nominatim.openstreetmap.org/search', {
        params: {
          q: fallbackAddress,
          format: 'json',
          addressdetails: 1,
        },
        headers: { 'User-Agent': 'WasteManagementSystem/1.0' }
      });

      if (fallbackResponse.data.length > 0) {
        const { lat, lon, display_name } = fallbackResponse.data[0];
        const updatedBin = await Bin.findByIdAndUpdate(req.params.id, {
          bin, locality, landmark, city, loadType, driverEmail, cyclePeriod, bestRoute,
          latitude: lat,
          longitude: lon,
          locationName: display_name
        }, { new: true });

        return res.status(200).json({ message: 'Bin updated (fallback)', bin: updatedBin });
      } else {
        return res.status(404).json({ message: `No geolocation found for address: ${address}` });
      }
    }
  } catch (error) {
    console.error('Error updating bin:', error.message);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Delete a bin
export const deleteBin = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedBin = await Bin.findByIdAndDelete(id);
    if (!deletedBin) {
      return res.status(404).json({ message: "Bin not found" });
    }
    res.status(200).json({ message: "Bin deleted successfully" });
  } catch (error) {
    console.error("Error deleting bin:", error);
    res.status(500).json({ message: "Error deleting bin", error });
  }
};


