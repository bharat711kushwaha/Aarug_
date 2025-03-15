import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../api";
import { useStore } from "../store/useStore";
import toast from "react-hot-toast";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const setUser = useStore((state) => state.setUser);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await login(email, password);
      const { token, ...user } = response.data;
      localStorage.setItem("token", token);
      setUser(user);
      toast.success("Login successful! 🎉");
      navigate("/");
    } catch (error) {
      toast.error("Login failed. Please check your credentials.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-400 to-blue-500">
      <div className="max-w-md w-full bg-white/20 backdrop-blur-md rounded-lg shadow-lg p-8 border border-white/30 animate-fade-in">
        <h2 className="text-3xl font-bold mb-6 text-center text-white">Login</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          
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

          {/* Login Button */}
          <button
            type="submit"
            className="w-full py-2 bg-white/30 text-white font-semibold rounded-lg shadow-md hover:bg-white/40 transition-all duration-300 focus:ring-2 focus:ring-white"
          >
            Login
          </button>
        </form>

        {/* Sign Up Link */}
        <p className="mt-4 text-center text-white">
          Don't have an account?{" "}
          <a href="/signup" className="underline font-semibold hover:text-white/90">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
};
