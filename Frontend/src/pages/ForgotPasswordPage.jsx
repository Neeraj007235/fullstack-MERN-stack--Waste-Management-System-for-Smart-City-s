import React, { useState } from "react";
import { axiosInstance } from "../lib/axios.js";
import { Link, useNavigate } from "react-router-dom"; 
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [isValidEmail, setIsValidEmail] = useState(true);  // To track email validation
  const navigate = useNavigate(); 

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setIsValidEmail(true); // Reset validation flag on every change
  };

  // Validate email format
  const validateEmail = (email) => {
    const regex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
    return regex.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      toast.error("Please enter your email address.");
      return;
    }

    // Validate email format before sending
    if (!validateEmail(email)) {
      setIsValidEmail(false);
      toast.error("Please enter a valid email address.");
      return;
    }

    setLoading(true);

    try {
      const response = await axiosInstance.post(
        "/users/forgot-password",
        { email }
      );

      toast.success(response.data.message || "Password reset link sent to your email.");
      setEmail("");  // Clear email input on success
      setTimeout(() => {
        navigate("/user_login"); // Redirect to login page after success
      }, 3000);
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Error sending password reset email. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-400 to-green-400 py-10 flex justify-center items-center">
      <div className="max-w-md w-full bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-center mb-6 text-gray-700">Forgot Your Password?</h2>
        <p className="text-center text-sm text-gray-600 mb-4">
          Enter your email address and we'll send you a link to reset your password.
        </p>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={handleEmailChange}
              placeholder="Enter your email"
              className={`w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${!isValidEmail ? "border-red-500" : ""}`}
              required
            />
            {!isValidEmail && (
              <p className="text-red-500 text-xs mt-2">Please enter a valid email address.</p>
            )}
          </div>
          <button
            type="submit"
            className={`w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition disabled:bg-gray-400 ${loading ? "cursor-not-allowed" : ""}`}
            disabled={loading}
          >
            {loading ? (
              <div className="flex justify-center">
                <div className="animate-spin border-t-2 border-white w-6 h-6 border-solid rounded-full"></div>
              </div>
            ) : (
              "Send Reset Link"
            )}
          </button>
        </form>

        <div className="mt-4 text-center">
          <p className="text-sm">
            Remembered your password?{" "}
            <Link to="/user_login" className="text-blue-500 hover:underline">
              Login here
            </Link>
          </p>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default ForgotPasswordPage;
