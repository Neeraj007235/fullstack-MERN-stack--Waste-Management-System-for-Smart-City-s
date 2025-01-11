import React from "react";
import { useForm } from "react-hook-form";
import { axiosInstance } from "../lib/axios.js";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";

const SignUpPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [authUser, setAuthUser] = useAuth();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    const userInfo = {
      name: data.name,
      email: data.email,
      password: data.password,
      mobile: data.mobile,
      city: data.city,
    };

    try {
      const response = await axiosInstance.post("/users/signup", userInfo);
      console.log(response.data);
      if (response.data && response.data.user) {
        toast.success("Account Created Successfully");

        // Extract the user's email from the response
        const userEmail = response.data.user.email;

        // Fetch the user details by email
        const res = await axiosInstance.get(`/users/${userEmail}`);
        const userData = res.data; // Ensure this contains the user info

        if (userData) {
          // Store user info in localStorage
          localStorage.setItem("Users", JSON.stringify(userData));

          // Update the auth user context
          setAuthUser(userData);
        }
      }
    } catch (error) {
      console.error("Error: ", error);
      toast.error("Error: " + error.response?.data.message || "An error occurred in creating account");
    }
  };

  return (
    <div className="min-h-screen bg-green-600 flex items-center justify-center">
      <div className="bg-white shadow-lg rounded-lg p-6 w-[90%] max-w-md">
        <div className="flex flex-col items-center">
          <div className="p-0">
            <img src="/user.png" alt="Admin Avatar" className="h-16 w-16" />
          </div>
          <h2 className="text-lg font-semibold text-gray-800 mt-2">User SignUp</h2>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
          {/* Full Name Field */}
          <div className="flex flex-col">
            <label htmlFor="name" className="text-sm font-medium text-gray-600 mb-1">
              Full Name
            </label>
            <div className="relative">
              <input
                type="text"
                id="name"
                placeholder="John Doe"
                className="w-full pl-3 pr-3 py-2 h-10 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                {...register("name", { required: true })}
              />
              {errors.name && (
                <span className="absolute text-sm text-red-500 top-full mt-1 block">Name is required</span>
              )}
            </div>
          </div>

          <br />

          {/* Email Field */}
          <div className="flex flex-col">
            <label htmlFor="email" className="text-sm font-medium text-gray-600 mb-1">
              Email
            </label>
            <div className="relative">
              <input
                type="email"
                id="email"
                placeholder="info@example.com"
                className="w-full pl-3 pr-3 py-2 h-10 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                {...register("email", { required: true })}
              />
              {errors.email && (
                <span className="absolute text-sm text-red-500 top-full mt-1 block">Email is required</span>
              )}
            </div>
          </div>

          <br />

          {/* Password Field */}
          <div className="flex flex-col">
            <label htmlFor="password" className="text-sm font-medium text-gray-600 mb-1">
              Password
            </label>
            <div className="relative">
              <input
                type="password"
                id="password"
                placeholder="password"
                className="w-full pl-3 pr-3 py-2 h-10 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                {...register("password", { required: true, minLength: 6 })}
              />
              {errors.password && (
                <span className="absolute text-sm text-red-500 top-full mt-1 block">
                  Password must be at least 6 characters long
                </span>
              )}
            </div>
          </div>

          <br />

          {/* Mobile Number Field */}
          <div className="flex flex-col">
            <label htmlFor="mobile" className="text-sm font-medium text-gray-600 mb-1">
              Mobile Number
            </label>
            <div className="relative">
              <input
                type="text"
                id="mobile"
                placeholder="123-456-7890"
                className="w-full pl-3 pr-3 py-2 h-10 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                {...register("mobile", { required: true, pattern: /^[0-9]{10}$/ })}
              />
              {errors.mobile && (
                <span className="absolute text-sm text-red-500 top-full mt-1 block">
                  Please enter a valid 10-digit mobile number
                </span>
              )}
            </div>
          </div>

          <br />

          {/* City Field */}
          <div className="flex flex-col">
            <label htmlFor="city" className="text-sm font-medium text-gray-600 mb-1">
              City
            </label>
            <div className="relative">
              <input
                type="text"
                id="city"
                placeholder="City Name"
                className="w-full pl-3 pr-3 py-2 h-10 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                {...register("city", { required: true })}
              />
              {errors.city && (
                <span className="absolute text-sm text-red-500 top-full mt-1 block">City is required</span>
              )}
            </div>
          </div>

          <br />

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-purple-600 text-white py-2 rounded-lg font-medium shadow-md hover:bg-purple-700 transition"
          >
            SignUp
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUpPage;
