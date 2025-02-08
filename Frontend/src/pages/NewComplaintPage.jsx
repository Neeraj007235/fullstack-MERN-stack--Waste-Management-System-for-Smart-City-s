import React, { useState, useEffect } from 'react';
import { axiosInstance } from "../lib/axios.js";
import { formatTime } from '../lib/utils.js';
import { motion } from 'framer-motion';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const NewComplaintPage = () => {
  const [bins, setBins] = useState([]); // Bin data
  const [complaintText, setComplaintText] = useState(''); // State to store complaint text
  const [searchTerm, setSearchTerm] = useState(''); // Search term for filtering bins
  const [loading, setLoading] = useState(false); // Loading state for submission
  const [binsLoading, setBinsLoading] = useState(true); // Loading state for bins
  const [openBinId, setOpenBinId] = useState(null); // Track the open bin ID

  // Fetch bins from API
  useEffect(() => {
    const getBins = async () => {
      try {
        const res = await axiosInstance.get("/bins");
        setBins(res.data); // Set bins data
      } catch (error) {
        console.error("Error fetching bins:", error);
        setBins([]); // Fallback to empty array in case of error
      } finally {
        setBinsLoading(false); // Set bins loading to false once data is fetched
      }
    };
    getBins();
  }, []);

  // Handle submitting a complaint
  const handleSubmitComplaint = async (binId) => {
    if (!complaintText) {
      toast.error('Please enter a complaint!');
      return;
    }
    setLoading(true); // Start loading when submitting the complaint

    const binName = bins.find((bin) => bin._id === binId)?.bin; // Find the bin name
    const now = new Date();
    const currentDate = now.toISOString().split('T')[0]; // Extract date (YYYY-MM-DD)
    const currentTime = formatTime(now);  // Defined in utils.js file

    // Correct key "User" 
    const user = localStorage.getItem("User")
      ? JSON.parse(localStorage.getItem("User"))
      : null;

    if (!user || !user.email) {
      toast.error("User is not logged in. Please log in and try again.");
      setLoading(false);
      return;
    }

    const userEmail = user.email;
    const complaintData = {
      binArea: binName,
      complaint: complaintText,
      userEmail: userEmail,
      date: currentDate,
      time: currentTime,
    };

    try {
      const res = await axiosInstance.post('/complaints', complaintData);
      if (res.status === 201) {
        toast.success('Complaint submitted successfully!');
        setComplaintText('');
        setOpenBinId(null);
      } else {
        toast.error('Failed to submit complaint');
      }
    } catch (error) {
      console.log('Error submitting complaint:', error);
      toast.error('Failed to submit complaint');
    } finally {
      setLoading(false); // Stop loading after submission attempt
    }
  };

  // Handle showing the map for a specific bin
  const handleShowMap = (latitude, longitude) => {
    if (!latitude || !longitude) {
      toast.error("Geolocation not available for this bin.");
      return;
    }
    window.open(`https://www.google.com/maps?q=${latitude},${longitude}`, "_blank");
  };

  // Filter bins based on search term
  const filteredBins = bins.filter((bin) =>
    Object.values(bin).some((value) =>
      value?.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-900 via-blue-800 to-teal-700 py-10 text-white">
      <div className="max-w-7xl mx-auto px-6">
        <h1 className="text-3xl sm:text-4xl font-bold text-center text-white mb-12">Post Complaints</h1>

        {/* Loading Spinner while bins are loading */}
        {binsLoading ? (
          <div className="flex justify-center items-center h-screen">
            <div className="border-t-4 border-blue-500 w-16 h-16 rounded-full animate-spin"></div>
          </div>
        ) : (
          <>
            <div className="mb-6">
              <input
                type="text"
                placeholder="Search by any field"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 text-black"
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredBins.map((bin) => (
                <div
                  key={bin._id}
                  className="p-6 rounded-lg bg-gradient-to-br from-indigo-800 via-blue-700 to-teal-600 shadow-md hover:shadow-lg transform hover:scale-105 transition duration-300 ease-in-out"
                >
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <p><strong>Bin Name:</strong> {bin.bin}</p>
                    <p><strong>Locality:</strong> {bin.locality}</p>
                    <p><strong>Landmark:</strong> {bin.landmark}</p>
                    <p><strong>City:</strong> {bin.city}</p>
                    <br />
                    <p><strong>Latitude:</strong> {bin.latitude}</p>
                    <p><strong>Longitude:</strong> {bin.longitude}</p>

                    {/* Buttons to Add Complaint and Show Map */}
                    <div className="mt-4">
                      <button
                        onClick={() => setOpenBinId(openBinId === bin._id ? null : bin._id)} // Toggle complaint form for this bin
                        className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition mr-4"
                      >
                        {openBinId === bin._id ? 'Cancel Complaint' : 'Add Complaint'}
                      </button>

                      <button
                        onClick={() => handleShowMap(bin.latitude, bin.longitude)}
                        className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition"
                      >
                        Show Map
                      </button>
                    </div>

                    {/* Only show the complaint form for the selected bin */}
                    {openBinId === bin._id && (
                      <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                        className="mt-4"
                      >
                        <textarea
                          value={complaintText}
                          onChange={(e) => setComplaintText(e.target.value)}
                          rows="3"
                          placeholder="Enter your complaint here"
                          className="border-2 p-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-600 text-black"
                        />
                        <button
                          onClick={() => handleSubmitComplaint(bin._id)}
                          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition mt-2"
                          disabled={loading}
                        >
                          {loading ? (
                            <div className="flex justify-center items-center space-x-2">
                              <div className="border-t-4 border-blue-500 w-5 h-5 rounded-full animate-spin"></div>
                              <span>Submitting...</span>
                            </div>
                          ) : (
                            'Submit Complaint'
                          )}
                        </button>
                      </motion.div>
                    )}
                  </motion.div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      {/* Toast container to display toasts */}
      <ToastContainer />
    </div>
  );
};

export default NewComplaintPage;
