import React, { useState, useEffect } from "react";
import { axiosInstance } from "../lib/axios.js";
import { useParams, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ResetPasswordPage = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState("");
  const { token } = useParams();
  const navigate = useNavigate();

  // Handle password change
  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    evaluatePasswordStrength(value);
  };

  // Handle confirm password change
  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  // Password strength evaluation function
  const evaluatePasswordStrength = (password) => {
    const lengthCriteria = password.length >= 8;
    const numberCriteria = /[0-9]/.test(password);
    const upperCaseCriteria = /[A-Z]/.test(password);
    const lowerCaseCriteria = /[a-z]/.test(password);
    const specialCharCriteria = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    if (lengthCriteria && numberCriteria && upperCaseCriteria && lowerCaseCriteria && specialCharCriteria) {
      setPasswordStrength("Strong");
    } else if (lengthCriteria && (upperCaseCriteria || lowerCaseCriteria)) {
      setPasswordStrength("Medium");
    } else {
      setPasswordStrength("Weak");
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!password || !confirmPassword) {
      toast.error("Please enter both password and confirmation.");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    if (passwordStrength === "Weak") {
      toast.error("Please choose a stronger password.");
      return;
    }

    setLoading(true);

    try {
      const response = await axiosInstance.post(
        `/users/reset-password/${token}`,
        { password }
      );

      toast.success(response.data.message || "Password reset successful.");
      setTimeout(() => {
        navigate("/user_login");
      }, 3000);
    } catch (error) {
      if (error.response?.status === 400 && error.response?.data?.message === "Invalid or expired token") {
        toast.error("This token is invalid or expired. Please try again.");
      } else {
        toast.error(error.response?.data?.message || "Error resetting password. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  // Check if the token is valid when the component mounts
  useEffect(() => {
    // You can call an API here to validate the token if needed
    // Example: axios.get(`/api/validate-token/${token}`);
  }, [token]);

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-400 to-green-400 py-10 flex justify-center items-center">
      <div className="max-w-md w-full bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-center mb-6 text-gray-700">Reset Your Password</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              New Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={handlePasswordChange}
              placeholder="Enter new password"
              className={`w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${passwordStrength === "Weak" ? "border-red-500" : ""}`}
              required
            />
            <p className="text-xs text-gray-500">
              {passwordStrength && `Password Strength: ${passwordStrength}`}
            </p>
          </div>
          <div className="mb-4">
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
              placeholder="Confirm new password"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
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
              "Reset Password"
            )}
          </button>
        </form>
        <ToastContainer />
      </div>
    </div>
  );
};

export default ResetPasswordPage;
