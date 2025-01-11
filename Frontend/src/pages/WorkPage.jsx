import React, { useEffect, useState } from 'react';
import { axiosInstance } from "../lib/axios.js";
import { FaCheckCircle, FaExclamationCircle, FaMapMarkerAlt } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const WorkPage = () => {
  const [driverEmail, setDriverEmail] = useState(null);
  const [driverArea, setDriverArea] = useState("");
  const [binDetails, setBinDetails] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const driver = JSON.parse(localStorage.getItem('Drivers'));
    const email = driver?.email;
    setDriverEmail(email);

    if (email) {
      fetchDriverArea(email);
    }
  }, []);

  const fetchDriverArea = async (email) => {
    try {
      const response = await axiosInstance.get(`/drivers/email/${email}`);
      const area = response.data?.area;

      if (!area) {
        console.warn('No area assigned to this driver.');
        return;
      }

      setDriverArea(area);
      fetchBinDetails(area);
    } catch (error) {
      console.error('Error fetching driver area:', error);
      toast.error('Unable to fetch driver area. Please try again later.');
    }
  };

  const fetchBinDetails = async (area) => {
    try {
      setLoading(true);
      const response = await axiosInstance.get(`/bins/${area}`);
      setBinDetails(response.data);
    } catch (error) {
      console.error('Error fetching bin details:', error);
      toast.error('Unable to fetch bin details. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (newStatus) => {
    const now = new Date();
    const work = {
      area: driverArea,
      email: driverEmail,
      status: newStatus,
      date: now.toISOString().split('T')[0],
      time: now.toLocaleTimeString(),
    };

    try {
      const response = await axiosInstance.post('/work', work, {
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.status === 201) {
        toast.success('Work status updated successfully!');
      } else {
        toast.error('Failed to update work status.');
      }
    } catch (error) {
      console.error('Error updating work status:', error);
      toast.error('An error occurred while updating the status.');
    }
  };

  const handleShowMap = (bins) => {
    if (!bins || bins.length === 0) {
      toast.error('No bins available for this area.');
      return;
    }

    const locations = bins
      .filter(bin => bin.latitude && bin.longitude)
      .map(bin => `${bin.latitude},${bin.longitude}`)
      .join('|');

    if (locations) {
      window.open(`https://www.google.com/maps?q=${locations}`, '_blank');
    } else {
      toast.error('No geolocation data available for bins.');
    }
  };

  return (
    <div className="max-w-full mx-auto p-6 bg-gradient-to-r from-indigo-700 via-purple-600 to-teal-400 bg-cover bg-fixed rounded-lg shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-center text-white mb-8">
          Best Route & Work
        </h1>
        {driverEmail && (
          <>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">Hello, {driverEmail}</h2>

            <div className="space-y-6">
              {driverArea && (
                <div className="space-y-6">
                  <h3 className="text-xl font-semibold text-white mb-2">Bin Details for Area: {driverArea}</h3>

                  {loading ? (
                    <div className="flex justify-center">
                      <div className="w-16 h-16 border-4 border-t-4 border-blue-500 rounded-full animate-spin"></div>
                    </div>
                  ) : binDetails.length > 0 ? (
                    binDetails.map((bin, index) => (
                      <div key={index} className="bg-white p-4 rounded-lg shadow-md mb-4">
                        <p><strong className="text-blue-600">Bin Name:</strong> {bin.bin}</p>
                        <p><strong className="text-blue-600">Locality:</strong> {bin.locality}</p>
                        <p><strong className="text-blue-600">Landmark:</strong> {bin.landmark}</p>
                        <p><strong className="text-blue-600">City:</strong> {bin.city}</p>
                        <p><strong className="text-blue-600">Load Type:</strong> {bin.loadType}</p>
                        <p><strong className="text-blue-600">Cycle Period:</strong> {bin.cyclePeriod}</p>
                        <p><strong className="text-blue-600">Best Route:</strong> {bin.bestRoute}</p>
                        <p><strong className="text-blue-600">Latitude:</strong> {bin.latitude}</p>
                        <p><strong className="text-blue-600">Longitude:</strong> {bin.longitude}</p>
                      </div>
                    ))
                  ) : (
                    <p className="text-white">No bins found for this area.</p>
                  )}
                </div>
              )}

              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-white">Update Status</h3>
                <div className="flex flex-wrap space-x-4 justify-center sm:justify-start">
                  {['In Progress', 'Completed', 'Incomplete'].map((status) => (
                    <button
                      key={status}
                      onClick={() => handleStatusUpdate(status)}
                      className={`flex items-center px-6 py-3 rounded-md transition ease-in-out transform hover:scale-105 ${status === 'In Progress' ? 'bg-blue-600 hover:bg-blue-700' :
                        status === 'Completed' ? 'bg-green-600 hover:bg-green-700' :
                          'bg-red-600 hover:bg-red-700'
                        } text-white sm:px-4 sm:py-2`}
                      aria-label={`Update status to ${status}`}
                    >
                      {status === 'Incomplete' ? <FaExclamationCircle className="mr-2" /> : <FaCheckCircle className="mr-2" />}
                      {status}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-white">Best Route</h3>
                <div className="flex flex-wrap space-x-4 justify-center sm:justify-start">
                  {binDetails.length > 0 && (
                    <button
                      onClick={() => handleShowMap(binDetails)}
                      className="flex items-center justify-center bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition transform hover:scale-105 mt-6 sm:px-4 sm:py-2"
                      aria-label="Show bins on map"
                    >
                      <FaMapMarkerAlt className="mr-3" />
                      Show Map
                    </button>
                  )}
                </div>
              </div>
            </div>
          </>
        )}
      </div>
      <ToastContainer />
    </div>
  );
};

export default WorkPage;
