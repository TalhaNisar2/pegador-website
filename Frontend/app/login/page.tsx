"use client";

import React, { useState, useContext, ChangeEvent, FormEvent } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";
import summaryApi from "../common/index";
import Context from "../context/index";

interface LoginData {
  email: string;
  password: string;
}

const LoginForm: React.FC = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [data, setData] = useState<LoginData>({ email: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);

  const context = useContext(Context);
  if (!context) {
    throw new Error("LoginForm must be wrapped inside Context.Provider");
  }
  const { fetchUserDetails, fetchUserAddToCart, fetchUserWishlistCount } = context;

  const handleTogglePassword = () => setShowPassword(!showPassword);

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await fetch(summaryApi.signIn.url, {
        method: summaryApi.signIn.method,
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (res.ok) {
        toast.success("Login successful!", {
          style: { background: "linear-gradient(to right, #4a90e2, #9013fe)", color: "white" },
          autoClose: 2000,
        });

        // Fetch user data after login
        await fetchUserDetails();
        await fetchUserAddToCart();
        await fetchUserWishlistCount();

        // Redirect to home
        setTimeout(() => {
          router.push("/");
        }, 2000);
      } else {
        toast.error(result.message || "Failed to login. Please try again.", {
          style: { background: "linear-gradient(to right, #e94e77, #ff6b6b)", color: "white" },
          autoClose: 3000,
        });
      }
    } catch (err) {
      toast.error("An unexpected error occurred. Please try again.", {
        style: { background: "linear-gradient(to right, #e94e77, #ff6b6b)", color: "white" },
        autoClose: 3000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="w-full max-w-md p-8 bg-white shadow-lg rounded-lg border border-gray-300">
          <form onSubmit={handleSubmit}>
            {/* Email */}
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700 mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Enter your email"
                onChange={handleOnChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              />
            </div>

            {/* Password */}
            <div className="mb-6 relative">
              <label htmlFor="password" className="block text-gray-700 mb-2">
                Password
              </label>
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                placeholder="Enter your password"
                onChange={handleOnChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              />
              <button
                type="button"
                onClick={handleTogglePassword}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>

            {/* Submit */}
            <div className="mb-4">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold rounded-md hover:from-blue-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {isLoading ? "Logging in..." : "Login"}
              </button>
            </div>

            {/* Sign Up Link */}
            <div className="text-center">
              <p className="text-gray-700">
                Don't have an account?{" "}
                <a href="/signup" className="text-blue-500 hover:text-blue-700 font-bold">
                  Sign Up
                </a>
              </p>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default LoginForm;
