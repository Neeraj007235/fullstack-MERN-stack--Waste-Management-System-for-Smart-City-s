import React, { useState } from 'react';
import { toast } from 'react-hot-toast'; 
import WasteMgmtHeader from '../components/WasteMgmtHeader';  
import { axiosInstance } from "../lib/axios.js";

const AddDriverPage = () => {
  const [driverDetails, setDriverDetails] = useState({
    driverName: '',
    driverEmail: '',
    driverPassword: '',
    driverMobile: '',
    AssignAddress: '',
    AssignArea: '',
    driverIdNum: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDriverDetails({ ...driverDetails, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      name: driverDetails.driverName,
      email: driverDetails.driverEmail,
      password: driverDetails.driverPassword,
      mobile: driverDetails.driverMobile,
      address: driverDetails.AssignAddress,
      area: driverDetails.AssignArea,
      id: driverDetails.driverIdNum
    };

    try {
      const response = await axiosInstance.post("/drivers", payload);
      console.log(response.data);

      toast.success('Driver added successfully');

      // Reset the form data
      setDriverDetails({
        driverName: '',
        driverEmail: '',
        driverPassword: '',
        driverMobile: '',
        AssignAddress: '',
        AssignArea: '',
        driverIdNum: ''
      });
    } catch (error) {
      console.error('Error adding driver:', error);

      toast.error('Failed to add driver');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-300 via-green-400 to-purple-500 flex flex-col justify-center">
      <WasteMgmtHeader /> {/* Include the Header here */}

      {/* Driver Form Section */}
      <main className="flex-1 p-8 bg-white bg-opacity-80 mx-4 md:mx-0 rounded-lg shadow-2xl">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Add Driver Details</h2>
          <form onSubmit={handleSubmit}>
            {/* Driver Name */}
            <div className="mb-6">
              <label htmlFor="driverName" className="block text-sm font-medium text-gray-700">Driver Name</label>
              <input
                type="text"
                id="driverName"
                name="driverName"
                value={driverDetails.driverName}
                onChange={handleInputChange}
                required
                className="mt-2 w-full p-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>

            {/* Driver Email */}
            <div className="mb-6">
              <label htmlFor="driverEmail" className="block text-sm font-medium text-gray-700">Driver Email</label>
              <input
                type="email"
                id="driverEmail"
                name="driverEmail"
                value={driverDetails.driverEmail}
                onChange={handleInputChange}
                required
                className="mt-2 w-full p-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>

            {/* Driver Password */}
            <div className="mb-6">
              <label htmlFor="driverPassword" className="block text-sm font-medium text-gray-700">Driver Password</label>
              <input
                type="password"
                id="driverPassword"
                name="driverPassword"
                value={driverDetails.driverPassword}
                onChange={handleInputChange}
                required
                className="mt-2 w-full p-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>

            {/* Driver Mobile */}
            <div className="mb-6">
              <label htmlFor="driverMobile" className="block text-sm font-medium text-gray-700">Driver Mobile Number</label>
              <input
                type="text"
                id="driverMobile"
                name="driverMobile"
                value={driverDetails.driverMobile}
                onChange={handleInputChange}
                required
                className="mt-2 w-full p-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>

            {/* Driver Address */}
            <div className="mb-6">
              <label htmlFor="AssignAddress" className="block text-sm font-medium text-gray-700">Assign Address</label>
              <textarea
                id="AssignAddress"
                name="AssignAddress"
                value={driverDetails.AssignAddress}
                onChange={handleInputChange}
                required
                rows="3"
                className="mt-2 w-full p-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>

            {/* Driver Area */}
            <div className="mb-6">
              <label htmlFor="AssignArea" className="block text-sm font-medium text-gray-700">Assign Area</label>
              <input
                type="text"
                id="AssignArea"
                name="AssignArea"
                value={driverDetails.AssignArea}
                onChange={handleInputChange}
                required
                className="mt-2 w-full p-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>

            {/* Driver ID Number */}
            <div className="mb-6">
              <label htmlFor="driverIdNum" className="block text-sm font-medium text-gray-700">Driver ID Number</label>
              <input
                type="text"
                id="driverIdNum"
                name="driverIdNum"
                value={driverDetails.driverIdNum}
                onChange={handleInputChange}
                required
                className="mt-2 w-full p-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>

            {/* Submit Button */}
            <div className="mt-8">
              <button
                type="submit"
                className="w-full py-3 px-6 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Add Driver
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default AddDriverPage;
