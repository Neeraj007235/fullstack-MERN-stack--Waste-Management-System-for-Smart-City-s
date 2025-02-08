import React from 'react';
import { useAuth } from '../context/AuthProvider';
import { Link, useNavigate } from 'react-router-dom';
import { axiosInstance } from "../lib/axios.js";
import toast from 'react-hot-toast';
import DashboardHeader from '../components/DashboardHeader'; 
import Footer from '../components/Footer'; 

const UserPage = () => {
  const [authUser, setAuthUser] = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      setTimeout(() => {
        navigate("/");
      }, 0); 
      await axiosInstance.post("/users/logout");
      localStorage.removeItem("User");
      setAuthUser(null);
      toast.success("Logout Successfully");
    } catch (error) {
      toast.error("Error: " + error.message);
    }
  };

  const sections = [
    { title: "My Profile", image: 'https://img.icons8.com/plasticine/100/user.png', link: "/myprofile", bg: "bg-gradient-to-tr from-blue-600 to-blue-500" },
    { title: "New Complaints", image: 'https://img.icons8.com/external-flaticons-lineal-color-flat-icons/100/external-complaint-gdpr-icons-flaticons-lineal-color-flat-icons.png', link: "/new_complaint", bg: "bg-gradient-to-tr from-gray-600 to-gray-500" },  // Changed to gray
    { title: "My Complaints", image: 'https://img.icons8.com/external-flat-icons-pack-pongsakorn-tan/100/external-audit-gdpr-flat-icons-pack-pongsakorn-tan.png', link: "/my_complaint", bg: "bg-gradient-to-tr from-purple-600 to-purple-400" }
  ];  

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-900 via-blue-800 to-teal-700 text-white">
      {/* Use Header */}
      <DashboardHeader roleName="User" handleLogout={handleLogout} />

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-6 pt-16">
        <h1 className="text-3xl sm:text-4xl font-bold text-center mb-12">Welcome to Your Dashboard</h1>

        {/* Section Cards */}
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
            </Link>
          ))}
        </div>
      </div>

      {/* Use Footer */}
      <Footer />
    </div>
  );
};

export default UserPage;
