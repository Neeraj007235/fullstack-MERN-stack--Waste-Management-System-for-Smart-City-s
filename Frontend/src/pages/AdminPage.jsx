import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAdmin } from '../context/AdminProvider';
import toast from 'react-hot-toast';
import { axiosInstance } from "../lib/axios.js";
import DashboardHeader from "../components/DashboardHeader" 
import Footer from '../components/Footer';  

const AdminPage = () => {
  const navigate = useNavigate();
  const [Admin, setAdmin] = useAdmin();

  const handleLogout = async () => {
    try {
      setTimeout(() => {
        navigate("/");
      }, 0); // This will redirect to Home Page after a delay
      await axiosInstance.post("/admins/logout");
      localStorage.removeItem("Admin");
      setAdmin(null);  // Set Admin state to null
      toast.success("Logged out successfully");
    } catch (error) {
      toast.error("Error: " + error.message);
    }
  };

  const sections = [
    { title: "Create Bin", image: "/Bin.png", link: "/createbin", bg: "bg-gradient-to-tr from-green-500 to-teal-400" },
    { title: "Update Bin", image: "/UpdateBin.jpg", link: "/updatebin", bg: "bg-gradient-to-tr from-orange-400 to-red-400" },
    { title: "Add Driver", image: "https://img.icons8.com/fluency/96/driver.png", link: "/adddriver", bg: "bg-gradient-to-tr from-purple-500 to-pink-400" },
    { title: "View Drivers", image: "https://img.icons8.com/fluency/96/group.png", link: "/viewdrivers", bg: "bg-gradient-to-tr from-blue-500 to-indigo-400" },
    { title: "View Complaints", image: "https://img.icons8.com/fluency/96/complaint.png", link: "/viewcomplaints", bg: "bg-gradient-to-tr from-yellow-500 to-orange-400" },
    { title: "View Work Report", image: "https://img.icons8.com/fluency/96/report-card.png", link: "/viewworkreport", bg: "bg-gradient-to-tr from-gray-500 to-gray-400" },
    { title: "User Details", image: "/UserPhoto.png", link: "/userdetails", bg: "bg-gradient-to-tr from-pink-500 to-red-400" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
      {/* Use Header */}
      <DashboardHeader roleName="Admin" handleLogout={handleLogout} />

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-6 pt-16">
        <h1 className="text-4xl font-bold text-center mb-12">Manage Your System</h1>

        {/* Grid Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {sections.map(({ title, image, link, bg }, index) => (
            <Link
              to={link}
              key={index}
              className={`relative flex flex-col items-center ${bg} text-white rounded-lg shadow-lg p-8 hover:scale-105 transform transition duration-300 ease-in-out group`}
            >
              <img
                src={image}
                alt={title}
                className="w-24 h-24 mb-4 rounded-full bg-white p-2 shadow-md transform group-hover:rotate-6 transition duration-300"
                loading="lazy"
              />
              <h2 className="text-xl font-bold tracking-wide">{title}</h2>
              <div className="absolute inset-0 bg-black bg-opacity-10 rounded-lg group-hover:bg-opacity-30 transition duration-300"></div>
            </Link>
          ))}
        </div>
      </div>

      {/* Use Footer */}
      <Footer />
    </div>
  );
};

export default AdminPage;
