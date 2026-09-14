import React, { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';

export default function Navbar() {
  const [isNavCollapsed, setIsNavCollapsed] = useState(true);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showNotificationMenu, setShowNotificationMenu] = useState(false);
  const [patientData, setPatientData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const data = localStorage.getItem('patientDetails');
    if (data) {
      try {
        setPatientData(JSON.parse(data));
      } catch (e) {
        console.error("Failed to parse patient data", e);
      }
    }
  }, []);

  const handleNavCollapse = () => setIsNavCollapsed(!isNavCollapsed);

  const handleLogout = (e) => {
    e.preventDefault();
    if (window.confirm('Are you sure you want to logout?')) {
      localStorage.clear();
      navigate('/login');
    }
  };

  const handleAddFamilyMember = (e) => {
    e.preventDefault();
    // To be implemented later
    alert('Add Family Member functionality coming soon!');
    setShowProfileMenu(false);
  };

  const handleSelectPatient = (patientId) => {
    // To be implemented later
    console.log('Patient selected:', patientId);
    alert('Switch Patient functionality coming soon!');
    setShowProfileMenu(false);
  };

  const getUserInitials = () => {
    if (!patientData || !patientData.patientName) return 'U';
    const names = patientData.patientName.split(' ');
    if (names.length === 1) return names[0].charAt(0).toUpperCase();
    return (names[0].charAt(0) + names[names.length - 1].charAt(0)).toUpperCase();
  };

  return (
    <>
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
              <span style={{ fontWeight: 800, fontSize: '1.05rem', color: 'var(--primary-color)', letterSpacing: '-0.02em', lineHeight: 1 }}>
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
                <NavLink 
                  className={({ isActive }) => `nav-link px-3 py-2 fw-semibold ${isActive ? 'text-primary fw-bold active' : 'text-secondary'}`} 
                  to="/appointments?tab=radiology"
                >
                  <i className="fas fa-x-ray me-1" style={{ color: '#7C3AED' }}></i>
                  Book Radiology &amp; Lab
                </NavLink>
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
                <NavLink 
                  className={({ isActive }) => `nav-link px-3 py-2 fw-semibold ${isActive ? 'text-primary fw-bold active' : 'text-secondary'}`} 
                  to="/health-records"
                  style={({ isActive }) => isActive ? { backgroundColor: '#EBF3FF', borderRadius: '8px 8px 0 0', borderBottom: '3px solid #1E60F4', color: '#1E60F4' } : {}}
                >
                  Health Records
                </NavLink>
              </li>
            </ul>
            
            {/* Right side: Notifications & User Profile */}
            <div className="d-flex align-items-center gap-3">
              {/* Notification Bell */}
              <div className="position-relative">
                <button 
                  type="button" 
                  className="btn btn-light rounded-circle p-2 position-relative d-flex align-items-center justify-content-center"
                  style={{ width: '40px', height: '40px', background: 'var(--light-color)', border: '1px solid var(--border-color)' }}
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

              <div className="position-relative">
                <div 
                  className="d-flex align-items-center gap-2 p-1 pe-2 rounded-pill cursor-pointer border"
                  style={{ background: '#FFFFFF', cursor: 'pointer', transition: 'var(--transition)' }}
                  onClick={() => {
                    setShowProfileMenu(!showProfileMenu);
                    setShowNotificationMenu(false);
                    setShowSwitchSubmenu(false);
                  }}
                  title="Account Menu"
                >
                  <div 
                    className="rounded-circle d-flex align-items-center justify-content-center text-white fw-bold"
                    style={{ width: '36px', height: '36px', background: 'var(--primary-gradient)', fontSize: '0.88rem' }}
                  >
                    {getInitials(activePatient.name)}
                  </div>
                  <div className="d-none d-md-flex align-items-center gap-1">
                    <span className="fw-semibold text-dark small">{activePatient.name}</span>
                    <i className="fas fa-chevron-down text-muted" style={{ fontSize: '0.7rem' }}></i>
                  </div>
                </div>

                {/* Enhanced Profile Dropdown */}
                {showProfileMenu && (
                  <div 
                    className="dropdown-menu dropdown-menu-end show position-absolute mt-2 shadow-lg border-0 patient-dropdown-menu" 
                    style={{ right: 0, top: '100%', zIndex: 1050 }}
                  >
                    {/* Active Patient Card Header */}
                    <div className="patient-dropdown-header">
                      <div className="patient-header-avatar">
                        {getInitials(activePatient.name)}
                      </div>
                      <div className="patient-header-info">
                        <div className="patient-header-name">{activePatient.name}</div>
                        <div className="d-flex align-items-center gap-2">
                          <span className="patient-header-badge">{activePatient.relation}</span>
                          <small className="text-muted" style={{ fontSize: '0.72rem' }}>{activePatient.patientId}</small>
                        </div>
                      </div>
                    </div>

                    {/* MENU ITEM 1: SWITCH PATIENT (With Arrow Functionality) */}
                    <div>
                      <button
                        type="button"
                        className="patient-menu-item"
                        onClick={() => setShowSwitchSubmenu(!showSwitchSubmenu)}
                      >
                        <span className="patient-menu-item-icon">
                          <i className="fas fa-user-friends"></i>
                        </span>
                        <span>Switch Patient</span>
                        <i className={`fas fa-chevron-right menu-arrow-icon ${showSwitchSubmenu ? 'open' : ''}`}></i>
                      </button>

                      {/* Collapsible Switch Submenu */}
                      {showSwitchSubmenu && (
                        <div className="switch-patient-submenu">
                          {patients.map((pt) => (
                            <div
                              key={pt.id}
                              className={`switch-patient-row ${pt.id === activePatientId ? 'active' : ''}`}
                              onClick={() => handleSelectPatient(pt)}
                            >
                              <div className="switch-patient-info">
                                <div className="switch-avatar-mini">
                                  {getInitials(pt.name)}
                                </div>
                                <div>
                                  <div className="switch-name-text">
                                    {pt.name} <small className="text-muted">({pt.relation})</small>
                                  </div>
                                  <div className="switch-sub-text">{pt.gender}, {pt.age} yrs • {pt.patientId}</div>
                                </div>
                              </div>
                              {pt.id === activePatientId ? (
                                <i className="fas fa-check-circle text-primary fs-6"></i>
                              ) : (
                                <i className="far fa-circle text-muted" style={{ fontSize: '0.85rem' }}></i>
                              )}
                            </div>
                          ))}
                          <button
                            type="button"
                            className="switch-add-btn"
                            onClick={() => {
                              setShowProfileMenu(false);
                              setShowFamilyModal(true);
                            }}
                          >
                            <i className="fas fa-plus-circle"></i> + Add Family Member
                          </button>
                        </div>
                      )}
                    </div>

                    {/* MENU ITEM 2: MY PROFILE */}
                    <button
                      type="button"
                      className="patient-menu-item"
                      onClick={() => {
                        setShowProfileMenu(false);
                        setShowProfileModal(true);
                      }}
                    >
                      <span className="patient-menu-item-icon">
                        <i className="fas fa-id-card"></i>
                      </span>
                      <span>My Profile</span>
                    </button>

                    {/* MENU ITEM 3: MANAGE FAMILY MEMBERS */}
                    <button
                      type="button"
                      className="patient-menu-item"
                      onClick={() => {
                        setShowProfileMenu(false);
                        setShowFamilyModal(true);
                      }}
                    >
                      <span className="patient-menu-item-icon">
                        <i className="fas fa-users-cog"></i>
                      </span>
                      <span>Manage Family Members</span>
                    </button>

                    <div className="dropdown-divider my-1"></div>

                    {/* Navigation Items */}
                    <NavLink className="patient-menu-item" to="/dashboard" onClick={() => setShowProfileMenu(false)}>
                      <span className="patient-menu-item-icon">
                        <i className="fas fa-columns"></i>
                      </span>
                      <span>Dashboard</span>
                    </NavLink>

                    <NavLink className="patient-menu-item" to="/appointments" onClick={() => setShowProfileMenu(false)}>
                      <span className="patient-menu-item-icon">
                        <i className="fas fa-calendar-check"></i>
                      </span>
                      <span>My Appointments</span>
                    </NavLink>

                    <NavLink className="patient-menu-item" to="/health-records" onClick={() => setShowProfileMenu(false)}>
                      <span className="patient-menu-item-icon">
                        <i className="fas fa-file-medical"></i>
                      </span>
                      <span>Health Records</span>
                    </NavLink>

                    <div className="dropdown-divider my-1"></div>

                    <button 
                      className="patient-menu-item text-danger" 
                      onClick={handleLogout}
                    >
                      <span className="patient-menu-item-icon text-danger">
                        <i className="fas fa-sign-out-alt"></i>
                      </span>
                      <span>Logout</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* ========================================================
          MODAL 1: MY PROFILE MODAL
         ======================================================== */}
      {showProfileModal && (
        <div className="modal-backdrop-custom" onClick={() => setShowProfileModal(false)}>
          <div className="modal-dialog-custom" style={{ maxWidth: '600px' }} onClick={(e) => e.stopPropagation()}>
            <div className="modal-header-custom">
              <h5 className="fw-bold">
                <i className="fas fa-id-card text-primary me-2"></i> Patient Profile
              </h5>
              <button className="modal-close-btn" onClick={() => setShowProfileModal(false)}>
                <i className="fas fa-times"></i>
              </button>
            </div>

            <div className="modal-body-custom">
              {/* Profile Header Card */}
              <div className="d-flex align-items-center gap-3 p-3 bg-light rounded-3 mb-4">
                <div 
                  className="rounded-circle d-flex align-items-center justify-content-center text-white fw-bold fs-4"
                  style={{ width: '64px', height: '64px', background: 'var(--primary-gradient)' }}
                >
                  {getUserInitials()}
                </div>
                <div className="d-none d-md-flex align-items-center gap-1">
                  <span className="fw-semibold text-dark small">{patientData?.patientName || 'User'}</span>
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
                    <strong className="text-dark d-block">{patientData?.patientName || 'User'}</strong>
                    <div className="small text-muted">{patientData?.patientPhoneNumber ? `+91 ${patientData.patientPhoneNumber}` : 'No Phone'}</div>
                    <div className="small text-primary mt-1">Patient ID: {patientData?.patientId || 'N/A'}</div>
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
                  
                  {/* Family Member Options Placeholders */}
                  <h6 className="dropdown-header text-muted">Family Members</h6>
                  <button 
                    className="dropdown-item py-2" 
                    onClick={() => handleSelectPatient('placeholder-id')}
                  >
                    <i className="fas fa-user-friends me-2 text-primary"></i> Switch Patient
                  </button>
                  <button 
                    className="dropdown-item py-2" 
                    onClick={handleAddFamilyMember}
                  >
                    <i className="fas fa-plus-circle me-2 text-primary"></i> Add Family Member
                  </button>
                  <div className="dropdown-divider"></div>
                  <button 
                    className="dropdown-item text-danger py-2" 
                    onClick={handleLogout}
                  >
                    <i className="fas fa-sign-out-alt me-2"></i> Logout
                  </button>
                </div>
                <div className="col-6">
                  <div className="text-muted small">ABHA Health ID</div>
                  <div className="fw-bold text-primary">{activePatient.abhaId}</div>
                </div>
                <div className="col-12">
                  <div className="text-muted small">Registered Address</div>
                  <div className="fw-medium text-dark">{activePatient.address}</div>
                </div>
              </div>

              <div className="alert alert-light border mt-4 mb-0 d-flex align-items-center">
                <i className="fas fa-shield-alt text-success fs-4 me-3"></i>
                <div>
                  <strong>ABHA Verified Account</strong>
                  <div className="small text-muted">Your health records are digitally secured under Ayushman Bharat Digital Mission.</div>
                </div>
              </div>
            </div>

            <div className="modal-footer-custom">
              <button className="btn btn-light" onClick={() => setShowProfileModal(false)}>
                Close
              </button>
              <button 
                className="btn btn-primary px-4 fw-bold"
                onClick={() => {
                  showToast('Profile update feature available in account settings.');
                  setShowProfileModal(false);
                }}
              >
                <i className="fas fa-edit me-2"></i> Edit Details
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================
          MODAL 2: MANAGE FAMILY MEMBERS MODAL
         ======================================================== */}
      {showFamilyModal && (
        <div className="modal-backdrop-custom" onClick={() => setShowFamilyModal(false)}>
          <div className="modal-dialog-custom" style={{ maxWidth: '680px' }} onClick={(e) => e.stopPropagation()}>
            <div className="modal-header-custom">
              <h5 className="fw-bold">
                <i className="fas fa-users text-primary me-2"></i> Manage Family Members
              </h5>
              <button className="modal-close-btn" onClick={() => setShowFamilyModal(false)}>
                <i className="fas fa-times"></i>
              </button>
            </div>

            <div className="modal-body-custom">
              <p className="text-muted small mb-3">
                Link and manage medical appointments, prescriptions, and lab records for your family members under a single unified portal.
              </p>

              {/* Members List */}
              <h6 className="fw-bold text-dark mb-2">Linked Members ({patients.length})</h6>
              <div className="mb-4">
                {patients.map((pt) => (
                  <div 
                    key={pt.id} 
                    className={`family-member-card ${pt.id === activePatientId ? 'is-active' : ''}`}
                  >
                    <div className="d-flex align-items-center gap-3">
                      <div 
                        className="rounded-circle d-flex align-items-center justify-content-center text-white fw-bold"
                        style={{ width: '44px', height: '44px', background: pt.id === activePatientId ? 'var(--primary-color)' : '#64748B' }}
                      >
                        {getInitials(pt.name)}
                      </div>
                      <div>
                        <div className="d-flex align-items-center gap-2">
                          <strong className="text-dark fs-6">{pt.name}</strong>
                          <span className="badge bg-primary-subtle text-primary">{pt.relation}</span>
                          {pt.id === activePatientId && (
                            <span className="badge bg-success">Active Profile</span>
                          )}
                        </div>
                        <div className="small text-muted">
                          {pt.gender}, {pt.age} yrs • DOB: {pt.dob} • ID: {pt.patientId}
                        </div>
                      </div>
                    </div>

                    <div>
                      {pt.id !== activePatientId ? (
                        <button
                          type="button"
                          className="btn btn-outline-primary btn-sm fw-bold"
                          onClick={() => {
                            handleSelectPatient(pt);
                            setShowFamilyModal(false);
                          }}
                        >
                          Switch to {pt.relation}
                        </button>
                      ) : (
                        <span className="text-success fw-bold small">
                          <i className="fas fa-check-circle me-1"></i> Current
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Add New Member Form */}
              <div className="card bg-light border-0 p-3 rounded-3">
                <h6 className="fw-bold text-dark mb-3">
                  <i className="fas fa-user-plus text-primary me-2"></i> Add New Family Member
                </h6>
                <form onSubmit={handleAddFamilyMember}>
                  <div className="row g-2">
                    <div className="col-md-6">
                      <label className="form-label small fw-bold text-muted">Full Name</label>
                      <input
                        type="text"
                        className="form-control form-control-sm"
                        placeholder="e.g. Ananya Doe"
                        value={newMemberName}
                        onChange={(e) => setNewMemberName(e.target.value)}
                        required
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label small fw-bold text-muted">Relationship</label>
                      <select
                        className="form-select form-select-select form-select-sm"
                        value={newMemberRelation}
                        onChange={(e) => setNewMemberRelation(e.target.value)}
                      >
                        <option value="Spouse">Spouse</option>
                        <option value="Child / Son">Child / Son</option>
                        <option value="Child / Daughter">Child / Daughter</option>
                        <option value="Parent / Father">Parent / Father</option>
                        <option value="Parent / Mother">Parent / Mother</option>
                        <option value="Sibling">Sibling</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                    <div className="col-md-6">
                      <label className="form-label small fw-bold text-muted">Date of Birth</label>
                      <input
                        type="date"
                        className="form-control form-control-sm"
                        value={newMemberDob}
                        onChange={(e) => setNewMemberDob(e.target.value)}
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label small fw-bold text-muted">Gender</label>
                      <select
                        className="form-select form-select-sm"
                        value={newMemberGender}
                        onChange={(e) => setNewMemberGender(e.target.value)}
                      >
                        <option value="Female">Female</option>
                        <option value="Male">Male</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                    <div className="col-12 mt-3 text-end">
                      <button type="submit" className="btn btn-primary btn-sm px-3 fw-bold">
                        <i className="fas fa-plus me-1"></i> Add Member
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>

            <div className="modal-footer-custom">
              <button className="btn btn-light" onClick={() => setShowFamilyModal(false)}>
                Done
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Floating Action Toast */}
      {toastMessage && (
        <div className="ari-toast success">
          <i className="fas fa-check-circle"></i>
          <span>{toastMessage}</span>
        </div>
      )}
    </>
  );
}
