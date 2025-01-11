import React from 'react';
import { useNavigate } from 'react-router-dom';

const DashboardHeader = ({ roleName, handleLogout }) => {
  const navigate = useNavigate();
  const title = `${roleName} Dashboard`; // Dynamic title based on role

  return (
    <header className="w-full bg-gradient-to-r from-blue-700 to-teal-600 text-white shadow-md p-4 flex justify-between items-center sticky top-0 z-10">
      {/* Logo */}
      <div className="flex items-center space-x-4">
        <img
          src="/Truck.jpg"
          alt="Waste Management Logo"
          className="h-12 w-20 sm:h-14 sm:w-28 object-contain"
        />
      </div>

      {/* Title */}
      <h1 className="absolute left-1/2 transform -translate-x-1/2 text-lg sm:text-2xl font-bold">
        {title}
      </h1>

      {/* Logout Button */}
      <button
        onClick={handleLogout}
        className="bg-red-600 px-4 py-2 rounded-lg text-sm sm:text-base shadow-lg hover:bg-red-700 transition duration-300"
      >
        Logout
      </button>
    </header>
  );
};

export default DashboardHeader;
