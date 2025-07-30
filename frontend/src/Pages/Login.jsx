import React, { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
import wellnessContext from "../context/wellnessContext";

const Login = () => {
  const {
    user,
    token,
    loginFetch,
    logoutFetch,
    loading,
    error,
  } = useContext(wellnessContext);

  const navigate = useNavigate();

  // Navigate to homepage if login is successful (i.e., token exists)
  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token, navigate]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    await loginFetch(data.email, data.password);
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left Section */}
      <div className="w-full md:w-1/2 bg-white p-8 flex flex-col justify-center">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          className="max-w-md w-full mx-auto"
        >
          <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
            Welcome Back
          </h1>

          {error && (
            <p className="text-red-500 text-center text-sm mb-2">{error}</p>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <input
                type="email"
                placeholder="Your Email"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                {...register("email", { required: "Email is required" })}
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div>
              <input
                type="password"
                placeholder="Your Password"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                })}
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            <div className="flex items-center justify-end text-sm">
              <Link to="#" className="text-blue-600 hover:underline">
                Forgot password?
              </Link>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-700 text-white py-2 rounded-md hover:bg-blue-800 transition"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Log in"}
            </button>
          </form>

          <p className="text-center mt-4 text-sm">
            Don’t have an account yet?{" "}
            <Link to="/register" className="text-blue-600 hover:underline">
              Sign up
            </Link>
          </p>
        </motion.div>
      </div>

      {/* Right Section */}
      <div className="w-full md:w-1/2 bg-blue-50 hidden md:flex flex-col justify-center items-center p-8 text-center">
        <motion.img
          src="https://i.pinimg.com/736x/14/8f/d0/148fd06c77107a117f94f0419d0fa3e3.jpg"
          alt="Illustration"
          className="w-4/5 max-w-md"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        />
        <div className="mt-6">
          <h2 className="text-lg font-semibold text-gray-800">
            New Update Available
          </h2>
          <p className="text-gray-600 text-sm mt-2">
            We have added some new awesome features.
          </p>
          <button className="mt-4 px-4 py-2 bg-white border border-gray-300 rounded hover:shadow">
            Learn More
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
