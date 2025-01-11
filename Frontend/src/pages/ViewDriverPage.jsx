import React, { useState, useEffect } from "react";
import { axiosInstance } from "../lib/axios.js";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { motion } from 'framer-motion'; // For animation effects

const ViewDriverPage = () => {
  const [drivers, setDrivers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    const fetchDrivers = async () => {
      try {
        const response = await axiosInstance.get("/drivers");
        console.log("Response data:", response.data);
        setDrivers(response.data);
      } catch (error) {
        console.error("Error fetching drivers:", error);
        toast.error("Failed to fetch drivers. Please try again.");
      }
    };
    fetchDrivers();
  }, []);


  const filteredDrivers = drivers.filter((driver) =>
    Object.values(driver).some((value) =>
      value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const handleUpdateClick = (driver) => {
    setEditingId(driver._id);
    setFormData(driver);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = async () => {
    try {
      const response = await axiosInstance.put(`/drivers/${editingId}`, formData);
      setDrivers(
        drivers.map((driver) =>
          driver._id === editingId || driver.id === formData.id ? response.data.driver : driver
        )
      );
      setEditingId(null);
      setFormData({});
      toast.success("Driver updated successfully!");
    } catch (error) {
      console.error("Error saving driver:", error);
      toast.error("Failed to update the driver. Please try again.");
    }
  };

  const handleDelete = async (id) => {
    try {
      await axiosInstance.delete(`/drivers/${id}`);
      setDrivers(drivers.filter((driver) => driver._id !== id && driver.id !== id));
      toast.success("Driver deleted successfully!");
    } catch (error) {
      console.error("Error deleting driver:", error);
      toast.error("Failed to delete the driver. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-900 via-purple-900 to-indigo-900 py-10 bg-cover bg-fixed relative">

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <h1 className="text-4xl font-extrabold text-center text-white mb-8">
          Manage Driver Details
        </h1>

        <div className="mb-6">
          <input
            type="text"
            placeholder="Search drivers..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-6 py-3 border-2 border-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 shadow-md text-lg bg-gray-800 text-white"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredDrivers.map((driver) =>
            editingId === driver._id ? (
              <motion.div
                key={driver._id}
                className="bg-gradient-to-r from-purple-800 to-indigo-800 p-8 rounded-xl shadow-2xl transform transition duration-500 ease-in-out hover:scale-105"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <h2 className="text-2xl font-bold mb-6 text-white">Update Driver</h2>
                <form className="space-y-6">
                  {["name", "email", "mobile", "address", "area", "id"].map((field) => (
                    <input
                      key={field}
                      name={field}
                      value={formData[field] || ""}
                      onChange={handleInputChange}
                      placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                      className="w-full px-6 py-3 border-2 border-gray-500 rounded-lg shadow-xl focus:ring-2 focus:ring-purple-500 text-lg bg-gray-700 text-white"
                    />
                  ))}
                </form>
                <div className="flex justify-end gap-6 mt-4">
                  <button
                    onClick={() => setEditingId(null)}
                    className="bg-gray-700 text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition"
                  >
                    Cancel
                  </button>

                  <button
                    onClick={handleSave}
                    className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition"
                  >
                    Save
                  </button>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key={driver._id}
                className="bg-gradient-to-r from-gray-700 to-purple-700 p-6 rounded-xl shadow-lg hover:scale-105 hover:shadow-xl transition duration-300 ease-in-out"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <p className="text-white">
                  <strong className="font-semibold">Driver Name:</strong> {driver.name}
                </p>
                <p className="text-white">
                  <strong className="font-semibold">Driver Email:</strong> {driver.email}
                </p>
                <p className="text-white">
                  <strong className="font-semibold">Driver Mobile No.:</strong> {driver.mobile}
                </p>
                <p className="text-white">
                  <strong className="font-semibold">Assigned Address:</strong> {driver.address}
                </p>
                <p className="text-white">
                  <strong className="font-semibold">Assigned Area:</strong> {driver.area}
                </p>
                <p className="text-white">
                  <strong className="font-semibold">Driver ID:</strong> {driver.id}
                </p>

                <div className="mt-6 flex gap-6">
                  <button
                    onClick={() => handleUpdateClick(driver)}
                    className="bg-yellow-500 text-white px-6 py-3 rounded-lg hover:bg-yellow-700 transition"
                  >
                    Update
                  </button>

                  <button
                    onClick={() => handleDelete(driver._id || driver.id)}
                    className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition"
                  >
                    Delete
                  </button>
                </div>
              </motion.div>
            )
          )}
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default ViewDriverPage;
