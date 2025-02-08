import React, { useState, useEffect } from 'react';
import { axiosInstance } from "../lib/axios.js";

const ViewReportPage = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axiosInstance.get("/find")
      .then((response) => {
        setReports(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching reports:', error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="border-t-4 border-blue-500 w-16 h-16 rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-blue-300 via-blue-500 to-blue-700 min-h-screen p-4 sm:p-6 lg:p-8 xl:p-12">
      {/* Enhanced Heading */}
      <h1 className="text-4xl font-bold text-cyan-100 mb-6 text-center">Daily Driver Reports</h1>

      {/* Reports Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
        {reports.length > 0 ? (
          reports.map((report) => (
            <div
              key={report.id}
              className="bg-white shadow-xl rounded-lg overflow-hidden flex flex-col justify-between hover:shadow-2xl hover:scale-95 transition-all duration-300 ease-in-out"
            >
              <div className="p-6">
                <h2 className="text-xl font-semibold text-blue-500 mb-2">Bin Area: {report.area}</h2>
                <p className="text-gray-700 mb-1">Work Status: <span className={`font-medium ${report.status === 'Completed' ? 'text-green-600' : report.status === 'Incomplete' ? 'text-red-600' : 'text-yellow-600'}`}>{report.status}</span></p>
                <p className="text-gray-700 mb-1">Date: {report.date}</p>
                <p className="text-gray-700 mb-1">Time: {report.time}</p>
                <p className="text-gray-700">Driver Email: <a href={`mailto:${report.email}`} className="text-blue-500 hover:underline">{report.email}</a></p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-center col-span-full">No reports available.</p>
        )}
      </div>
    </div>
  );
};

export default ViewReportPage;
