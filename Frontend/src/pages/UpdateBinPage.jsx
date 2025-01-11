import React, { useEffect, useState } from "react";
import { axiosInstance } from "../lib/axios.js";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { motion } from 'framer-motion';

const UpdateBinPage = () => {
  const [bins, setBins] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getBin = async () => {
      try {
        const res = await axiosInstance.get("/bins");
        setBins(res.data);
      } catch (error) {
        console.error("Error fetching bins:", error);
        setBins([]);
        toast.error("Failed to fetch bins.");
      }
    };
    getBin();
  }, []);

  const handleUpdateClick = (bin) => {
    setEditingId(bin._id);
    setFormData({ ...bin });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = async () => {
    if (!formData.bin || !formData.locality || !formData.city || !formData.driverEmail) {
      toast.error("Please fill in all required fields.");
      return;
    }
    setLoading(true);
    try {
      const res = await axiosInstance.put(`/bins/${editingId}`, formData);
      setBins((prevBins) =>
        prevBins.map((bin) => (bin._id === editingId ? res.data.bin : bin))
      );
      setEditingId(null);
      setFormData({});
      toast.success("Bin updated successfully!");
    } catch (error) {
      console.error("Error updating bin:", error);
      toast.error("Failed to update the bin. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    setLoading(true);
    try {
      await axiosInstance.delete(`/bins/${id}`);
      setBins(bins.filter((bin) => bin._id !== id));
      toast.success("Bin deleted successfully!");
    } catch (error) {
      console.error("Error deleting bin:", error);
      toast.error("Failed to delete the bin.");
    } finally {
      setLoading(false);
    }
  };

  const handleGeoMap = async (id, locality, landmark, city) => {
    if (!locality || !city) {
      toast.error("Locality and city are required to update the bin.");
      return;
    }

    const address = `${locality}, ${landmark || ''}, ${city}`;
    console.log("Constructed Address:", address);
    setLoading(true);

    try {
      const res = await axiosInstance.put(`/bins/${id}`, { locality, landmark, city });
      setBins((prevBins) =>
        prevBins.map((bin) =>
          bin._id === id ? { ...bin, latitude: res.data.bin.latitude, longitude: res.data.bin.longitude } : bin
        )
      );
      toast.success("Geolocation successfully updated.");
    } catch (error) {
      console.error("Error updating geolocation:", error.message);
      toast.error("An error occurred while updating geolocation. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleShowMap = (bin) => {
    const { latitude, longitude } = bin;
    if (!latitude || !longitude) {
      toast.error("Geolocation not available for this bin.");
      return;
    }
    window.open(`https://www.google.com/maps?q=${latitude},${longitude}`, "_blank");
  };

  const filteredBins = (bins || []).filter((bin) =>
    Object.values(bin).some((value) =>
      value?.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-800 via-pink-600 to-yellow-500 py-10 bg-fixed bg-cover bg-center relative">
      <div className="absolute inset-0 bg-black bg-opacity-50 z-0"></div>

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <h1 className="text-5xl font-bold text-center text-white mb-8">Manage Bins</h1>

        <div className="mb-6">
          <input
            type="text"
            placeholder="Search Bin by any field"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-6 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 text-gray-800 shadow-lg"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBins.map((bin) =>
            editingId === bin._id ? (
              <motion.div
                key={bin._id}
                className="bg-gradient-to-br from-blue-600 via-purple-700 to-pink-600 p-6 rounded-lg shadow-lg transform hover:scale-105 transition duration-300 ease-in-out"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="text-xl font-bold text-white mb-4">Update Bin</h2>
                <form>
                  {[
                    "bin",
                    "locality",
                    "landmark",
                    "city",
                    "loadType",
                    "driverEmail",
                    "cyclePeriod",
                    "bestRoute",
                  ].map((field) => (
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
                <div className="flex justify-end gap-4">
                  <button
                    onClick={() => setEditingId(null)}
                    className="bg-gray-700 text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSave}
                    className="bg-pink-600 text-white px-4 py-2 rounded-lg hover:bg-pink-700 transition"
                    disabled={loading}
                  >
                    Save
                  </button>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key={bin._id}
                className="bg-gradient-to-br from-blue-500 via-purple-600 to-pink-500 p-6 rounded-lg shadow-lg transform hover:scale-105 transition duration-300 ease-in-out"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <p className="text-white"><strong>Bin Name:</strong> {bin.bin}</p>
                <p className="text-white"><strong>Locality:</strong> {bin.locality}</p>
                <p className="text-white"><strong>Landmark:</strong> {bin.landmark}</p>
                <p className="text-white"><strong>City:</strong> {bin.city}</p>
                <p className="text-white"><strong>Load Type:</strong> {bin.loadType}</p>
                <p className="text-white"><strong>Driver Email:</strong> {bin.driverEmail}</p>
                <p className="text-white"><strong>Cycle Period:</strong> {bin.cyclePeriod}</p>
                <p className="text-white"><strong>Best Route:</strong> {bin.bestRoute}</p>
                <p className="text-white"><strong>Latitude:</strong> {bin.latitude || "N/A"}</p>
                <p className="text-white"><strong>Longitude:</strong> {bin.longitude || "N/A"}</p>
                <div className="mt-4 flex flex-wrap gap-4">
                  <button
                    onClick={() => handleGeoMap(bin._id, bin.locality, bin.landmark, bin.city)}
                    className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
                    disabled={loading}
                  >
                    Geo Map
                  </button>
                  <button
                    onClick={() => handleShowMap(bin)}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                  >
                    Show on Map
                  </button>
                  <button
                    onClick={() => handleUpdateClick(bin)}
                    className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => handleDelete(bin._id)}
                    className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
                    disabled={loading}
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

export default UpdateBinPage;
