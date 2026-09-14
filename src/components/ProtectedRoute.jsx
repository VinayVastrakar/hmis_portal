import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

/**
 * A wrapper for protected routes that requires authentication.
 * If there is no token, it redirects the user to the login page.
 */
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  
  if (!token) {
    // Redirect to login page if not authenticated
    return <Navigate to="/login" replace />;
  }

  // Render children if passed directly, otherwise render nested routes via Outlet
  return children ? children : <Outlet />;
};

export default ProtectedRoute;
