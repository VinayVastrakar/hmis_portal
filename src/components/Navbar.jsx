import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';

export default function Navbar() {
  const [isNavCollapsed, setIsNavCollapsed] = useState(true);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showNotificationMenu, setShowNotificationMenu] = useState(false);
  const navigate = useNavigate();

  const handleNavCollapse = () => setIsNavCollapsed(!isNavCollapsed);

  const handleLogout = (e) => {
    e.preventDefault();
    if (window.confirm('Are you sure you want to logout?')) {
      navigate('/login');
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-ari bg-white border-bottom shadow-sm sticky-top">
      <div className="container-fluid px-3 px-lg-5">
        {/* Left side: Logo & Brand */}
        <Link className="navbar-brand d-flex align-items-center gap-2" to="/dashboard">
          <img 
            src="https://i.postimg.cc/K8xgWmqf/logo-hal.png" 
            alt="ARI-Health Logo" 
            style={{ height: '42px', width: 'auto' }}
          />
          <div className="d-none d-sm-flex flex-column">
            <span style={{ fontWeight: 800, fontSize: '1.05rem', color: '#1E60F4', letterSpacing: '-0.02em', lineHeight: 1 }}>
              ARI-HEALTH
            </span>
            <span style={{ fontSize: '0.68rem', color: '#64748B', fontWeight: 600, letterSpacing: '0.05em' }}>
              Patient Portal <span className="badge bg-primary-subtle text-primary" style={{ fontSize: '0.62rem' }}>24x7</span>
            </span>
          </div>
        </Link>
        
        {/* Center: Navigation Menu Toggle Button for Mobile */}
        <button 
          className="navbar-toggler border-0 shadow-none" 
          type="button" 
          onClick={handleNavCollapse}
          aria-expanded={!isNavCollapsed} 
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navigation Links */}
        <div className={`${isNavCollapsed ? 'collapse' : ''} navbar-collapse`} id="navbarNav">
          <ul className="navbar-nav mx-auto mb-2 mb-lg-0 gap-lg-1">
            <li className="nav-item">
              <NavLink 
                className={({ isActive }) => `nav-link px-3 py-2 fw-semibold ${isActive ? 'text-primary fw-bold active' : 'text-secondary'}`} 
                to="/dashboard"
                end
              >
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink 
                className={({ isActive }) => `nav-link px-3 py-2 fw-semibold ${isActive ? 'nav-link-pill-active' : 'text-secondary'}`} 
                to="/book-appointment"
              >
                Book Appointment
              </NavLink>
            </li>
            <li className="nav-item">
              <a className="nav-link px-3 py-2 fw-semibold text-secondary" href="/dashboard#booking">
                Book Lab &amp; Radiology
              </a>
            </li>
            <li className="nav-item">
              <NavLink 
                className={({ isActive }) => `nav-link px-3 py-2 fw-semibold ${isActive ? 'text-primary fw-bold active' : 'text-secondary'}`} 
                to="/appointments"
                style={({ isActive }) => isActive ? { borderBottom: '3px solid #1E60F4', color: '#1E60F4' } : {}}
              >
                My Appointments
              </NavLink>
            </li>
            <li className="nav-item">
              <a className="nav-link px-3 py-2 fw-semibold text-secondary" href="/dashboard#records">
                Health Records
              </a>
            </li>
          </ul>
          
          {/* Right side: Notifications & User Profile */}
          <div className="d-flex align-items-center gap-3">
            {/* Notification Bell */}
            <div className="position-relative">
              <button 
                type="button" 
                className="btn btn-light rounded-circle p-2 position-relative d-flex align-items-center justify-content-center"
                style={{ width: '40px', height: '40px', background: '#F8FAFC', border: '1px solid #E2E8F0' }}
                onClick={() => {
                  setShowNotificationMenu(!showNotificationMenu);
                  setShowProfileMenu(false);
                }}
                title="Notifications"
              >
                <i className="fas fa-bell text-secondary fs-6"></i>
                <span 
                  className="position-absolute top-0 start-100 translate-middle p-1 bg-danger border border-light rounded-circle"
                  style={{ transform: 'translate(-30%, 30%) !important' }}
                >
                  <span className="visually-hidden">New alerts</span>
                </span>
              </button>

              {/* Notification Dropdown */}
              {showNotificationMenu && (
                <div 
                  className="dropdown-menu dropdown-menu-end show position-absolute mt-2 shadow-lg border-0 rounded-3 p-0" 
                  style={{ right: 0, top: '100%', width: '320px', zIndex: 1050, overflow: 'hidden' }}
                >
                  <div className="p-3 bg-primary text-white d-flex justify-content-between align-items-center">
                    <span className="fw-bold">Notifications</span>
                    <span className="badge bg-white text-primary">2 New</span>
                  </div>
                  <div className="list-group list-group-flush" style={{ maxHeight: '280px', overflowY: 'auto' }}>
                    <div className="list-group-item p-3 list-group-item-action">
                      <div className="d-flex w-100 justify-content-between mb-1">
                        <strong className="text-dark small">Upcoming Consultation</strong>
                        <small className="text-muted">In 9 days</small>
                      </div>
                      <p className="mb-1 small text-muted">Dr. Priya Sharma at ARI Hospital, Delhi (11:30 AM)</p>
                    </div>
                    <div className="list-group-item p-3 list-group-item-action">
                      <div className="d-flex w-100 justify-content-between mb-1">
                        <strong className="text-dark small">Lab Test Ready</strong>
                        <small className="text-muted">Yesterday</small>
                      </div>
                      <p className="mb-1 small text-muted">Lipid Profile test results are available to download.</p>
                    </div>
                  </div>
                  <div className="p-2 text-center bg-light border-top">
                    <Link to="/appointments" className="small text-primary fw-bold text-decoration-none" onClick={() => setShowNotificationMenu(false)}>
                      View All in Appointments
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Profile Menu */}
            <div className="position-relative">
              <div 
                className="d-flex align-items-center gap-2 p-1 pe-2 rounded-pill cursor-pointer border"
                style={{ background: '#FFFFFF', cursor: 'pointer', transition: 'all 0.2s ease' }}
                onClick={() => {
                  setShowProfileMenu(!showProfileMenu);
                  setShowNotificationMenu(false);
                }}
                title="Account Menu"
              >
                <div 
                  className="rounded-circle d-flex align-items-center justify-content-center text-white fw-bold"
                  style={{ width: '36px', height: '36px', background: 'linear-gradient(135deg, #1E60F4, #3B82F6)', fontSize: '0.88rem' }}
                >
                  JD
                </div>
                <div className="d-none d-md-flex align-items-center gap-1">
                  <span className="fw-semibold text-dark small">John Doe</span>
                  <i className="fas fa-chevron-down text-muted" style={{ fontSize: '0.7rem' }}></i>
                </div>
              </div>

              {/* Profile Dropdown */}
              {showProfileMenu && (
                <div 
                  className="dropdown-menu dropdown-menu-end show position-absolute mt-2 shadow-lg border-0 rounded-3" 
                  style={{ right: 0, top: '100%', minWidth: '220px', zIndex: 1050 }}
                >
                  <div className="px-3 py-2 border-bottom bg-light rounded-top">
                    <strong className="text-dark d-block">John Doe (Nitin Dinkar)</strong>
                    <div className="small text-muted">+91 9876543210</div>
                    <div className="small text-primary mt-1">Patient ID: ARI-PT-8842</div>
                  </div>
                  <NavLink className="dropdown-item py-2" to="/dashboard" onClick={() => setShowProfileMenu(false)}>
                    <i className="fas fa-columns me-2 text-primary"></i> Dashboard
                  </NavLink>
                  <NavLink className="dropdown-item py-2" to="/appointments" onClick={() => setShowProfileMenu(false)}>
                    <i className="fas fa-calendar-check me-2 text-primary"></i> My Appointments
                  </NavLink>
                  <a className="dropdown-item py-2" href="/dashboard#records" onClick={() => setShowProfileMenu(false)}>
                    <i className="fas fa-file-medical me-2 text-primary"></i> Health Records
                  </a>
                  <div className="dropdown-divider"></div>
                  <button 
                    className="dropdown-item text-danger py-2" 
                    onClick={handleLogout}
                  >
                    <i className="fas fa-sign-out-alt me-2"></i> Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
