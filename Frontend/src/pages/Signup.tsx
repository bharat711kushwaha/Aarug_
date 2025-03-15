import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { register } from "../api";
import { useStore } from "../store/useStore";
import toast from "react-hot-toast";

export const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const setUser = useStore((state) => state.setUser);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await register(name, email, password);
      const { token, ...user } = response.data;
      localStorage.setItem("token", token);
      setUser(user);
      toast.success("Registration successful! 🎉");
      navigate("/");
    } catch (error) {
      toast.error("Registration failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-500 to-pink-500">
      <div className="max-w-md w-full bg-white/20 backdrop-blur-md rounded-lg shadow-lg p-8 border border-white/30 animate-fade-in">
        <h2 className="text-3xl font-bold mb-6 text-center text-white">Sign Up</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* Name Input */}
          <div className="relative">
            <label htmlFor="name" className="block text-sm font-medium text-white">
              Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 mt-1 rounded-lg bg-white/30 text-white placeholder-white/80 focus:ring-2 focus:ring-white focus:outline-none transition-all duration-300"
              placeholder="Enter your name"
              required
            />
          </div>

          {/* Email Input */}
          <div className="relative">
            <label htmlFor="email" className="block text-sm font-medium text-white">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 mt-1 rounded-lg bg-white/30 text-white placeholder-white/80 focus:ring-2 focus:ring-white focus:outline-none transition-all duration-300"
              placeholder="Enter your email"
              required
            />
          </div>

          {/* Password Input */}
          <div className="relative">
            <label htmlFor="password" className="block text-sm font-medium text-white">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 mt-1 rounded-lg bg-white/30 text-white placeholder-white/80 focus:ring-2 focus:ring-white focus:outline-none transition-all duration-300"
              placeholder="Enter your password"
              required
            />
          </div>

          {/* Signup Button */}
          <button
            type="submit"
            className="w-full py-2 bg-white/30 text-white font-semibold rounded-lg shadow-md hover:bg-white/40 transition-all duration-300 focus:ring-2 focus:ring-white"
          >
            Sign Up
          </button>
        </form>

        {/* Already have an account? */}
        <p className="mt-4 text-center text-white">
          Already have an account?{" "}
          <Link to="/login" className="underline font-semibold hover:text-white/90">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};
