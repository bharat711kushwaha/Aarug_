import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useStore } from '../store/useStore';

interface ProtectedRouteProps {
  requireAdmin?: boolean;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ requireAdmin = false }) => {
  const { user } = useStore();
  
  // If user is not logged in, redirect to login
  if (!user) {
    return <Navigate to="/login" />;
  }
  
  // If route requires admin and user is not admin, redirect to home
  if (requireAdmin && user.role !== 'admin') {
    return <Navigate to="/" />;
  }
  
  // If all conditions are met, render the child routes
  return <Outlet />;
};