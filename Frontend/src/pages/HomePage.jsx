// src/pages/Home.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import WasteMgmtHeader from '../components/WasteMgmtHeader';
import Footer from '../components/Footer';

const HomePage = () => {
  const navigate = useNavigate();

  const goTo = (path) => {
    navigate(path);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-700 via-purple-700 to-pink-600 flex flex-col items-center justify-between text-white">
      <WasteMgmtHeader />

      <main className="flex flex-col items-center justify-center bg-white bg-opacity-90 shadow-xl rounded-2xl mt-10 p-6 sm:p-8 w-full sm:w-4/5 md:w-3/5 lg:w-2/5">
        {/* Banner */}
        <div className="flex justify-center items-center mb-10 w-full">
          <img
            src="/Banner.jpg"
            alt="Waste Management Illustration"
            className="h-56 sm:h-60 w-full sm:w-auto rounded-lg shadow-xl transform transition-all hover:scale-105"
          />
        </div>

        {/* Buttons */}
        <div className="flex flex-col gap-4 w-full">
          {[{ label: 'User', path: '/user_login', color: 'from-pink-500 to-red-500' },
          { label: 'Driver', path: '/driver_login', color: 'from-green-500 to-teal-500' },
          { label: 'Admin', path: '/admin_login', color: 'from-blue-500 to-indigo-500' }].map(({ label, path, color }, index) => (
            <button
              key={index}
              className={`w-full bg-gradient-to-r ${color} text-white font-semibold py-3 sm:py-4 rounded-lg shadow-lg hover:scale-105 transform transition-all duration-300`}
              onClick={() => goTo(path)}
            >
              {label}
            </button>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default HomePage;
