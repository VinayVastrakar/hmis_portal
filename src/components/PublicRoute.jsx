import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

/**
 * A wrapper for public routes (like Login).
 * If a user is already authenticated, they shouldn't access the login page again.
 * Instead, redirect them to the dashboard.
 */
const PublicRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  
  if (token) {
    // Redirect to dashboard if already authenticated
    return <Navigate to="/dashboard" replace />;
  }

  return children ? children : <Outlet />;
};

export default PublicRoute;
