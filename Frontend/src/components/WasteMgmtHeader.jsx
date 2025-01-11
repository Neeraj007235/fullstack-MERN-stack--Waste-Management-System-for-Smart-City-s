import React from 'react';

const WasteMgmtHeader = () => {
  return (
    <header className="sticky top-0 w-full bg-gradient-to-r from-blue-600 to-blue-800 text-white shadow-lg p-6 flex items-center justify-between md:justify-center z-10">
      <div className="flex items-center max-w-7xl px-4 md:px-10">
        <img
          src="/Truck.jpg"
          alt="Logo"
          className="h-14 w-14 rounded-full shadow-lg mr-4"
        />
        <h1 className="text-2xl md:text-3xl font-bold tracking-widest text-center">Waste Management System</h1>
      </div>
    </header>
  );
};

export default WasteMgmtHeader;
