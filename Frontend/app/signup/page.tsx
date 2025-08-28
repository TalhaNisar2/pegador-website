"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Input } from "@/app/Components/ui/input";
import { Button } from "@/app/Components/ui/button";
import { Label } from "@/app/Components/ui/label";
import { Eye, EyeOff } from "lucide-react"; // optional icon library
import axios from "axios";
export default function SignUpPage() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [profilePic, setProfilePic] = useState<File | null>(null);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    try{

      const res=await axios.post("http://localhost:8000/api/signup",{
        firstName,
      lastName,
      email,
      password,
      confirmPassword,
      profilePic,
    })
  }catch(err){
    console.log('Error', err)
  }
    console.log({
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
      profilePic,
    });
  };

  const handleProfilePicChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setProfilePic(e.target.files[0]);
    }
  };

  const openFilePicker = () => {
    fileInputRef.current?.click();
  };

  // Determine password strength
  const getPasswordStrength = (pass: string) => {
    let strength = 0;
    if (pass.length >= 8) strength++;
    if (/[A-Z]/.test(pass)) strength++;
    if (/[0-9]/.test(pass)) strength++;
    if (/[^A-Za-z0-9]/.test(pass)) strength++;
    switch (strength) {
      case 0:
      case 1:
        return { label: "Weak", color: "bg-red-500" };
      case 2:
      case 3:
        return { label: "Medium", color: "bg-yellow-500" };
      case 4:
        return { label: "Strong", color: "bg-green-500" };
      default:
        return { label: "", color: "bg-gray-300" };
    }
  };

  const passwordStrength = getPasswordStrength(password);

  return (
    <div className="relative flex items-center justify-center min-h-screen bg-gray-100 overflow-hidden">
      {/* Background shapes */}
      <div className="absolute -top-32 -left-32 w-72 h-72 bg-gray-300 rounded-full blur-3xl opacity-20"></div>
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-gray-400 rounded-full blur-3xl opacity-15"></div>

      <motion.div
        initial={{ opacity: 0, y: 50, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 w-full max-w-md p-10 rounded-3xl backdrop-blur-lg bg-white/80 border border-gray-300 shadow-2xl"
      >
        <motion.h1
          className="text-4xl md:text-5xl font-extrabold text-center text-black mb-8 tracking-wider"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          Sign Up
        </motion.h1>

        <form onSubmit={handleSignUp} className="space-y-6">
          {/* Profile Picture */}
          <div className="flex flex-col items-center">
            <Label className="text-gray-700 font-medium mb-2">Profile Picture</Label>
            <div
              onClick={openFilePicker}
              className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center cursor-pointer border border-gray-300 overflow-hidden hover:opacity-80 transition"
            >
              {profilePic ? (
                <img
                  src={URL.createObjectURL(profilePic)}
                  alt="Profile Preview"
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-gray-500 text-2xl">+</span>
              )}
            </div>
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              onChange={handleProfilePicChange}
              className="hidden"
            />
          </div>

          {/* First and Last Name */}
          <div className="flex gap-4">
            <div className="flex-1">
              <Label htmlFor="firstName" className="text-gray-700 font-medium">
                First Name
              </Label>
              <Input
                id="firstName"
                type="text"
                placeholder="John"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="mt-2 bg-gray-100 text-black placeholder-gray-500 border-gray-300 focus:ring-2 focus:ring-gray-500"
              />
            </div>
            <div className="flex-1">
              <Label htmlFor="lastName" className="text-gray-700 font-medium">
                Last Name
              </Label>
              <Input
                id="lastName"
                type="text"
                placeholder="Doe"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="mt-2 bg-gray-100 text-black placeholder-gray-500 border-gray-300 focus:ring-2 focus:ring-gray-500"
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <Label htmlFor="email" className="text-gray-700 font-medium">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-2 bg-gray-100 text-black placeholder-gray-500 border-gray-300 focus:ring-2 focus:ring-gray-500"
            />
          </div>

          {/* Password */}
          <div>
            <Label htmlFor="password" className="text-gray-700 font-medium">
              Password
            </Label>
            <div className="relative mt-2">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-gray-100 text-black placeholder-gray-500 border-gray-300 focus:ring-2 focus:ring-gray-500 pr-12"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-black"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {/* Password Strength Bar */}
            {password && (
              <div className="h-2 w-full rounded-full bg-gray-300 mt-2">
                <div
                  className={`h-2 rounded-full ${passwordStrength.color}`}
                  style={{ width: `${(passwordStrength.label === "Weak" ? 33 : passwordStrength.label === "Medium" ? 66 : 100)}%` }}
                ></div>
                <p className="text-sm text-gray-700 mt-1">{passwordStrength.label}</p>
              </div>
            )}
          </div>

          {/* Confirm Password */}
          <div>
            <Label htmlFor="confirmPassword" className="text-gray-700 font-medium">
              Confirm Password
            </Label>
            <div className="relative mt-2">
              <Input
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="••••••••"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="bg-gray-100 text-black placeholder-gray-500 border-gray-300 focus:ring-2 focus:ring-gray-500 pr-12"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-black"
              >
                {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {/* Sign Up Button */}
          <motion.div whileTap={{ scale: 0.95 }}>
            <Button
              type="submit"
              className="w-full bg-black text-white font-bold py-3 rounded-xl shadow-md hover:bg-gray-800 transition"
            >
              Sign Up
            </Button>
          </motion.div>
        </form>

        <p className="mt-6 text-sm text-center text-gray-600">
          Already have an account?{" "}
          <a href="/login" className="font-semibold text-black hover:underline">
            Login
          </a>
        </p>
      </motion.div>
    </div>
  );
}
