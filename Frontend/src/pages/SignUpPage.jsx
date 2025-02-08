import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthProvider";

const SignUpPage = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
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
      if (response.data && response.data.user) {
        toast.success("Account Created Successfully");

        const userEmail = response.data.user.email;
        const res = await axiosInstance.get(`/users/${userEmail}`);
        const userData = res.data;
        if (userData) {
          localStorage.setItem("User", JSON.stringify(userData));
          setAuthUser(userData);
        }
      }
    } catch (error) {
      console.error("Error: ", error);
      toast.error(error.response?.data.message || "An error occurred while creating the account");
    }
  };

  const InputField = ({ id, label, type = "text", placeholder, registerOptions }) => (
    <div className="flex flex-col">
      <label htmlFor={id} className="text-sm font-medium text-gray-600 mb-1">
        {label}
      </label>
      <div className="relative">
        <input
          type={type}
          id={id}
          placeholder={placeholder}
          className="w-full px-3 py-2 h-10 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          {...register(id, registerOptions)}
        />
        {errors[id] && (
          <span className="absolute text-sm text-red-500 top-full mt-1 block">{errors[id]?.message}</span>
        )}
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-green-600 flex items-center justify-center">
      <div className="bg-white shadow-xl rounded-xl p-6 w-[90%] max-w-md">
        <div className="flex flex-col items-center mb-6">
          <img src="/user.png" alt="User Avatar" className="h-16 w-16 rounded-full" />
          <h2 className="text-lg font-semibold text-gray-800 mt-2">User SignUp</h2>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          {/* Full Name Field */}
          <InputField
            id="name"
            label="Full Name"
            placeholder="John Doe"
            registerOptions={{ required: "Full Name is required" }}
          />

          {/* Email Field */}
          <InputField
            id="email"
            label="Email"
            type="email"
            placeholder="info@example.com"
            registerOptions={{ required: "Email is required" }}
          />

          {/* Password Field */}
          <InputField
            id="password"
            label="Password"
            type="password"
            placeholder="password"
            registerOptions={{
              required: "Password is required",
              minLength: { value: 6, message: "Password must be at least 6 characters long" },
            }}
          />

          {/* Mobile Number Field */}
          <InputField
            id="mobile"
            label="Mobile Number"
            type="text"
            placeholder="123-456-7890"
            registerOptions={{
              required: "Mobile number is required",
              pattern: {
                value: /^[0-9]{10}$/,
                message: "Please enter a valid 10-digit mobile number",
              },
            }}
          />

          {/* City Field */}
          <InputField
            id="city"
            label="City"
            placeholder="City Name"
            registerOptions={{ required: "City is required" }}
          />

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-purple-600 text-white py-2 rounded-lg font-medium shadow-md hover:bg-purple-700 transition"
          >
            SignUp
          </button>
        </form>

        {/* Sign In Link */}
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">
            Already have an account?{" "}
            <Link to="/user_login" className="text-blue-500 font-medium hover:underline">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
