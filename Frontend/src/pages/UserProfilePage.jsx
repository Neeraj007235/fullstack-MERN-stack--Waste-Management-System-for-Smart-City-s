import React, { useState, useEffect } from 'react';
import { axiosInstance } from "../lib/axios.js";
import { ToastContainer, toast } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css'; // Import the CSS for toast notifications

const UserProfilePage = () => {
  // Fetch user data from localStorage
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('Users')));
  const [editing, setEditing] = useState(false); // State to toggle between view and edit mode
  const [formData, setFormData] = useState({
    email: user?.email || '',
    mobile: user?.mobile || '',
    city: user?.city || '',
  });

  useEffect(() => {
    // Update form data if the user is updated in the state
    if (user) {
      setFormData({
        email: user.email,
        mobile: user.mobile || '',
        city: user.city || '',
      });
    }
  }, [user]);

  const handleEdit = () => {
    setEditing(true); // Toggle edit mode
  };

  const handleCancel = () => {
    setEditing(false); // Cancel editing and reset form
    setFormData({
      email: user?.email || '',
      mobile: user?.mobile || '',
      city: user?.city || '',
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    if (!user?._id) {
      console.error("User ID is missing, cannot proceed with update.");
      toast.error("User ID is missing. Please log in again."); 
      return;
    }

    try {
      const response = await axiosInstance.put(
        `/users/${user._id}`,
        formData
      );

      if (response.status === 200) {
        console.log('API response:', response.data);
        setUser(response.data);
        localStorage.setItem('Users', JSON.stringify(response.data));
        setEditing(false);
        toast.success('User profile updated successfully!'); 
      }
    } catch (error) {
      console.error('Error updating user profile:', error);
      toast.error('There was an error updating your profile. Please try again.'); 
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-green-400 to-blue-500 py-10 flex items-center justify-center">
      <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-2xl w-full sm:max-w-xs md:max-w-lg lg:max-w-xl">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">User Profile</h1>

        {user ? (
          <div className="space-y-4">
            <div className="flex items-center space-x-4 sm:flex-col md:flex-row">
              {/* Profile Circle */}
              <div className="relative bg-gradient-to-r from-green-400 to-teal-500 rounded-full w-20 h-20 sm:w-24 sm:h-24 flex items-center justify-center text-2xl sm:text-3xl font-bold text-white shadow-lg hover:scale-105 transition-transform duration-300">
                {user.name.charAt(0).toUpperCase()}
              </div>
              <div className="mt-4 sm:mt-2 md:mt-0">
                <h2 className="text-2xl sm:text-3xl font-semibold text-gray-700">{user.name}</h2>
                <p className="text-gray-600 text-sm sm:text-base">{user.email}</p>
              </div>
            </div>

            {/* Editable Form */}
            {editing ? (
              <div className="mt-4 space-y-4">
                <div>
                  <label className="block text-gray-700">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full p-2 mt-1 border border-gray-300 rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-gray-700">Mobile Number</label>
                  <input
                    type="text"
                    name="mobile"
                    value={formData.mobile}
                    onChange={handleInputChange}
                    className="w-full p-2 mt-1 border border-gray-300 rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-gray-700">City</label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    className="w-full p-2 mt-1 border border-gray-300 rounded-md"
                  />
                </div>
                <div className="flex justify-between mt-4">
                  <button
                    onClick={handleSave}
                    className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300"
                  >
                    Save
                  </button>
                  <button
                    onClick={handleCancel}
                    className="px-6 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500 transition duration-300"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div className="mt-4 space-y-2">
                <p className="text-gray-700">
                  <strong>User ID:</strong> {user._id}
                </p>
                <p className="text-gray-700">
                  <strong>Role:</strong> {user.role || 'User'}
                </p>
                <p className="text-gray-700">
                  <strong>Email:</strong> {user.email}
                </p>
                <p className="text-gray-700">
                  <strong>Mobile Number:</strong> {user.mobile || 'Not provided'}
                </p>
                <p className="text-gray-700">
                  <strong>City:</strong> {user.city || 'Not provided'}
                </p>

                {/* Edit Button */}
                <button
                  onClick={handleEdit}
                  className="mt-4 px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition duration-300"
                >
                  Edit Profile
                </button>
              </div>
            )}
          </div>
        ) : (
          <p className="text-center text-lg text-gray-600">
            No user data found. Please log in.
          </p>
        )}
      </div>

      {/* Toast container to display notifications */}
      <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
    </div>
  );
};

export default UserProfilePage;
