import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function MyAppointments() {
  // Navigation State
  const [activeMenu, setActiveMenu] = useState('opd'); // 'opd', 'lab', 'radiology'
  const [activeSubTab, setActiveSubTab] = useState('upcoming'); // 'upcoming', 'completed', 'cancelled'
  const [pastFilter, setPastFilter] = useState('all'); // 'all', 'completed', 'cancelled'

  // Modal States
  const [modalType, setModalType] = useState(null); // 'pay', 'reschedule', 'cancel', 'invoice', 'details'
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);

  // Reschedule Form State
  const [rescheduleDate, setRescheduleDate] = useState('2026-10-05');
  const [rescheduleTime, setRescheduleTime] = useState('11:00 AM');

  // Cancel Form State
  const [cancelReason, setCancelReason] = useState('Change of schedule');

  // Payment Method State
  const [paymentMethod, setPaymentMethod] = useState('upi');

  // Appointments Data
  const [upcomingAppointments, setUpcomingAppointments] = useState([
    {
      id: 'up-1',
      date: '20 Sep 2026',
      dayTime: 'Sun, 11:30 AM',
      doctor: 'Dr. Priya Sharma',
      specialty: 'General Physician',
      hospital: 'ARI Hospital, Delhi',
      room: 'Room 5',
      paymentStatus: 'Pending',
      amount: 500,
      status: 'pending'
    },
    {
      id: 'up-2',
      date: '28 Sep 2026',
      dayTime: 'Mon, 10:15 AM',
      doctor: 'Dr. Michael Chen',
      specialty: 'Dermatologist',
      hospital: 'Skin Care Clinic, Mumbai',
      room: 'Room 2',
      paymentStatus: 'Paid',
      amount: 700,
      status: 'confirmed'
    }
  ]);

  const [pastAppointments, setPastAppointments] = useState([
    {
      id: 'past-1',
      date: '15 Sep 2026',
      dayTime: 'Tue, 04:00 PM',
      doctor: 'Dr. Sarah Johnson',
      specialty: 'Cardiologist',
      hospital: 'ARI Hospital, Delhi',
      room: 'Room 12',
      tokenNo: 'TKN125',
      paymentStatus: 'Paid',
      amount: 800,
      status: 'completed'
    },
    {
      id: 'past-2',
      date: '10 Aug 2026',
      dayTime: 'Mon, 11:00 AM',
      doctor: 'Dr. Anil Mehta',
      specialty: 'Orthopedic',
      hospital: 'City Hospital, Delhi',
      room: 'Room 3',
      tokenNo: 'TKN389',
      paymentStatus: 'Paid',
      amount: 600,
      status: 'completed'
    },
    {
      id: 'past-3',
      date: '05 Jul 2026',
      dayTime: 'Sat, 02:30 PM',
      doctor: 'Dr. Kavita Rao',
      specialty: 'ENT Specialist',
      hospital: 'ARI Hospital, Delhi',
      room: 'Room 7',
      tokenNo: '-',
      paymentStatus: 'Paid',
      amount: 500,
      status: 'cancelled'
    },
    {
      id: 'past-4',
      date: '12 Jun 2026',
      dayTime: 'Fri, 10:00 AM',
      doctor: 'Dr. Rajesh Kumar',
      specialty: 'General Physician',
      hospital: 'Health Care Center, Noida',
      room: 'Room 1',
      tokenNo: '-',
      paymentStatus: 'Paid',
      amount: 400,
      status: 'completed'
    }
  ]);

  // Lab Appointments Sample Data
  const labAppointments = [
    {
      id: 'lab-1',
      testName: 'Complete Blood Count (CBC) & ESR',
      date: '25 Sep 2026',
      dayTime: 'Thu, 08:30 AM',
      center: 'ARI Diagnostics Lab, Delhi',
      sampleStatus: 'Scheduled',
      paymentStatus: 'Paid',
      amount: 450,
      reportStatus: 'Pending Sample'
    },
    {
      id: 'lab-2',
      testName: 'Comprehensive Lipid Profile & Liver Function',
      date: '18 Aug 2026',
      dayTime: 'Tue, 09:00 AM',
      center: 'ARI Central Pathology, Delhi',
      sampleStatus: 'Collected',
      paymentStatus: 'Paid',
      amount: 950,
      reportStatus: 'Ready to Download'
    }
  ];

  // Radiology Appointments Sample Data
  const radiologyAppointments = [
    {
      id: 'rad-1',
      scanType: 'Chest X-Ray (PA & Lateral View)',
      date: '24 Sep 2026',
      dayTime: 'Wed, 02:00 PM',
      center: 'ARI Imaging Center, Block B',
      room: 'Scan Room 4',
      preparation: 'No metallic items or jewelry',
      status: 'Scheduled',
      paymentStatus: 'Paid',
      amount: 850
    },
    {
      id: 'rad-2',
      scanType: 'MRI Brain with Contrast',
      date: '02 Aug 2026',
      dayTime: 'Sun, 11:30 AM',
      center: 'ARI Advanced Radiology Center',
      room: 'MRI Suite 1',
      preparation: '4 hours fasting completed',
      status: 'Completed',
      paymentStatus: 'Paid',
      amount: 3200
    }
  ];

  const showToast = (message, type = 'success') => {
    setToastMessage({ text: message, type });
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  // Action handlers
  const handleOpenPayModal = (app) => {
    setSelectedAppointment(app);
    setModalType('pay');
  };

  const handleProcessPayment = () => {
    if (!selectedAppointment) return;
    setUpcomingAppointments(prev =>
      prev.map(item =>
        item.id === selectedAppointment.id
          ? { ...item, paymentStatus: 'Paid', status: 'confirmed' }
          : item
      )
    );
    setModalType(null);
    showToast(`Payment of ₹${selectedAppointment.amount} successful for ${selectedAppointment.doctor}!`);
  };

  const handleOpenReschedule = (app) => {
    setSelectedAppointment(app);
    setRescheduleDate('2026-10-05');
    setRescheduleTime('11:00 AM');
    setModalType('reschedule');
  };

  const handleConfirmReschedule = () => {
    if (!selectedAppointment) return;
    setUpcomingAppointments(prev =>
      prev.map(item =>
        item.id === selectedAppointment.id
          ? { ...item, date: rescheduleDate, dayTime: rescheduleTime }
          : item
      )
    );
    setModalType(null);
    showToast(`Appointment rescheduled with ${selectedAppointment.doctor} to ${rescheduleDate} at ${rescheduleTime}!`);
  };

  const handleOpenCancel = (app) => {
    setSelectedAppointment(app);
    setCancelReason('Change of schedule');
    setModalType('cancel');
  };

  const handleConfirmCancel = () => {
    if (!selectedAppointment) return;
    // Remove from upcoming and add to past with cancelled status
    setUpcomingAppointments(prev => prev.filter(item => item.id !== selectedAppointment.id));
    setPastAppointments(prev => [
      {
        ...selectedAppointment,
        id: `past-cancelled-${Date.now()}`,
        status: 'cancelled',
        tokenNo: '-'
      },
      ...prev
    ]);
    setModalType(null);
    showToast(`Appointment with ${selectedAppointment.doctor} has been cancelled.`, 'info');
  };

  const handleOpenInvoice = (app) => {
    setSelectedAppointment(app);
    setModalType('invoice');
  };

  const handleOpenDetails = (app) => {
    setSelectedAppointment(app);
    setModalType('details');
  };

  // Filtered past appointments based on status dropdown
  const filteredPastAppointments = pastAppointments.filter(app => {
    if (pastFilter === 'all') return true;
    return app.status === pastFilter;
  });

  return (
    <div className="appointments-page">
      {/* Global Navigation Bar */}
      <Navbar />

      {/* Main Container */}
      <div className="appointments-container">
        <div className="appointments-layout-grid">
          {/* Left Menu Sidebar */}
          <div className="appointments-sidebar-card">
            <h2 className="sidebar-heading">
              <i className="fas fa-calendar-check text-primary"></i> My Appointments
            </h2>
            <ul className="sidebar-nav-list">
              <li>
                <button
                  className={`sidebar-nav-btn ${activeMenu === 'opd' ? 'active' : ''}`}
                  onClick={() => setActiveMenu('opd')}
                  type="button"
                >
                  <span className="sidebar-item-left">
                    <span className="sidebar-item-icon">
                      <i className="fas fa-stethoscope"></i>
                    </span>
                    <span>OPD Consultations</span>
                  </span>
                  <span className="sidebar-badge">{upcomingAppointments.length}</span>
                </button>
              </li>
              <li>
                <button
                  className={`sidebar-nav-btn ${activeMenu === 'lab' ? 'active' : ''}`}
                  onClick={() => setActiveMenu('lab')}
                  type="button"
                >
                  <span className="sidebar-item-left">
                    <span className="sidebar-item-icon">
                      <i className="fas fa-flask"></i>
                    </span>
                    <span>Lab Appointments</span>
                  </span>
                  <span className="sidebar-badge">{labAppointments.length}</span>
                </button>
              </li>
              <li>
                <button
                  className={`sidebar-nav-btn ${activeMenu === 'radiology' ? 'active' : ''}`}
                  onClick={() => setActiveMenu('radiology')}
                  type="button"
                >
                  <span className="sidebar-item-left">
                    <span className="sidebar-item-icon">
                      <i className="fas fa-x-ray"></i>
                    </span>
                    <span>Radiology Appointments</span>
                  </span>
                  <span className="sidebar-badge">{radiologyAppointments.length}</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Right Main Content Area */}
          <div className="appointments-main-content">
            {/* VIEW 1: OPD CONSULTATIONS */}
            {activeMenu === 'opd' && (
              <>
                {/* Header and Sub-tabs */}
                <div className="appointments-header-row">
                  <h1 className="appointments-page-title">OPD Consultations</h1>
                  <div className="appointment-subtabs">
                    <button
                      className={`subtab-btn ${activeSubTab === 'upcoming' ? 'active' : ''}`}
                      onClick={() => {
                        setActiveSubTab('upcoming');
                        setPastFilter('all');
                      }}
                      type="button"
                    >
                      <i className="fas fa-calendar-alt"></i>
                      Upcoming ({upcomingAppointments.length})
                    </button>
                    <button
                      className={`subtab-btn ${activeSubTab === 'completed' ? 'active' : ''}`}
                      onClick={() => {
                        setActiveSubTab('completed');
                        setPastFilter('completed');
                      }}
                      type="button"
                    >
                      <i className="fas fa-check-circle"></i>
                      Completed
                    </button>
                    <button
                      className={`subtab-btn ${activeSubTab === 'cancelled' ? 'active' : ''}`}
                      onClick={() => {
                        setActiveSubTab('cancelled');
                        setPastFilter('cancelled');
                      }}
                      type="button"
                    >
                      <i className="fas fa-ban"></i>
                      Cancelled
                    </button>
                  </div>
                </div>

                {/* Section 1: Upcoming Appointments (Token No. REMOVED as requested) */}
                {activeSubTab === 'upcoming' && (
                  <div className="appointments-section-card">
                    <div className="section-card-header">
                      <div className="section-header-info">
                        <div className="section-icon-badge">
                          <i className="far fa-clock"></i>
                        </div>
                        <div>
                          <h3 className="section-title">Upcoming Appointments ({upcomingAppointments.length})</h3>
                          <p className="section-subtitle">Manage your upcoming OPD appointments.</p>
                        </div>
                      </div>
                    </div>

                    <div className="ari-table-responsive">
                      <table className="ari-appointments-table">
                        <thead>
                          <tr>
                            <th>Date &amp; Time</th>
                            <th>Doctor</th>
                            <th>Specialty</th>
                            <th>Hospital / Location</th>
                            {/* Token No. Column removed as requested */}
                            <th>Payment Status</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                          <tbody>
                            {upcomingAppointments.length === 0 ? (
                              <tr>
                                <td colSpan="6" className="text-center py-5 text-muted">
                                  No upcoming appointments found.
                                </td>
                              </tr>
                            ) : (
                              upcomingAppointments.map((app) => (
                                <tr key={app.id}>
                                  {/* Date & Time */}
                                  <td>
                                    <div className="table-date-cell">
                                      <span className="table-date-main">{app.date}</span>
                                      <span className="table-date-sub">{app.dayTime}</span>
                                    </div>
                                  </td>

                                  {/* Doctor */}
                                  <td>
                                    <div className="table-doctor-name">{app.doctor}</div>
                                  </td>

                                  {/* Specialty */}
                                  <td>
                                    <span className="table-specialty-badge">{app.specialty}</span>
                                  </td>

                                  {/* Hospital / Location */}
                                  <td>
                                    <div className="table-location-cell">
                                      <span className="table-hospital-name">{app.hospital}</span>
                                      <span className="table-room-no">{app.room}</span>
                                    </div>
                                  </td>

                                  {/* Payment Status */}
                                  <td>
                                    <div className="table-payment-cell">
                                      {app.paymentStatus === 'Paid' ? (
                                        <span className="payment-badge payment-badge-paid">
                                          <i className="fas fa-check"></i> Paid
                                        </span>
                                      ) : (
                                        <span className="payment-badge payment-badge-pending">
                                          <i className="fas fa-exclamation-circle"></i> Pending
                                        </span>
                                      )}
                                      <span className="payment-amount">₹{app.amount}</span>
                                    </div>
                                  </td>

                                  {/* Actions */}
                                  <td>
                                    <div className="action-buttons-group">
                                      {app.paymentStatus === 'Pending' ? (
                                        <button
                                          type="button"
                                          className="btn-action-pay"
                                          onClick={() => handleOpenPayModal(app)}
                                        >
                                          <i className="fas fa-credit-card"></i> Pay Now
                                        </button>
                                      ) : (
                                        <button
                                          type="button"
                                          className="btn-action-outline"
                                          onClick={() => handleOpenInvoice(app)}
                                        >
                                          <i className="fas fa-file-invoice"></i> View Invoice
                                        </button>
                                      )}

                                      <button
                                        type="button"
                                        className="btn-action-outline"
                                        onClick={() => handleOpenReschedule(app)}
                                      >
                                        <i className="fas fa-calendar-alt"></i> Reschedule
                                      </button>

                                      <button
                                        type="button"
                                        className="btn-action-cancel"
                                        onClick={() => handleOpenCancel(app)}
                                      >
                                        <i className="fas fa-times-circle"></i> Cancel
                                      </button>
                                    </div>
                                  </td>
                                </tr>
                              ))
                            )}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}

                  {/* Section 2: Past Appointments (Token No. preserved, Status dropdown filter & pagination) */}
                  <div className="appointments-section-card">
                      <div className="section-card-header">
                        <div className="section-header-info">
                          <div className="section-icon-badge">
                            <i className="fas fa-history"></i>
                          </div>
                          <div>
                            <h3 className="section-title">
                              Past Appointments ({filteredPastAppointments.length})
                            </h3>
                            <p className="section-subtitle">
                              View your completed and cancelled OPD appointments.
                            </p>
                          </div>
                        </div>

                        {/* Status Filter */}
                        <div>
                          <select
                            className="status-filter-select"
                            value={pastFilter}
                            onChange={(e) => setPastFilter(e.target.value)}
                          >
                            <option value="all">All Status</option>
                            <option value="completed">Completed</option>
                            <option value="cancelled">Cancelled</option>
                          </select>
                        </div>
                      </div>

                      <div className="ari-table-responsive">
                        <table className="ari-appointments-table">
                          <thead>
                            <tr>
                              <th>Date &amp; Time</th>
                              <th>Doctor</th>
                              <th>Specialty</th>
                              <th>Hospital / Location</th>
                              <th>Token No.</th>
                              <th>Payment Status</th>
                              <th>Status</th>
                              <th>Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            {filteredPastAppointments.length === 0 ? (
                              <tr>
                                <td colSpan="8" className="text-center py-5 text-muted">
                                  No past appointments match the selected filter.
                                </td>
                              </tr>
                            ) : (
                              filteredPastAppointments.map((app) => (
                                <tr key={app.id}>
                                  {/* Date & Time */}
                                  <td>
                                    <div className="table-date-cell">
                                      <span className="table-date-main">{app.date}</span>
                                      <span className="table-date-sub">{app.dayTime}</span>
                                    </div>
                                  </td>

                                  {/* Doctor */}
                                  <td>
                                    <div className="table-doctor-name">{app.doctor}</div>
                                  </td>

                                  {/* Specialty */}
                                  <td>
                                    <span className="table-specialty-badge">{app.specialty}</span>
                                  </td>

                                  {/* Hospital / Location */}
                                  <td>
                                    <div className="table-location-cell">
                                      <span className="table-hospital-name">{app.hospital}</span>
                                      <span className="table-room-no">{app.room}</span>
                                    </div>
                                  </td>

                                  {/* Token No. */}
                                  <td>
                                    {app.tokenNo && app.tokenNo !== '-' ? (
                                      <span className="table-token-pill">{app.tokenNo}</span>
                                    ) : (
                                      <span className="text-muted">-</span>
                                    )}
                                  </td>

                                  {/* Payment Status */}
                                  <td>
                                    <div className="table-payment-cell">
                                      <span className="payment-badge payment-badge-paid">
                                        <i className="fas fa-check"></i> Paid
                                      </span>
                                      <span className="payment-amount">₹{app.amount}</span>
                                    </div>
                                  </td>

                                  {/* Appointment Status */}
                                  <td>
                                    {app.status === 'completed' ? (
                                      <span className="status-pill status-pill-completed">
                                        <i className="fas fa-check-circle"></i> Completed
                                      </span>
                                    ) : (
                                      <span className="status-pill status-pill-cancelled">
                                        <i className="fas fa-times-circle"></i> Cancelled
                                      </span>
                                    )}
                                  </td>

                                  {/* Action */}
                                  <td>
                                    {app.status === 'completed' ? (
                                      <button
                                        type="button"
                                        className="btn-action-outline"
                                        onClick={() => handleOpenInvoice(app)}
                                      >
                                        <i className="fas fa-file-invoice"></i> View Invoice
                                      </button>
                                    ) : (
                                      <button
                                        type="button"
                                        className="btn-action-outline"
                                        onClick={() => handleOpenDetails(app)}
                                      >
                                        <i className="fas fa-info-circle"></i> View Details
                                      </button>
                                    )}
                                  </td>
                                </tr>
                              ))
                            )}
                          </tbody>
                        </table>
                      </div>

                      {/* Pagination Controls */}
                      <div className="section-card-footer">
                        <div className="pagination-info">
                          Showing 1 to {filteredPastAppointments.length} of {filteredPastAppointments.length} appointments
                        </div>
                        <div className="pagination-controls">
                          <button type="button" className="pagination-btn" disabled>
                            <i className="fas fa-chevron-left"></i>
                          </button>
                          <button type="button" className="pagination-btn active">
                            1
                          </button>
                          <button type="button" className="pagination-btn" disabled>
                            <i className="fas fa-chevron-right"></i>
                          </button>
                        </div>
                      </div>
                    </div>
                </>
              )}

              {/* VIEW 2: LAB APPOINTMENTS */}
              {activeMenu === 'lab' && (
                <div className="appointments-section-card">
                  <div className="section-card-header">
                    <div className="section-header-info">
                      <div className="section-icon-badge" style={{ background: '#F0FDF4', color: '#16A34A' }}>
                        <i className="fas fa-flask"></i>
                      </div>
                      <div>
                        <h3 className="section-title">Lab Appointments &amp; Diagnostics ({labAppointments.length})</h3>
                        <p className="section-subtitle">Track sample collection, testing progress, and download medical reports.</p>
                      </div>
                    </div>
                  </div>

                  <div className="ari-table-responsive">
                    <table className="ari-appointments-table">
                      <thead>
                        <tr>
                          <th>Test Details</th>
                          <th>Date &amp; Time</th>
                          <th>Diagnostic Center</th>
                          <th>Sample Status</th>
                          <th>Payment Status</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {labAppointments.map((lab) => (
                          <tr key={lab.id}>
                            <td>
                              <div className="fw-bold text-dark">{lab.testName}</div>
                              <small className="text-muted">Pathology Department</small>
                            </td>
                            <td>
                              <div className="table-date-cell">
                                <span className="table-date-main">{lab.date}</span>
                                <span className="table-date-sub">{lab.dayTime}</span>
                              </div>
                            </td>
                            <td>
                              <div className="fw-medium">{lab.center}</div>
                            </td>
                            <td>
                              <span className={`status-pill ${lab.sampleStatus === 'Collected' ? 'status-pill-completed' : 'status-pill-pending'}`}>
                                {lab.sampleStatus}
                              </span>
                            </td>
                            <td>
                              <div className="table-payment-cell">
                                <span className="payment-badge payment-badge-paid">Paid</span>
                                <span className="payment-amount">₹{lab.amount}</span>
                              </div>
                            </td>
                            <td>
                              <button
                                type="button"
                                className="btn-action-outline"
                                onClick={() => showToast(`Report download started for ${lab.testName}`)}
                              >
                                <i className="fas fa-download"></i> {lab.reportStatus === 'Ready to Download' ? 'Download Report' : 'Track Sample'}
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* VIEW 3: RADIOLOGY APPOINTMENTS */}
              {activeMenu === 'radiology' && (
                <div className="appointments-section-card">
                  <div className="section-card-header">
                    <div className="section-header-info">
                      <div className="section-icon-badge" style={{ background: '#FAF5FF', color: '#9333EA' }}>
                        <i className="fas fa-x-ray"></i>
                      </div>
                      <div>
                        <h3 className="section-title">Radiology &amp; Imaging Appointments ({radiologyAppointments.length})</h3>
                        <p className="section-subtitle">Manage appointments for X-Ray, MRI, Ultrasound, and CT Scans.</p>
                      </div>
                    </div>
                  </div>

                  <div className="ari-table-responsive">
                    <table className="ari-appointments-table">
                      <thead>
                        <tr>
                          <th>Scan / Procedure</th>
                          <th>Date &amp; Time</th>
                          <th>Location / Room</th>
                          <th>Preparation Note</th>
                          <th>Status</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {radiologyAppointments.map((rad) => (
                          <tr key={rad.id}>
                            <td>
                              <div className="fw-bold text-dark">{rad.scanType}</div>
                              <small className="text-muted">High Precision Digital Imaging</small>
                            </td>
                            <td>
                              <div className="table-date-cell">
                                <span className="table-date-main">{rad.date}</span>
                                <span className="table-date-sub">{rad.dayTime}</span>
                              </div>
                            </td>
                            <td>
                              <div className="fw-medium">{rad.center}</div>
                              <small className="text-muted">{rad.room}</small>
                            </td>
                            <td>
                              <span className="badge bg-light text-dark border p-2">
                                <i className="fas fa-info-circle text-primary me-1"></i> {rad.preparation}
                              </span>
                            </td>
                            <td>
                              <span className={`status-pill ${rad.status === 'Completed' ? 'status-pill-completed' : 'status-pill-confirmed'}`}>
                                {rad.status}
                              </span>
                            </td>
                            <td>
                              <button
                                type="button"
                                className="btn-action-outline"
                                onClick={() => showToast(`Preparation instructions sent to your registered mobile number.`)}
                              >
                                <i className="fas fa-file-medical"></i> View Instructions
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
        </div>
      </div>

      {/* ========================================================
          MODALS
         ======================================================== */}

      {/* MODAL 1: PAY NOW */}
      {modalType === 'pay' && selectedAppointment && (
        <div className="modal-backdrop-custom" onClick={() => setModalType(null)}>
          <div className="modal-dialog-custom" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header-custom">
              <h5>Complete Payment</h5>
              <button className="modal-close-btn" onClick={() => setModalType(null)}>
                <i className="fas fa-times"></i>
              </button>
            </div>
            <div className="modal-body-custom">
              <div className="alert alert-primary d-flex align-items-center mb-4">
                <i className="fas fa-lock me-3 fs-4"></i>
                <div>
                  <strong>Secure 256-Bit Encrypted Payment</strong>
                  <div className="small">ARI-Health Gateway</div>
                </div>
              </div>

              <div className="card mb-4 bg-light border-0">
                <div className="card-body">
                  <div className="d-flex justify-content-between mb-2">
                    <span className="text-muted">Doctor:</span>
                    <strong>{selectedAppointment.doctor}</strong>
                  </div>
                  <div className="d-flex justify-content-between mb-2">
                    <span className="text-muted">Specialty:</span>
                    <span>{selectedAppointment.specialty}</span>
                  </div>
                  <div className="d-flex justify-content-between mb-2">
                    <span className="text-muted">Appointment Slot:</span>
                    <span>{selectedAppointment.date} ({selectedAppointment.dayTime})</span>
                  </div>
                  <hr />
                  <div className="d-flex justify-content-between mb-2">
                    <span>Consultation Fee:</span>
                    <span>₹{selectedAppointment.amount}</span>
                  </div>
                  <div className="d-flex justify-content-between mb-2">
                    <span>Hospital Convenience Fee:</span>
                    <span className="text-success">FREE</span>
                  </div>
                  <div className="d-flex justify-content-between fs-5 fw-bold text-dark pt-2 border-top">
                    <span>Total Amount:</span>
                    <span className="text-primary">₹{selectedAppointment.amount}</span>
                  </div>
                </div>
              </div>

              <div className="mb-3">
                <label className="form-label fw-bold">Select Payment Method</label>
                <div className="d-flex flex-column gap-2">
                  <label className={`p-3 border rounded-3 d-flex align-items-center justify-content-between cursor-pointer ${paymentMethod === 'upi' ? 'border-primary bg-light' : ''}`}>
                    <div className="d-flex align-items-center gap-3">
                      <input
                        type="radio"
                        name="payMethod"
                        checked={paymentMethod === 'upi'}
                        onChange={() => setPaymentMethod('upi')}
                      />
                      <i className="fas fa-mobile-alt text-primary fs-5"></i>
                      <span>Instant UPI (Google Pay / PhonePe / Paytm)</span>
                    </div>
                    <span className="badge bg-success">Instant</span>
                  </label>

                  <label className={`p-3 border rounded-3 d-flex align-items-center justify-content-between cursor-pointer ${paymentMethod === 'card' ? 'border-primary bg-light' : ''}`}>
                    <div className="d-flex align-items-center gap-3">
                      <input
                        type="radio"
                        name="payMethod"
                        checked={paymentMethod === 'card'}
                        onChange={() => setPaymentMethod('card')}
                      />
                      <i className="fas fa-credit-card text-primary fs-5"></i>
                      <span>Credit or Debit Card</span>
                    </div>
                  </label>

                  <label className={`p-3 border rounded-3 d-flex align-items-center justify-content-between cursor-pointer ${paymentMethod === 'netbanking' ? 'border-primary bg-light' : ''}`}>
                    <div className="d-flex align-items-center gap-3">
                      <input
                        type="radio"
                        name="payMethod"
                        checked={paymentMethod === 'netbanking'}
                        onChange={() => setPaymentMethod('netbanking')}
                      />
                      <i className="fas fa-university text-primary fs-5"></i>
                      <span>Net Banking</span>
                    </div>
                  </label>
                </div>
              </div>
            </div>
            <div className="modal-footer-custom">
              <button className="btn btn-light" onClick={() => setModalType(null)}>
                Cancel
              </button>
              <button className="btn btn-primary px-4 fw-bold" onClick={handleProcessPayment}>
                <i className="fas fa-lock me-2"></i> Pay ₹{selectedAppointment.amount}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 2: RESCHEDULE */}
      {modalType === 'reschedule' && selectedAppointment && (
        <div className="modal-backdrop-custom" onClick={() => setModalType(null)}>
          <div className="modal-dialog-custom" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header-custom">
              <h5>Reschedule Appointment</h5>
              <button className="modal-close-btn" onClick={() => setModalType(null)}>
                <i className="fas fa-times"></i>
              </button>
            </div>
            <div className="modal-body-custom">
              <div className="p-3 bg-light rounded-3 mb-4">
                <div className="fw-bold text-dark">{selectedAppointment.doctor}</div>
                <div className="text-muted small">{selectedAppointment.specialty} • {selectedAppointment.hospital}</div>
                <div className="mt-2 small text-primary">
                  Current slot: <strong>{selectedAppointment.date}, {selectedAppointment.dayTime}</strong>
                </div>
              </div>

              <div className="mb-3">
                <label className="form-label fw-bold">Select New Date</label>
                <input
                  type="date"
                  className="form-control"
                  value={rescheduleDate}
                  onChange={(e) => setRescheduleDate(e.target.value)}
                  min="2026-09-21"
                />
              </div>

              <div className="mb-3">
                <label className="form-label fw-bold">Select Available Time Slot</label>
                <div className="row g-2">
                  {['09:30 AM', '10:15 AM', '11:00 AM', '02:30 PM', '04:00 PM', '05:30 PM'].map((slot) => (
                    <div className="col-4" key={slot}>
                      <button
                        type="button"
                        className={`btn w-100 btn-sm ${rescheduleTime === slot ? 'btn-primary' : 'btn-outline-secondary'}`}
                        onClick={() => setRescheduleTime(slot)}
                      >
                        {slot}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="modal-footer-custom">
              <button className="btn btn-light" onClick={() => setModalType(null)}>
                Close
              </button>
              <button className="btn btn-primary px-4 fw-bold" onClick={handleConfirmReschedule}>
                Confirm Reschedule
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 3: CANCEL */}
      {modalType === 'cancel' && selectedAppointment && (
        <div className="modal-backdrop-custom" onClick={() => setModalType(null)}>
          <div className="modal-dialog-custom" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header-custom">
              <h5 className="text-danger">
                <i className="fas fa-exclamation-triangle me-2"></i> Cancel Appointment
              </h5>
              <button className="modal-close-btn" onClick={() => setModalType(null)}>
                <i className="fas fa-times"></i>
              </button>
            </div>
            <div className="modal-body-custom">
              <p>
                Are you sure you want to cancel your consultation with <strong>{selectedAppointment.doctor}</strong> scheduled for <strong>{selectedAppointment.date} ({selectedAppointment.dayTime})</strong>?
              </p>

              <div className="mb-3">
                <label className="form-label fw-bold">Reason for cancellation</label>
                <select
                  className="form-select"
                  value={cancelReason}
                  onChange={(e) => setCancelReason(e.target.value)}
                >
                  <option value="Change of schedule">Change of schedule / Conflict</option>
                  <option value="Doctor unavailable">Need a different doctor</option>
                  <option value="Recovered">Feeling better / Recovered</option>
                  <option value="Booked by mistake">Booked by mistake</option>
                  <option value="Other">Other reason</option>
                </select>
              </div>

              {selectedAppointment.paymentStatus === 'Paid' && (
                <div className="alert alert-info small mb-0">
                  <i className="fas fa-info-circle me-1"></i> Since this appointment was already paid, a full refund of <strong>₹{selectedAppointment.amount}</strong> will be initiated back to your original payment method within 2-3 business days.
                </div>
              )}
            </div>
            <div className="modal-footer-custom">
              <button className="btn btn-light" onClick={() => setModalType(null)}>
                Keep Appointment
              </button>
              <button className="btn btn-danger px-4 fw-bold" onClick={handleConfirmCancel}>
                Yes, Cancel Appointment
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 4: INVOICE */}
      {modalType === 'invoice' && selectedAppointment && (
        <div className="modal-backdrop-custom" onClick={() => setModalType(null)}>
          <div className="modal-dialog-custom" style={{ maxWidth: '640px' }} onClick={(e) => e.stopPropagation()}>
            <div className="modal-header-custom">
              <h5>Medical Invoice &amp; Receipt</h5>
              <button className="modal-close-btn" onClick={() => setModalType(null)}>
                <i className="fas fa-times"></i>
              </button>
            </div>
            <div className="modal-body-custom">
              <div className="invoice-sheet">
                <div className="invoice-header">
                  <div>
                    <div className="invoice-brand-title">
                      <i className="fas fa-plus-square me-2"></i>ARI-HEALTH
                    </div>
                    <div className="invoice-meta-item">Hospital &amp; Healthcare Network</div>
                    <div className="invoice-meta-item">{selectedAppointment.hospital}</div>
                    <div className="invoice-meta-item">GSTIN: 07AAACH1234F1Z8</div>
                  </div>
                  <div className="text-end">
                    <span className="badge bg-success mb-2 px-3 py-2">PAID IN FULL</span>
                    <div className="invoice-meta-item">
                      Invoice: <strong>#INV-2026-{selectedAppointment.id}</strong>
                    </div>
                    <div className="invoice-meta-item">Date: {selectedAppointment.date}</div>
                  </div>
                </div>

                <div className="row mb-4">
                  <div className="col-6">
                    <div className="text-muted small">Billed To:</div>
                    <strong>Nitin Dinkar</strong>
                    <div className="small text-muted">+91 9876543210</div>
                    <div className="small text-muted">Patient ID: ARI-PT-8842</div>
                  </div>
                  <div className="col-6 text-end">
                    <div className="text-muted small">Consulting Specialist:</div>
                    <strong>{selectedAppointment.doctor}</strong>
                    <div className="small text-muted">{selectedAppointment.specialty}</div>
                    <div className="small text-muted">{selectedAppointment.room}</div>
                  </div>
                </div>

                <table className="invoice-table">
                  <thead>
                    <tr>
                      <th>Service Description</th>
                      <th>Qty</th>
                      <th className="text-end">Amount (INR)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <strong>Outpatient Consultation (OPD)</strong>
                        <div className="text-muted small">Specialist OPD visit fee</div>
                      </td>
                      <td>1</td>
                      <td className="text-end">₹{selectedAppointment.amount}.00</td>
                    </tr>
                    <tr>
                      <td>Electronic Health Record &amp; Vitals Capture</td>
                      <td>1</td>
                      <td className="text-end text-success">₹0.00</td>
                    </tr>
                  </tbody>
                </table>

                <div className="invoice-total-row">
                  <span>Total Amount Paid:</span>
                  <span>₹{selectedAppointment.amount}.00</span>
                </div>
              </div>
            </div>
            <div className="modal-footer-custom">
              <button className="btn btn-light" onClick={() => setModalType(null)}>
                Close
              </button>
              <button
                className="btn btn-primary"
                onClick={() => {
                  window.print();
                  showToast('Invoice sent to print preview.');
                }}
              >
                <i className="fas fa-print me-2"></i> Print / Download PDF
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 5: DETAILS */}
      {modalType === 'details' && selectedAppointment && (
        <div className="modal-backdrop-custom" onClick={() => setModalType(null)}>
          <div className="modal-dialog-custom" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header-custom">
              <h5>Appointment Details</h5>
              <button className="modal-close-btn" onClick={() => setModalType(null)}>
                <i className="fas fa-times"></i>
              </button>
            </div>
            <div className="modal-body-custom">
              <div className="p-3 bg-light rounded-3 mb-4">
                <div className="d-flex justify-content-between align-items-center">
                  <span className="fw-bold text-dark fs-5">{selectedAppointment.doctor}</span>
                  <span className={`status-pill ${selectedAppointment.status === 'completed' ? 'status-pill-completed' : 'status-pill-cancelled'}`}>
                    {selectedAppointment.status}
                  </span>
                </div>
                <div className="text-primary fw-medium">{selectedAppointment.specialty}</div>
              </div>

              <div className="row g-3 mb-4">
                <div className="col-6">
                  <div className="text-muted small">Date &amp; Time</div>
                  <div className="fw-bold">{selectedAppointment.date}</div>
                  <div className="small text-muted">{selectedAppointment.dayTime}</div>
                </div>
                <div className="col-6">
                  <div className="text-muted small">Hospital &amp; Room</div>
                  <div className="fw-bold">{selectedAppointment.hospital}</div>
                  <div className="small text-muted">{selectedAppointment.room}</div>
                </div>
                <div className="col-6">
                  <div className="text-muted small">Token Number</div>
                  <div className="fw-bold">{selectedAppointment.tokenNo || '-'}</div>
                </div>
                <div className="col-6">
                  <div className="text-muted small">Amount Paid</div>
                  <div className="fw-bold">₹{selectedAppointment.amount}</div>
                </div>
              </div>

              {selectedAppointment.status === 'cancelled' && (
                <div className="alert alert-warning small mb-0">
                  <i className="fas fa-info-circle me-1"></i> This consultation was cancelled. If you still need medical attention, please book a new slot or contact hospital support.
                </div>
              )}
            </div>
            <div className="modal-footer-custom">
              <button className="btn btn-primary px-4" onClick={() => setModalType(null)}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Floating Action Toast */}
      {toastMessage && (
        <div className={`ari-toast ${toastMessage.type}`}>
          <i className="fas fa-info-circle"></i>
          <span>{toastMessage.text}</span>
        </div>
      )}

      {/* Footer */}
      <Footer />
    </div>
  );
}
