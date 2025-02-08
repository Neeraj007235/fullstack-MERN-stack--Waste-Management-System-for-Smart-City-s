import React, { useState, useEffect } from 'react';
import { axiosInstance } from "../lib/axios.js";

const MyComplaintPage = () => {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);

  const user = JSON.parse(localStorage.getItem("User"));
  const userEmail = user?.email;

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

  // Function to determine border and status badge styles
  const getStatusStyles = (status) => {
    switch (status.toLowerCase()) {
      case 'pending':
        return 'border-yellow-500 bg-yellow-50 text-yellow-700';
      case 'resolved':
        return 'border-green-500 bg-green-50 text-green-700';
      case 'rejected':
        return 'border-red-500 bg-red-50 text-red-700';
    }
  };

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
              <li
                key={complaint._id}
                className={`p-5 border-l-4 rounded-md shadow-md ${getStatusStyles(complaint.status)}`}
              >
                <h2 className="text-2xl font-semibold mb-2">
                  Bin Area: <span className="text-gray-800">{complaint.binArea}</span>
                </h2>
                <p className="text-gray-700 mb-1">
                  <strong>Complaint:</strong> {complaint.complaint}
                </p>
                {/* Status with Label */}
                <p className="text-gray-600 font-medium">
                  <strong>Status: </strong>
                  <span className={`inline-block py-1 text-sm font-semibold rounded-lg ${getStatusStyles(complaint.status)}`}>
                    {complaint.status}
                  </span>
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
