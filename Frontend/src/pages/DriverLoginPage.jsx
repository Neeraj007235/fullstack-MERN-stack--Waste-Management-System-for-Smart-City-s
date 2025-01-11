import React from "react";
import { useForm } from "react-hook-form"
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { axiosInstance } from "../lib/axios.js";
import { useBio } from "../context/BioProvider";

const DriverLoginPage = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm()

    const [BioDriver, setBioDriver] = useBio();
    const navigate = useNavigate();

    const onSubmit = async (data) => {
        const driverInfo = {
            email: data.email,
            password: data.password
        };

        try {
            const response = await axiosInstance.post("/drivers/login", driverInfo);
            console.log(response.data);
            if (response.data) {
                toast.success("Loggedin Successfully");
                // Store user info in localStorage
                localStorage.setItem("Drivers", JSON.stringify(response.data.driver));
                setBioDriver(response.data.driver)
            }
        } catch (error) {
            console.error("Error: ", error);
            toast.error("Error: " + error.response?.data.message || "An error occurred");
        }
    };

    return (
        <div className="min-h-screen bg-green-600 flex items-center justify-center">
            {/* Login Card */}
            <div className="bg-white shadow-lg rounded-lg p-8 w-[90%] max-w-md">
                <div className="flex flex-col items-center">
                    <div className="p-0">
                        <img
                            src="/user.png"
                            alt="Admin Avatar"
                            className="h-20 w-25"
                        />
                    </div>
                    <h2 className="text-lg font-semibold text-gray-800 mt-4">Driver</h2>
                </div>

                {/* Login Form */}
                <form className="mt-8 space-y-4" onSubmit={handleSubmit(onSubmit)}>
                    {/* Email Input */}
                    <div className="flex flex-col">
                        <label htmlFor="email" className="text-sm font-medium text-gray-600 mb-1">
                            Email
                        </label>
                        <div className="relative">
                            <input
                                type="email"
                                id="email"
                                placeholder="info@example.com"
                                className="w-full pl-12 pr-3 py-3 h-12 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                {...register("email", { required: true })}
                            />
                            {errors.email && <span className="absolute text-sm text-red-500 top-full mt-1 block">This field is required</span>}
                            <div className="absolute inset-y-0 left-3 flex items-center justify-center text-gray-500">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="#000000" fill="none">
                                    <path d="M2 5L8.91302 8.92462C11.4387 10.3585 12.5613 10.3585 15.087 8.92462L22 5" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round" />
                                    <path d="M21.996 10.5024C21.9933 10.1357 21.9894 9.77017 21.9842 9.5265C21.9189 6.46005 21.8862 4.92682 20.7551 3.79105C19.6239 2.65528 18.0497 2.61571 14.9012 2.53658C12.9607 2.48781 11.0393 2.48781 9.09882 2.53657C5.95033 2.6157 4.37608 2.65526 3.24495 3.79103C2.11382 4.92681 2.08114 6.46003 2.01576 9.52648C1.99474 10.5125 1.99475 11.4926 2.01577 12.4786C2.08114 15.5451 2.11383 17.0783 3.24496 18.2141C4.37608 19.3498 5.95033 19.3894 9.09883 19.4685C9.7068 19.4838 10.4957 19.4943 11 19.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                    <path d="M15.586 18.6482C14.9572 19.0167 13.3086 19.7693 14.3127 20.711C14.8032 21.171 15.3495 21.5 16.0364 21.5H19.9556C20.6424 21.5 21.1887 21.171 21.6792 20.711C22.6834 19.7693 21.0347 19.0167 20.4059 18.6482C18.9314 17.7839 17.0605 17.7839 15.586 18.6482Z" stroke="currentColor" stroke-width="1.5" />
                                    <path d="M19.996 14C19.996 15.1046 19.1005 16 17.996 16C16.8914 16 15.996 15.1046 15.996 14C15.996 12.8954 16.8914 12 17.996 12C19.1005 12 19.996 12.8954 19.996 14Z" stroke="currentColor" stroke-width="1.5" />
                                </svg>
                            </div>
                        </div>
                    </div>

                    <br />

                    {/* Password Input */}
                    <div className="flex flex-col">
                        <label htmlFor="password" className="text-sm font-medium text-gray-600 mb-1">
                            Password
                        </label>
                        <div className="relative">
                            <input
                                type="password"
                                id="password"
                                placeholder="password"
                                className="w-full pl-12 pr-3 py-3 h-12 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                {...register("password", { required: true })}
                            />
                            {errors.password && <span className="absolute text-sm text-red-500 top-full mt-1 block">This field is required</span>}
                            <div className="absolute inset-y-0 left-3 flex items-center justify-center text-gray-500">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="#000000" fill="none">
                                    <path d="M4.26781 18.8447C4.49269 20.515 5.87613 21.8235 7.55966 21.9009C8.97627 21.966 10.4153 22 12 22C13.5847 22 15.0237 21.966 16.4403 21.9009C18.1239 21.8235 19.5073 20.515 19.7322 18.8447C19.879 17.7547 20 16.6376 20 15.5C20 14.3624 19.879 13.2453 19.7322 12.1553C19.5073 10.485 18.1239 9.17649 16.4403 9.09909C15.0237 9.03397 13.5847 9 12 9C10.4153 9 8.97627 9.03397 7.55966 9.09909C5.87613 9.17649 4.49269 10.485 4.26781 12.1553C4.12105 13.2453 4 14.3624 4 15.5C4 16.6376 4.12105 17.7547 4.26781 18.8447Z" stroke="currentColor" stroke-width="1.5" />
                                    <path d="M7.5 9V6.5C7.5 4.01472 9.51472 2 12 2C14.4853 2 16.5 4.01472 16.5 6.5V9" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                    <path d="M16 15.49V15.5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                    <path d="M12 15.49V15.5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                    <path d="M8 15.49V15.5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                </svg>
                            </div>
                        </div>
                    </div>

                    <br />

                    {/* Login Button */}
                    <button
                        type="submit"
                        className="w-full bg-purple-600 text-white py-3 rounded-lg font-medium shadow-md hover:bg-purple-700 transition"
                    >
                        Log In
                    </button>
                </form>
            </div>
        </div>
    );
};

export default DriverLoginPage;
