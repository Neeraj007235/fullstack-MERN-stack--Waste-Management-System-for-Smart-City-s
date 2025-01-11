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
      localStorage.removeItem("Drivers");
      setBioDriver(null);
      toast.success("Logout Successfully");
    } catch (error) {
      toast.error("Error: " + error.message);
    }
  };

  const sections = [
    {
      title: "Best Route & Work",
      image: 'https://img.icons8.com/external-creatype-glyph-colourcreatype/64/external-gps-marketplace-glyph-creatype-glyph-colourcreatype.png',
      link: "/work",
      bg: "bg-gradient-to-tr from-green-500 to-teal-400",
    },
    // Add more sections as needed.
  ];

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-700 via-indigo-800 to-gray-900 text-white">
      {/* Header */}
      <DashboardHeader roleName="Driver" handleLogout={handleLogout} />

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-6 pt-16">
        <h1 className="text-3xl sm:text-4xl font-bold text-center mb-12">
          Welcome to Your Dashboard
        </h1>

        {/* Section Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {sections.map(({ title, image, link, bg }, index) => (
            <Link
              to={link}
              key={index}
              className={`relative flex flex-col items-center ${bg} text-white rounded-lg shadow-md p-8 hover:scale-105 transform transition duration-300 group`}
            >
              <img
                src={image}
                alt={title}
                className="w-24 h-24 mb-4 rounded-full bg-white p-2 shadow-md transform group-hover:rotate-6 transition duration-300"
                loading="lazy"
              />
              <h2 className="text-xl sm:text-2xl font-bold">{title}</h2>
              <div className="absolute inset-0 bg-black bg-opacity-10 rounded-lg group-hover:bg-opacity-30 transition duration-300"></div>
            </Link>
          ))}
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default DriverPage;
