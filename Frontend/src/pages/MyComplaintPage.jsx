import React, { useState, useEffect } from 'react';
import { axiosInstance } from "../lib/axios.js";

const MyComplaintPage = () => {
  const [complaints, setComplaints] = useState([]); // State to store complaints
  const [loading, setLoading] = useState(true); // Loading state

  const user = JSON.parse(localStorage.getItem("Users")); // Get the current user from localStorage
  const userEmail = user?.email; // Get the user's email

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const res = await axiosInstance.get('/complaints');
        if (res.status === 200) {
          const userComplaints = res.data.filter((complaint) => complaint.userEmail === userEmail);
          setComplaints(userComplaints);
        } else {
          console.error('Failed to fetch complaints');
        }
      } catch (error) {
        console.error('Error fetching complaints:', error);
      } finally {
        setLoading(false);
      }
    };

    if (userEmail) {
      fetchComplaints();
    } else {
      console.error('User email not found in localStorage.');
      setLoading(false);
    }
  }, [userEmail]);

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-500 to-purple-500 py-10">
      <div className="max-w-5xl mx-auto bg-white p-6 rounded-lg shadow-2xl">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">My Complaints</h1>

        {loading ? (
          <div className="flex justify-center items-center">
            <div className="border-t-4 border-blue-500 w-16 h-16 rounded-full animate-spin"></div>
          </div>
        ) : complaints.length > 0 ? (
          <ul className="space-y-6">
            {complaints.map((complaint) => (
              <li key={complaint._id} className="p-5 border-l-4 border-blue-500 bg-gray-50 rounded-md shadow-md">
                <h2 className="text-2xl font-semibold text-blue-700 mb-2">
                  Bin Area: <span className="text-gray-800">{complaint.binArea}</span>
                </h2>
                <p className="text-gray-700 mb-1">
                  <strong>Complaint:</strong> {complaint.complaint}
                </p>
                <p className="text-gray-600">
                  <strong>Status:</strong> {complaint.status}
                </p>
                <div className="mt-2 text-sm text-gray-500">
                  <p><strong>Date:</strong> {complaint.date}</p>
                  <p><strong>Time:</strong> {complaint.time}</p>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-center text-lg font-medium text-gray-700">
            You have not submitted any complaints yet.
          </p>
        )}
      </div>
    </div>
  );
};

export default MyComplaintPage;
