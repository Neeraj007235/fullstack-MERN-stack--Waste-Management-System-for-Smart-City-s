import React from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { axiosInstance } from "../lib/axios.js";
import { toast } from "react-hot-toast";
import { Lock, Mail } from "lucide-react";

const LoginPage = ({ userType, setUser, showAdditionalLinks, loginUrl }) => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    const userInfo = { email: data.email, password: data.password };
    try {
      const response = await axiosInstance.post(loginUrl, userInfo);
      if (response.data) {
        toast.success(`${userType} logged in successfully!`);
        // If the user type is 'User', perform an additional API call
        if (userType === "User" && response.data.user) {
          const userEmail = response.data.user.email;
          const userRes = await axiosInstance.get(`/users/${userEmail}`);
          if (userRes.data) {
            localStorage.setItem("User", JSON.stringify(userRes.data)); // Store full user data in localStorage
            setUser(userRes.data); // Set the authenticated user in context
          }
        } else {
          localStorage.setItem(userType, JSON.stringify(response.data[userType.toLowerCase()]));
          setUser(response.data[userType.toLowerCase()]); // Set the authenticated admin or driver in context
        }
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error(error.response?.data?.message || "An error occurred. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-green-600 flex items-center justify-center">
      {/* Login Card */}
      <div className="bg-white shadow-xl rounded-xl p-8 w-[90%] max-w-md">
        <div className="flex flex-col items-center">
          <img src="/user.png" alt={`${userType} Avatar`} className="h-20 w-20 rounded-full" />
          <h2 className="text-xl font-semibold text-gray-800 mt-4">{`${userType} Login`}</h2>
        </div>

        {/* Login Form */}
        <form className="mt-8 space-y-10" onSubmit={handleSubmit(onSubmit)}>
          {/* Email Input */}
          <div className="flex flex-col">
            <label htmlFor="email" className="text-sm font-medium text-gray-600 mb-1">Email</label>
            <div className="relative">
              <input
                type="email"
                id="email"
                placeholder="info@example.com"
                className="w-full pl-12 pr-3 py-3 h-12 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                {...register("email", { required: "Email is required" })}
              />
              {errors.email && <span className="absolute text-sm text-red-500 top-full mt-2 block">{errors.email.message}</span>}
              <div className="absolute inset-y-0 left-3 flex items-center justify-center text-gray-500">
                <Mail size={20} />
              </div>
            </div>
          </div>

          {/* Password Input */}
          <div className="flex flex-col">
            <label htmlFor="password" className="text-sm font-medium text-gray-600 mb-1">Password</label>
            <div className="relative">
              <input
                type="password"
                id="password"
                placeholder="Enter password"
                className="w-full pl-12 pr-3 py-3 h-12 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                {...register("password", { required: "Password is required" })}
              />
              {errors.password && <span className="absolute text-sm text-red-500 top-full mt-2 block">{errors.password.message}</span>}
              <div className="absolute inset-y-0 left-3 flex items-center justify-center text-gray-500">
                <Lock size={20} />
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-purple-600 text-white py-3 rounded-lg font-medium shadow-md hover:bg-purple-700 transition"
          >
            Log In
          </button>
        </form>

        {showAdditionalLinks && (
          <div className="flex flex-col items-center mt-4">
            <Link
              to="/forgot-password"
              className="text-sm text-blue-500 hover:underline"
            >
              Forgot Password?
            </Link>
            <p className="mt-2 text-sm text-gray-600">
              Don't have an account?{" "}
              <Link
                to="/register"
                className="text-blue-500 font-medium hover:underline"
              >
                Sign Up now
              </Link>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default LoginPage;
