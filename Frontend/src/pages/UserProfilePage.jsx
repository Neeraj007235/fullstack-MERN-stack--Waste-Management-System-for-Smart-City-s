import React, { useState, useEffect } from 'react';
import { axiosInstance } from "../lib/axios.js";
import { ToastContainer, toast } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css';

const UserProfilePage = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('User')));
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    email: user?.email || '',
    mobile: user?.mobile || '',
    city: user?.city || '',
  });

  useEffect(() => {
    if (user) {
      setFormData({
        email: user.email,
        mobile: user.mobile || '',
        city: user.city || '',
      });
    }
  }, [user]);

  const handleEdit = () => setEditing(true);
  const handleCancel = () => {
    setEditing(false);
    setFormData({
      email: user?.email || '',
      mobile: user?.mobile || '',
      city: user?.city || '',
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    if (!user?._id) {
      toast.error("User ID is missing. Please log in again."); 
      return;
    }

    try {
      const response = await axiosInstance.put(`/users/${user._id}`, formData);
      if (response.status === 200) {
        setUser(response.data);
        localStorage.setItem('User', JSON.stringify(response.data));
        setEditing(false);
        toast.success('Profile updated successfully!');
      }
    } catch (error) {
      toast.error('Error updating profile. Try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-700 via-blue-500 to-teal-400 py-10 flex items-center justify-center">
      <div className="max-w-md w-full bg-gradient-to-tl from-purple-600 via-indigo-500 to-teal-500 p-8 rounded-2xl shadow-2xl backdrop-blur-lg bg-opacity-30 border border-white/40">
        <h1 className="text-3xl font-bold text-center text-white mb-6">User Profile</h1>

        {user ? (
          <div className="space-y-6">
            <div className="flex flex-col items-center">
              {/* Profile Circle with Frosted Glass Effect */}
              <div className="relative w-24 h-24 rounded-full bg-white/20 backdrop-blur-lg shadow-lg flex items-center justify-center text-3xl font-bold text-white border border-white/40">
                {user.name.charAt(0).toUpperCase()}
              </div>
              <h2 className="mt-3 text-2xl font-semibold text-white">{user.name}</h2>
              <p className="text-gray-300 text-sm">{user.email}</p>
            </div>

            {editing ? (
              <div className="mt-4 space-y-4">
                {["email", "mobile", "city"].map((field) => (
                  <div key={field}>
                    <label className="block text-white">{field.charAt(0).toUpperCase() + field.slice(1)}</label>
                    <input
                      type={field === "email" ? "email" : "text"}
                      name={field}
                      value={formData[field]}
                      onChange={handleInputChange}
                      className="w-full p-2 mt-1 bg-white/20 backdrop-blur-lg text-white border border-white/40 rounded-lg focus:ring-2 focus:ring-teal-400 focus:outline-none transition"
                    />
                  </div>
                ))}

                <div className="flex justify-between mt-4">
                  <button
                    onClick={handleSave}
                    className="px-6 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition duration-300 shadow-md"
                  >
                    Save
                  </button>
                  <button
                    onClick={handleCancel}
                    className="px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition duration-300 shadow-md"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div className="mt-4 space-y-3 text-white">
                <p><strong>User ID:</strong> {user._id}</p>
                <p><strong>Role:</strong> {user.role || 'User'}</p>
                <p><strong>Mobile:</strong> {user.mobile || 'Not provided'}</p>
                <p><strong>City:</strong> {user.city || 'Not provided'}</p>

                {/* Edit Button */}
                <button
                  onClick={handleEdit}
                  className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300 shadow-md"
                >
                  Edit Profile
                </button>
              </div>
            )}
          </div>
        ) : (
          <p className="text-center text-lg text-gray-300">No user data found. Please log in.</p>
        )}
      </div>

      <ToastContainer />
    </div>
  );
};

export default UserProfilePage;
