import React, { useState, useEffect } from "react";
import { axiosInstance } from "../lib/axios.js";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ViewComplaintsPage = () => {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch complaints from API
  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const res = await axiosInstance.get("/complaints");
        setComplaints(res.data);
      } catch (error) {
        console.error("Error fetching complaints:", error);
        toast.error("Failed to fetch complaints. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchComplaints();
  }, []);

  // Function to update the status of a complaint
  const updateStatus = async (id, status) => {
    try {
      await axiosInstance.put(`/complaints/${id}`, { status });
      setComplaints(
        complaints.map((complaint) =>
          complaint._id === id ? { ...complaint, status } : complaint
        )
      );
      toast.success(`Complaint status updated to "${status}"`);
    } catch (error) {
      console.error("Failed to update status:", error);
      toast.error("Failed to update complaint status.");
    }
  };

  // Loading spinner
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="border-t-4 border-blue-500 w-16 h-16 rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 to-purple-500 py-10">
      <div className="max-w-7xl mx-auto bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-4xl font-bold text-center mb-6 text-gray-800">
          User Complaints
        </h1>

        {complaints.length > 0 ? (
          complaints.map((complaint) => (
            <div
              key={complaint._id}
              className={`p-6 rounded-md shadow-md mb-6 ${complaint.status === "Resolved"
                ? "bg-green-50 border-l-4 border-green-500"
                : complaint.status === "Rejected"
                  ? "bg-red-50 border-l-4 border-red-500"
                  : "bg-yellow-50 border-l-4 border-yellow-500"
                }`}
            >
              <p className="text-lg font-medium">
                <strong>Bin Area:</strong> {complaint.binArea}
              </p>
              <p className="text-lg font-medium">
                <strong>Complaint:</strong> {complaint.complaint}
              </p>
              <p className="text-gray-600">
                <strong>User Email:</strong> {complaint.userEmail}
              </p>
              <p className="text-gray-600">
                <strong>Date:</strong> {complaint.date}
              </p>
              <p className="text-gray-600">
                <strong>Time:</strong> {complaint.time}
              </p>
              <p
                className={`mt-4 text-sm font-bold inline-block py-1 px-4 rounded-md ${complaint.status === "Resolved"
                  ? "text-green-700 bg-green-100"
                  : complaint.status === "Rejected"
                    ? "text-red-700 bg-red-100"
                    : "text-yellow-700 bg-yellow-100"
                  }`}
              >
                Status: {complaint.status}
              </p>

              <div className="mt-4 flex space-x-3">
                {complaint.status !== "Resolved" && (
                  <button
                    onClick={() => updateStatus(complaint._id, "Resolved")}
                    className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md transition duration-300"
                  >
                    Mark Resolved
                  </button>
                )}
                {complaint.status !== "Rejected" && (
                  <button
                    onClick={() => updateStatus(complaint._id, "Rejected")}
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md transition duration-300"
                  >
                    Mark Rejected
                  </button>
                )}
                {complaint.status !== "Pending" && (
                  <button
                    onClick={() => updateStatus(complaint._id, "Pending")}
                    className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-md transition duration-300"
                  >
                    Mark Pending
                  </button>
                )}
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-700 mt-6 text-lg">
            No complaints found.
          </p>
        )}
      </div>

      {/* Toast Container */}
      <ToastContainer />
    </div>
  );
};

export default ViewComplaintsPage;
