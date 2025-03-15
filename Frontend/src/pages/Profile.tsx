import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useStore } from "../store/useStore";
import { LogOut, User } from "lucide-react";
import toast from "react-hot-toast";

export const Profile = () => {
  const { user, fetchUserProfile, logout } = useStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      fetchUserProfile();
    }
  }, [user, fetchUserProfile]);

  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully!");
    navigate("/login");
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600">Loading profile...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-green-400 to-blue-500">
      <div className="max-w-md w-full bg-white/20 backdrop-blur-md rounded-lg shadow-lg p-8 border border-white/30 animate-fade-in">
        <h2 className="text-3xl font-bold text-center text-white mb-6">User Profile</h2>
        <div className="flex flex-col items-center space-y-4">
          {/* Profile Icon */}
          <div className="bg-white/30 p-4 rounded-full">
            <User className="h-16 w-16 text-white" />
          </div>

          {/* User Details */}
          <div className="text-center text-white">
            <h3 className="text-xl font-semibold">{user.name}</h3>
            <p className="text-gray-200">{user.email}</p>
            <p className="text-sm text-gray-300 capitalize">{user.role}</p>
          </div>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="mt-4 px-6 py-2 bg-red-500 text-white font-semibold rounded-lg shadow-md hover:bg-red-600 transition-all duration-300 focus:ring-2 focus:ring-white flex items-center gap-2"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};
