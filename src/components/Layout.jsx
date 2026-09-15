import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

/**
 * Shared Application Layout
 * Provides persistent Header/Navbar, page Outlet, and Footer
 * across all authenticated pages without requiring individual page imports.
 */
const Layout = ({ children }) => {
  return (
    <div className="ari-layout d-flex flex-column min-vh-100">
      {/* Global Navigation Header */}
      <Navbar />

      {/* Main Page Content */}
      <div className="main-panel flex-grow-1">
        {children || <Outlet />}
      </div>

      {/* Global Footer */}
      <Footer />
    </div>
  );
};

export default Layout;
