import React, { useState } from "react";
import { axiosInstance } from "../lib/axios.js";
import { toast } from 'react-hot-toast';
import WasteMgmtHeader from '../components/WasteMgmtHeader'; 

const CreateBinPage = () => {
  const [formData, setFormData] = useState({
    bin: "",
    locality: "",
    landmark: "",
    city: "",
    loadType: "",
    driverEmail: "",
    cyclePeriod: "",
    bestRoute: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form submitted with data:", formData);

    try {
      const response = await axiosInstance.post("/bins/create", formData);
      console.log(response.data);

      toast.success('Bin details added successfully');

      // Reset the form data
      setFormData({
        bin: "",
        locality: "",
        landmark: "",
        city: "",
        loadType: "",
        driverEmail: "",
        cyclePeriod: "",
        bestRoute: "",
      });
    } catch (error) {
      console.error("Error creating bin:", error);
      toast.error('Failed to add bin details');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-300 via-blue-400 to-purple-500">
      <WasteMgmtHeader /> {/* Include the header */}

      <div className="max-w-lg md:max-w-4xl mx-auto bg-white p-8 shadow-xl rounded-lg border border-gray-200 mt-8 transform transition-all">
        <h1 className="text-2xl md:text-3xl font-bold text-center mb-6 text-gray-900">Add Bin Details</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Create Bin */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Create Bin</label>
            <input
              type="text"
              name="bin"
              value={formData.bin}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 transition-all"
              required
            />
          </div>

          {/* Locality */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Locality</label>
            <input
              type="text"
              name="locality"
              value={formData.locality}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 transition-all"
              required
            />
          </div>

          {/* Landmark */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Landmark</label>
            <input
              type="text"
              name="landmark"
              value={formData.landmark}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 transition-all"
              required
            />
          </div>

          {/* City */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">City</label>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 transition-all"
              required
            />
          </div>

          {/* Load Type */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Load Type</label>
            <select
              name="loadType"
              value={formData.loadType}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 transition-all"
              required
            >
              <option value="">Select Load Type</option>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>

          {/* Assign Driver */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Assign Driver (Email)</label>
            <input
              type="email"
              name="driverEmail"
              value={formData.driverEmail}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 transition-all"
              required
            />
          </div>

          {/* Cycle Period */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Cycle Period</label>
            <select
              name="cyclePeriod"
              value={formData.cyclePeriod}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 transition-all"
              required
            >
              <option value="">Select Cycle Period</option>
              <option value="daily">Daily</option>
              <option value="twice">Twice a Week</option>
              <option value="weekly">Weekly</option>
            </select>
          </div>

          {/* Best Route */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Best Route</label>
            <input
              type="text"
              name="bestRoute"
              value={formData.bestRoute}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 transition-all"
              required
            />
          </div>

          {/* Submit Button */}
          <div className="text-center mt-6">
            <button
              type="submit"
              className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-3 rounded-full shadow-md hover:bg-blue-800 transition-all transform hover:scale-105"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateBinPage;
