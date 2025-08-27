"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Input } from "@/app/Components/ui/input";
import { Button } from "@/app/Components/ui/button";
import { Label } from "@/app/Components/ui/label";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Login Attempt:", { email, password });
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen bg-gray-100 overflow-hidden">
      {/* Background abstract shapes */}
      <div className="absolute -top-32 -left-32 w-72 h-72 bg-gray-300 rounded-full blur-3xl opacity-20"></div>
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-gray-400 rounded-full blur-3xl opacity-15"></div>

      {/* Login Card */}
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
          Fashionfy
        </motion.h1>

        <form onSubmit={handleLogin} className="space-y-6">
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
            <div className="text-right mt-1">
              <Link
                href="/forgot-password"
                className="text-sm text-gray-700 hover:underline"
              >
                Forgot Password?
              </Link>
            </div>
          </div>

          <motion.div whileTap={{ scale: 0.95 }}>
            <Button
              type="submit"
              className="w-full bg-black text-white font-bold py-3 rounded-xl shadow-md hover:bg-gray-800 transition"
            >
              Login
            </Button>
          </motion.div>
        </form>

        <p className="mt-8 text-sm text-center text-gray-600">
          Don’t have an account?{" "}
          <Link href="/signup" className="font-semibold text-black hover:underline">
            Sign up
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
