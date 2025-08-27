"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Input } from "@/app/Components/ui/input";
import { Button } from "@/app/Components/ui/button";
import { Label } from "@/app/Components/ui/label";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Reset password request for:", email);
    // You can integrate your API here to send reset link
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen bg-gray-100 overflow-hidden">
      {/* Background abstract shapes */}
      <div className="absolute -top-32 -left-32 w-72 h-72 bg-gray-300 rounded-full blur-3xl opacity-20"></div>
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-gray-400 rounded-full blur-3xl opacity-15"></div>

      {/* Forgot Password Card */}
      <motion.div
        initial={{ opacity: 0, y: 50, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 w-full max-w-md p-10 rounded-3xl backdrop-blur-lg bg-white/80 border border-gray-300 shadow-2xl"
      >
        <motion.h1
          className="text-4xl md:text-5xl font-extrabold text-center text-black mb-6 tracking-wider"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          Forgot Password
        </motion.h1>

        <p className="text-center text-gray-700 mb-6">
          Enter your email address below and we’ll send you a link to reset your password.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
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

          <motion.div whileTap={{ scale: 0.95 }}>
            <Button
              type="submit"
              className="w-full bg-black text-white font-bold py-3 rounded-xl shadow-md hover:bg-gray-800 transition"
            >
              Send Reset Link
            </Button>
          </motion.div>
        </form>

        <p className="mt-6 text-sm text-center text-gray-600">
          Remember your password?{" "}
          <a href="/login" className="font-semibold text-black hover:underline">
            Login
          </a>
        </p>
      </motion.div>
    </div>
  );
}
