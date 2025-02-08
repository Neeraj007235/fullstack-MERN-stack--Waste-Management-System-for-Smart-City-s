import React from 'react';
import { useBio } from "../context/BioProvider";
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { axiosInstance } from "../lib/axios.js";
import DashboardHeader from '../components/DashboardHeader';
import Footer from '../components/Footer';

const DriverPage = () => {
  const [BioDriver, setBioDriver] = useBio();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      setTimeout(() => {
        navigate("/");
      }, 0);
      await axiosInstance.post("/drivers/logout");
      localStorage.removeItem("Driver");
      setBioDriver(null);
      toast.success("Logout Successfully");
    } catch (error) {
      toast.error("Error: " + error.message);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-900 via-blue-800 to-teal-700 text-white">
      {/* Header */}
      <DashboardHeader roleName="Driver" handleLogout={handleLogout} />

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-6 pt-16">
        <h1 className="text-3xl sm:text-4xl font-bold text-center mb-12">
          Welcome to Your Dashboard
        </h1>

        {/* Section Card */}
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
          <Link
            to="/work"
            className="relative flex flex-col items-center bg-gradient-to-tr from-green-500 to-teal-400 text-white rounded-lg shadow-md p-8 hover:scale-105 transform transition duration-300 group"
          >
            <img
              src="https://img.icons8.com/external-creatype-glyph-colourcreatype/64/external-gps-marketplace-glyph-creatype-glyph-colourcreatype.png"
              alt="Best Route & Work"
              className="w-24 h-24 mb-4 rounded-full bg-white p-2 shadow-md transform group-hover:rotate-6 transition duration-300"
              loading="lazy"
            />
            <h2 className="text-xl sm:text-2xl font-bold">Best Route & Work</h2>
            <div className="absolute inset-0 bg-black bg-opacity-10 rounded-lg group-hover:bg-opacity-30 transition duration-300"></div>
          </Link>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default DriverPage;
