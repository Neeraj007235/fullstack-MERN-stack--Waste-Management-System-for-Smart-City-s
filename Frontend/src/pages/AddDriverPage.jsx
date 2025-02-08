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

  // Reusable input field rendering
  const renderInput = (label, id, type = 'text', value) => {
    return (
      <div className="mb-6">
        <label htmlFor={id} className="block text-sm font-medium text-gray-700">{label}</label>
        <input
          type={type}
          id={id}
          name={id}
          value={value}
          onChange={handleInputChange}
          required
          className="mt-2 w-full p-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
        />
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-300 via-green-400 to-purple-500 flex flex-col justify-center">
      <WasteMgmtHeader /> {/* Include the Header here */}

      <main className="flex-1 p-8 bg-white bg-opacity-80 mx-4 md:mx-0 rounded-lg shadow-2xl">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Add Driver Details</h2>
          <form onSubmit={handleSubmit}>
            {renderInput("Driver Name", "driverName", 'text', driverDetails.driverName)}
            {renderInput("Driver Email", "driverEmail", 'email', driverDetails.driverEmail)}
            {renderInput("Driver Password", "driverPassword", 'password', driverDetails.driverPassword)}
            {renderInput("Driver Mobile Number", "driverMobile", 'text', driverDetails.driverMobile)}
            
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

            {renderInput("Assign Area", "AssignArea", 'text', driverDetails.AssignArea)}
            {renderInput("Driver ID Number", "driverIdNum", 'text', driverDetails.driverIdNum)}

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
