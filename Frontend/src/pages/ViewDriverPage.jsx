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
  const [loading, setLoading] = useState(false); // State to track loading
  const [actionLoading, setActionLoading] = useState({});  // To track the loading state for save or delete (null, 'save', or 'delete')

  useEffect(() => {
    const fetchDrivers = async () => {
      setLoading(true);
      try {
        const response = await axiosInstance.get("/drivers");
        setDrivers(response.data);
      } catch (error) {
        console.error("Error fetching drivers:", error);
        toast.error("Failed to fetch drivers. Please try again.");
      } finally {
        setLoading(false); // End loading
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
    setActionLoading((prev) => ({ ...prev, [editingId]: { save: true, delete: false } })); // Mark save as true
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
    } finally {
      setActionLoading((prev) => ({ ...prev, [editingId]: { save: false, delete: false } })); // Reset all actions
    }
  };

  const handleDelete = async (id) => {
    setActionLoading((prev) => ({ ...prev, [id]: { save: false, delete: true } })); // Mark delete as true for this specific driver
    try {
      await axiosInstance.delete(`/drivers/${id}`);
      setDrivers(drivers.filter((driver) => driver._id !== id && driver.id !== id));
      toast.success("Driver deleted successfully!");
    } catch (error) {
      console.error("Error deleting driver:", error);
      toast.error("Failed to delete the driver. Please try again.");
    } finally {
      setActionLoading((prev) => ({ ...prev, [id]: { save: false, delete: false } })); // Reset all actions for this specific driver
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-700 via-purple-600 to-indigo-600 py-12 px-6 relative">
      <div className="max-w-7xl mx-auto space-y-12">
        <h1 className="text-4xl font-extrabold text-center text-white mb-8">Manage Driver Details</h1>

        <div className="mb-6">
          <input
            type="text"
            placeholder="Search drivers..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-6 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 shadow-md text-lg  text-gray-800"
          />
        </div>

        {loading && (
          <div className="flex justify-center items-center space-x-4 mb-8">
            <div className="border-t-4 border-t-white w-16 h-16 rounded-full animate-spin"></div>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredDrivers.map((driver) =>
            editingId === driver._id ? (
              <motion.div
                key={driver._id}
                className="bg-gradient-to-r from-purple-500 to-indigo-500 p-8 rounded-xl shadow-lg transition duration-300 ease-in-out transform hover:scale-105"
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
                      className="w-full mb-4 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 text-gray-800 shadow-sm"
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
                    disabled={actionLoading[editingId]?.save}
                  >
                    {actionLoading[editingId]?.save ? (
                      <div className="border-t-4 border-t-white w-4 h-4 rounded-full animate-spin mx-auto"></div>
                    ) : (
                      "Save"
                    )}
                  </button>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key={driver._id}
                className="bg-gradient-to-r from-gray-600 to-purple-600 p-6 rounded-xl shadow-lg hover:scale-105 hover:shadow-xl transition duration-300 ease-in-out"
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
                    className="bg-yellow-500 text-white px-6 py-3 rounded-lg hover:bg-yellow-600 transition"
                  >
                    Update
                  </button>

                  <button
                    onClick={() => handleDelete(driver._id)}
                    className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition"
                    disabled={actionLoading[driver._id]?.delete}
                  >
                    {actionLoading[driver._id]?.delete ? (
                      <div className="border-t-4 border-t-white w-4 h-4 rounded-full animate-spin mx-auto"></div>
                    ) : (
                      "Delete"
                    )}
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
