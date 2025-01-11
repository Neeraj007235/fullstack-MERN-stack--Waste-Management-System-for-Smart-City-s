import React, { useState, useEffect } from "react";
import { axiosInstance } from "../lib/axios.js";
import { FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt } from "react-icons/fa"; 

const UserDetailPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch all users from the API
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axiosInstance.get("/users");
        setUsers(res.data);
      } catch (error) {
        console.error("Failed to fetch users:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading)
    return (
      <div className="text-center mt-10">
        <span className="text-gray-700 font-bold text-lg">Loading...</span>
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-100 to-blue-300 py-10">
      <div className="max-w-7xl mx-auto bg-white rounded-lg shadow-2xl p-8">
        <h1 className="text-4xl font-bold mb-6 text-center text-blue-600">
          User Details
        </h1>

        {users.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {users.map((user) => (
              <div
                key={user._id}
                className="p-6 bg-gray-50 rounded-lg shadow-lg transform hover:scale-105 hover:shadow-xl transition duration-300 ease-in-out"
              >
                <div className="text-left mb-4">
                  <FaUser className="text-blue-400 text-4xl mb-2" />
                  <p className="text-xl font-bold text-gray-800">{user.name}</p>
                </div>

                <div className="text-gray-600">
                  <p className="flex items-center mb-2">
                    <FaEnvelope className="mr-2 text-blue-500" />
                    <span className="truncate">{user.email}</span>
                  </p>
                  <p className="flex items-center mb-2">
                    <FaPhone className="mr-2 text-blue-500" />
                    {user.mobile}
                  </p>
                  <p className="flex items-center mb-2">
                    <FaMapMarkerAlt className="mr-2 text-blue-500" />
                    {user.city}
                  </p>
                  <p className="text-sm text-gray-500">
                    <strong>Role:</strong> {user.role || "User"}
                  </p>
                  <p className="text-sm text-gray-500">
                    <strong>ID:</strong> {user._id}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center mt-6 text-gray-700">
            No users found in the database.
          </p>
        )}
      </div>
    </div>
  );
};

export default UserDetailPage;
