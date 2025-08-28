"use client";

import React, { useState, ChangeEvent, FormEvent } from 'react';
import { FaEye, FaEyeSlash, FaUserCircle } from 'react-icons/fa';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { imageToBase64 } from '../helpers/imageTobase64';
import summaryApi from "../common/index";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import zxcvbn from 'zxcvbn';

interface SignUpData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  profilePicture: File | null;
}

const SignUpPage: React.FC = () => {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [data, setData] = useState<SignUpData>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    profilePicture: null,
  });
  const [profilePicBase64, setProfilePicBase64] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [passwordStrength, setPasswordStrength] = useState("");
  const [passwordGuidelines, setPasswordGuidelines] = useState("");

  const handleTogglePassword = () => setShowPassword(!showPassword);
  const handleToggleConfirmPassword = () => setShowConfirmPassword(!showConfirmPassword);

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData(prev => ({ ...prev, [name]: value }));

    if (name === "password") {
      const { score, feedback } = zxcvbn(value);
      let strength = "Weak";
      if (score === 2) strength = "Medium";
      else if (score >= 3) strength = "Strong";
      setPasswordStrength(strength);
      setPasswordGuidelines(feedback.suggestions.join(' '));
    }
  };

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    setData(prev => ({ ...prev, profilePicture: file }));

    if (file) {
      try {
        const base64 = await imageToBase64(file);
        setProfilePicBase64(base64);
      } catch (err) {
        console.error("Error converting image to base64:", err);
      }
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (data.password !== data.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setError("");

    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("email", data.email);
    formData.append("password", data.password);
    if (data.profilePicture) formData.append("profilePic", data.profilePicture);

    try {
      const response = await fetch(summaryApi.signUp.url, {
        method: summaryApi.signUp.method,
        body: formData
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || `HTTP error! status: ${response.status}`);
      }

      toast.success('User successfully created!', {
        style: { background: 'linear-gradient(to right, #4a90e2, #9013fe)', color: 'white' }
      });

      setTimeout(() => {
        router.push('/login');
      }, 2000);

    } catch (err: any) {
      console.error("Error signing up:", err);
      toast.error(err.message || 'Failed to sign up. Please try again.', {
        style: { background: 'linear-gradient(to right, #e94e77, #ff6b6b)', color: 'white' }
      });
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 mt-4 mb-20">
      <div className="w-full max-w-md p-8 bg-white gradient-shadow rounded-lg border border-gray-300">
        <div className="flex flex-col items-center mb-4">
          {profilePicBase64 ? (
            <img src={profilePicBase64} alt="Profile" className="w-24 h-24 rounded-full object-cover mb-2" />
          ) : (
            <FaUserCircle size={50} className="text-gray-700 mb-2" />
          )}
          <label className="text-blue-500 hover:text-blue-700 cursor-pointer">
            <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
            Upload Photo
          </label>
        </div>

        <form onSubmit={handleSubmit}>
          {/* First Name */}
          <div className="mb-4">
            <label htmlFor="firstName" className="block text-gray-700 mb-1 font-medium"> Name</label>
            <input
              type="text"
              id="Name"
              name="name"
              placeholder="Enter your name"
              onChange={handleOnChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 placeholder-gray-400"
            />
          </div>

          

          {/* Email */}
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 mb-1 font-medium">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              onChange={handleOnChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 placeholder-gray-400"
            />
          </div>

          {/* Password */}
          <div className="relative mb-4">
            <label htmlFor="password" className="block text-gray-700 mb-1 font-medium">Password</label>
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              name="password"
              placeholder="Enter your password"
              onChange={handleOnChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 placeholder-gray-400"
            />
            <button type="button" onClick={handleTogglePassword} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          {/* Confirm Password */}
          <div className="relative mb-4">
            <label htmlFor="confirmPassword" className="block text-gray-700 mb-1 font-medium">Confirm Password</label>
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              id="confirmPassword"
              name="confirmPassword"
              placeholder="Confirm your password"
              onChange={handleOnChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 placeholder-gray-400"
            />
            <button type="button" onClick={handleToggleConfirmPassword} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
              {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          {/* Password Strength */}
          <div className="mb-4">
            <label className="block text-gray-700 mb-1 font-medium">Password Strength</label>
            <div className={`password-strength ${passwordStrength.toLowerCase()}`}>
              {passwordStrength}
            </div>
            <p className="text-sm text-gray-500 mt-1">{passwordGuidelines}</p>
          </div>

          {/* Error */}
          {error && <div className="mb-4 text-red-500">{error}</div>}

          {/* Submit Button */}
          <div className="mb-6">
            <button type="submit" className="w-full px-4 py-2 gradient-button text-white font-bold rounded-md hover:from-blue-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
              Sign Up
            </button>
          </div>

          {/* Login Link */}
          <div className="text-center mt-4">
            <p className="text-gray-700">
              Already have an account?{' '}
              <Link href="/login" className="text-blue-500 hover:text-blue-700 font-bold">
                Login
              </Link>
            </p>
          </div>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default SignUpPage;
