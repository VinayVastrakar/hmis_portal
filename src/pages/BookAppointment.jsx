import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function BookAppointment() {
  const navigate = useNavigate();

  // Filter States
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [consultationType, setConsultationType] = useState('in-person'); // 'in-person' or 'video'

  // Modal States
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [isSlotModalOpen, setIsSlotModalOpen] = useState(false);
  const [selectedDateIndex, setSelectedDateIndex] = useState(0);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState('10:30 AM');
  const [patientNote, setPatientNote] = useState('');
  const [bookingSuccessData, setBookingSuccessData] = useState(null);

  // Doctors Database
  const allDoctors = [
    {
      id: 'doc-1',
      name: 'Dr. Sarah Johnson',
      specialty: 'Cardiologist',
      location: 'ARI Hospital, Delhi',
      rating: 4.8,
      reviewsCount: 124,
      fee: 800,
      avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=256&h=256',
      gender: 'female',
      experience: '12 years exp.',
      availableTypes: ['in-person', 'video']
    },
    {
      id: 'doc-2',
      name: 'Dr. Michael Chen',
      specialty: 'Dermatologist',
      location: 'Skin Care Clinic, Mumbai',
      rating: 4.6,
      reviewsCount: 98,
      fee: 700,
      avatar: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=256&h=256',
      gender: 'male',
      experience: '9 years exp.',
      availableTypes: ['in-person', 'video']
    },
    {
      id: 'doc-3',
      name: 'Dr. Priya Sharma',
      specialty: 'General Physician',
      location: 'ARI Hospital, Delhi',
      rating: 4.7,
      reviewsCount: 210,
      fee: 500,
      avatar: 'https://images.unsplash.com/photo-1594824813686-25f0e1f7c1d7?auto=format&fit=crop&q=80&w=256&h=256',
      gender: 'female',
      experience: '14 years exp.',
      availableTypes: ['in-person', 'video']
    },
    {
      id: 'doc-4',
      name: 'Dr. Anil Mehta',
      specialty: 'Orthopedic',
      location: 'City Hospital, Delhi',
      rating: 4.9,
      reviewsCount: 156,
      fee: 600,
      avatar: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=256&h=256',
      gender: 'male',
      experience: '16 years exp.',
      availableTypes: ['in-person']
    },
    {
      id: 'doc-5',
      name: 'Dr. Kavita Rao',
      specialty: 'ENT Specialist',
      location: 'ARI Hospital, Delhi',
      rating: 4.8,
      reviewsCount: 87,
      fee: 500,
      avatar: 'https://images.unsplash.com/photo-1527613426441-4da17471b66d?auto=format&fit=crop&q=80&w=256&h=256',
      gender: 'female',
      experience: '10 years exp.',
      availableTypes: ['in-person', 'video']
    },
    {
      id: 'doc-6',
      name: 'Dr. Rajesh Kumar',
      specialty: 'General Physician',
      location: 'Health Care Center, Noida',
      rating: 4.5,
      reviewsCount: 64,
      fee: 400,
      avatar: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=256&h=256',
      gender: 'male',
      experience: '8 years exp.',
      availableTypes: ['in-person']
    }
  ];

  // Available Dates for Slot Booking
  const availableDates = [
    { day: 'Today', date: '11', month: 'Sep', full: '11 Sep 2026' },
    { day: 'Sat', date: '12', month: 'Sep', full: '12 Sep 2026' },
    { day: 'Sun', date: '13', month: 'Sep', full: '13 Sep 2026' },
    { day: 'Mon', date: '14', month: 'Sep', full: '14 Sep 2026' },
    { day: 'Tue', date: '15', month: 'Sep', full: '15 Sep 2026' }
  ];

  // Time Slots by Period
  const timeSlots = {
    morning: ['09:00 AM', '09:45 AM', '10:30 AM', '11:15 AM'],
    afternoon: ['02:00 PM', '02:45 PM', '03:30 PM'],
    evening: ['04:15 PM', '05:00 PM', '05:45 PM', '06:30 PM']
  };

  // Filter Logic
  const filteredDoctors = allDoctors.filter(doc => {
    // Search query matches name, specialty, or location
    const q = searchQuery.toLowerCase().trim();
    const matchesSearch = !q ||
      doc.name.toLowerCase().includes(q) ||
      doc.specialty.toLowerCase().includes(q) ||
      doc.location.toLowerCase().includes(q);

    // Specialty filter
    const matchesSpecialty = !selectedSpecialty || doc.specialty === selectedSpecialty;

    // Location filter
    const matchesLocation = !selectedLocation || doc.location === selectedLocation;

    // Consultation Type filter
    const matchesType = !consultationType || doc.availableTypes.includes(consultationType);

    return matchesSearch && matchesSpecialty && matchesLocation && matchesType;
  });

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedSpecialty('');
    setSelectedLocation('');
    setConsultationType('in-person');
  };

  const handleOpenSlots = (doctor) => {
    setSelectedDoctor(doctor);
    setSelectedDateIndex(0);
    setSelectedTimeSlot('10:30 AM');
    setPatientNote('');
    setBookingSuccessData(null);
    setIsSlotModalOpen(true);
  };

  const handleConfirmBooking = () => {
    const bookingId = `APT-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    const bookedDate = availableDates[selectedDateIndex].full;
    setBookingSuccessData({
      bookingId,
      doctor: selectedDoctor.name,
      specialty: selectedDoctor.specialty,
      location: selectedDoctor.location,
      date: bookedDate,
      time: selectedTimeSlot,
      fee: selectedDoctor.fee,
      type: consultationType === 'video' ? 'Video Consultation' : 'In-Person Consultation'
    });
  };

  return (
    <div className="book-appointment-page">
      {/* Global Navigation */}
      <Navbar />

      {/* Main Container */}
      <div className="book-appointment-container">
        <div className="book-appointment-grid">
          {/* ========================================================
              LEFT COLUMN: FIND A DOCTOR FILTER CARD
             ======================================================== */}
          <aside className="find-doctor-card">
            <div className="find-doctor-header">
              <h2 className="find-doctor-title">
                Find a Doctor <span className="find-doctor-indicator"></span>
              </h2>
            </div>

            <form onSubmit={(e) => e.preventDefault()}>
              {/* Search by doctor name, specialty or symptoms */}
              <div className="find-doctor-group">
                <input
                  type="text"
                  className="find-doctor-input"
                  placeholder="Search by doctor name, specialty or symptoms..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              {/* Specialty Dropdown */}
              <div className="find-doctor-group">
                <label className="find-doctor-label">Specialty</label>
                <select
                  className="find-doctor-select"
                  value={selectedSpecialty}
                  onChange={(e) => setSelectedSpecialty(e.target.value)}
                >
                  <option value="">Select Specialty</option>
                  <option value="Cardiologist">Cardiologist</option>
                  <option value="Dermatologist">Dermatologist</option>
                  <option value="General Physician">General Physician</option>
                  <option value="Orthopedic">Orthopedic</option>
                  <option value="ENT Specialist">ENT Specialist</option>
                </select>
              </div>

              {/* Location Dropdown */}
              <div className="find-doctor-group">
                <label className="find-doctor-label">Location</label>
                <select
                  className="find-doctor-select"
                  value={selectedLocation}
                  onChange={(e) => setSelectedLocation(e.target.value)}
                >
                  <option value="">Select Location</option>
                  <option value="ARI Hospital, Delhi">ARI Hospital, Delhi</option>
                  <option value="Skin Care Clinic, Mumbai">Skin Care Clinic, Mumbai</option>
                  <option value="City Hospital, Delhi">City Hospital, Delhi</option>
                  <option value="Health Care Center, Noida">Health Care Center, Noida</option>
                </select>
              </div>

              {/* Consultation Type */}
              <div className="find-doctor-group">
                <label className="find-doctor-label">Consultation Type</label>
                <div className="consultation-radio-group">
                  <label className="consultation-radio-item">
                    <input
                      type="radio"
                      name="consultationType"
                      className="consultation-radio-input"
                      checked={consultationType === 'in-person'}
                      onChange={() => setConsultationType('in-person')}
                    />
                    <span className="consultation-radio-text">In-Person</span>
                  </label>

                  <label className="consultation-radio-item">
                    <input
                      type="radio"
                      name="consultationType"
                      className="consultation-radio-input"
                      checked={consultationType === 'video'}
                      onChange={() => setConsultationType('video')}
                    />
                    <span className="consultation-radio-text">Video Consultation</span>
                  </label>
                </div>
              </div>

              {/* Search Button */}
              <button
                type="button"
                className="btn-search-doctors"
                onClick={() => {}}
              >
                Search
              </button>

              {/* Clear filters if any filter is active */}
              {(searchQuery || selectedSpecialty || selectedLocation || consultationType !== 'in-person') && (
                <button
                  type="button"
                  className="btn-reset-filters"
                  onClick={handleResetFilters}
                >
                  Reset all filters
                </button>
              )}
            </form>
          </aside>

          {/* ========================================================
              RIGHT COLUMN: DOCTOR CARDS LIST
             ======================================================== */}
          <main className="doctors-list-section">
            <div className="doctors-list-header">
              <span className="doctors-count-text">
                Showing {filteredDoctors.length} available {filteredDoctors.length === 1 ? 'specialist' : 'specialists'}
              </span>
            </div>

            {filteredDoctors.length === 0 ? (
              <div className="card border-0 p-5 text-center bg-white rounded-4">
                <i className="fas fa-user-md fs-1 text-muted mb-3"></i>
                <h5 className="fw-bold">No doctors found</h5>
                <p className="text-muted small mb-3">Try adjusting your search criteria, specialty, or location.</p>
                <button className="btn btn-outline-primary mx-auto" onClick={handleResetFilters}>
                  Clear all filters
                </button>
              </div>
            ) : (
              filteredDoctors.map((doc) => (
                <div className="doctor-card" key={doc.id}>
                  {/* Doctor Left Info: Avatar + Details */}
                  <div className="doctor-card-left">
                    <div className="doctor-avatar-wrapper">
                      <img
                        src={doc.avatar}
                        alt={doc.name}
                        className="doctor-avatar-img"
                        onError={(e) => {
                          e.target.src = 'https://i.postimg.cc/k47Z6t44/default-doctor.png';
                        }}
                      />
                      <span className="doctor-online-badge" title="Available for appointments"></span>
                    </div>

                    <div className="doctor-primary-details">
                      <h3 className="doctor-name-title">{doc.name}</h3>
                      <p className="doctor-specialty-link">{doc.specialty}</p>
                      <p className="doctor-location-text">
                        <i className="fas fa-map-marker-alt text-muted"></i> {doc.location}
                      </p>
                      <div className="doctor-rating-row">
                        <span className="doctor-rating-star">★</span>
                        <span className="doctor-rating-score">{doc.rating}</span>
                        <span className="doctor-reviews-count">({doc.reviewsCount} reviews)</span>
                      </div>
                    </div>
                  </div>

                  {/* Doctor Right Info: Fee + View Slots Button */}
                  <div className="doctor-card-right">
                    <div className="doctor-fee-box">
                      <div className="doctor-fee-amount">₹{doc.fee}</div>
                      <div className="doctor-fee-label">Consultation Fee</div>
                    </div>

                    <button
                      type="button"
                      className="btn-view-slots"
                      onClick={() => handleOpenSlots(doc)}
                    >
                      View Slots
                    </button>
                  </div>
                </div>
              ))
            )}
          </main>
        </div>
      </div>

      {/* ========================================================
          INTERACTIVE "VIEW SLOTS" BOOKING MODAL
         ======================================================== */}
      {isSlotModalOpen && selectedDoctor && (
        <div className="modal-backdrop-custom" onClick={() => setIsSlotModalOpen(false)}>
          <div className="modal-dialog-custom" style={{ maxWidth: '620px' }} onClick={(e) => e.stopPropagation()}>
            {!bookingSuccessData ? (
              <>
                <div className="modal-header-custom">
                  <h5 className="fw-bold">Select Appointment Slot</h5>
                  <button className="modal-close-btn" onClick={() => setIsSlotModalOpen(false)}>
                    <i className="fas fa-times"></i>
                  </button>
                </div>

                <div className="modal-body-custom">
                  {/* Doctor Summary Banner */}
                  <div className="d-flex align-items-center gap-3 p-3 bg-light rounded-3 mb-4">
                    <img
                      src={selectedDoctor.avatar}
                      alt={selectedDoctor.name}
                      style={{ width: '56px', height: '56px', borderRadius: '50%', objectFit: 'cover' }}
                    />
                    <div className="flex-grow-1">
                      <h6 className="fw-bold mb-1 text-dark">{selectedDoctor.name}</h6>
                      <div className="small text-primary fw-semibold">{selectedDoctor.specialty}</div>
                      <div className="small text-muted">{selectedDoctor.location}</div>
                    </div>
                    <div className="text-end">
                      <div className="fw-bold fs-5 text-dark">₹{selectedDoctor.fee}</div>
                      <span className="badge bg-primary-subtle text-primary">
                        {consultationType === 'video' ? 'Video' : 'In-Person'}
                      </span>
                    </div>
                  </div>

                  {/* Date Selector Tabs */}
                  <label className="form-label fw-bold small text-muted text-uppercase mb-2">
                    1. Choose Date
                  </label>
                  <div className="slot-date-tabs">
                    {availableDates.map((d, index) => (
                      <button
                        key={d.full}
                        type="button"
                        className={`slot-date-tab ${selectedDateIndex === index ? 'active' : ''}`}
                        onClick={() => setSelectedDateIndex(index)}
                      >
                        <span className="slot-date-day">{d.day}</span>
                        <span className="slot-date-num">{d.date}</span>
                        <small>{d.month}</small>
                      </button>
                    ))}
                  </div>

                  {/* Time Slots Selection */}
                  <label className="form-label fw-bold small text-muted text-uppercase mb-2">
                    2. Choose Time Slot ({availableDates[selectedDateIndex].full})
                  </label>

                  {/* Morning */}
                  <div className="slot-period-group">
                    <div className="slot-period-title">
                      <i className="far fa-sun text-warning"></i> Morning Slots
                    </div>
                    <div className="slot-pills-container">
                      {timeSlots.morning.map(slot => (
                        <button
                          key={slot}
                          type="button"
                          className={`slot-time-pill ${selectedTimeSlot === slot ? 'selected' : ''}`}
                          onClick={() => setSelectedTimeSlot(slot)}
                        >
                          {slot}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Afternoon */}
                  <div className="slot-period-group">
                    <div className="slot-period-title">
                      <i className="fas fa-cloud-sun text-primary"></i> Afternoon Slots
                    </div>
                    <div className="slot-pills-container">
                      {timeSlots.afternoon.map(slot => (
                        <button
                          key={slot}
                          type="button"
                          className={`slot-time-pill ${selectedTimeSlot === slot ? 'selected' : ''}`}
                          onClick={() => setSelectedTimeSlot(slot)}
                        >
                          {slot}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Evening */}
                  <div className="slot-period-group">
                    <div className="slot-period-title">
                      <i className="far fa-moon text-secondary"></i> Evening Slots
                    </div>
                    <div className="slot-pills-container">
                      {timeSlots.evening.map(slot => (
                        <button
                          key={slot}
                          type="button"
                          className={`slot-time-pill ${selectedTimeSlot === slot ? 'selected' : ''}`}
                          onClick={() => setSelectedTimeSlot(slot)}
                        >
                          {slot}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Optional Patient Symptoms / Notes */}
                  <div className="mt-3">
                    <label className="form-label fw-bold small text-muted text-uppercase">
                      3. Symptoms / Reason for Visit (Optional)
                    </label>
                    <textarea
                      className="form-control"
                      rows="2"
                      placeholder="Briefly describe your symptoms or medical concern..."
                      value={patientNote}
                      onChange={(e) => setPatientNote(e.target.value)}
                    ></textarea>
                  </div>
                </div>

                <div className="modal-footer-custom">
                  <button className="btn btn-light" onClick={() => setIsSlotModalOpen(false)}>
                    Cancel
                  </button>
                  <button className="btn btn-primary px-4 fw-bold" onClick={handleConfirmBooking}>
                    Confirm &amp; Book Slot
                  </button>
                </div>
              </>
            ) : (
              /* Booking Success Confirmation State */
              <>
                <div className="modal-header-custom border-0 pb-0">
                  <button className="modal-close-btn ms-auto" onClick={() => setIsSlotModalOpen(false)}>
                    <i className="fas fa-times"></i>
                  </button>
                </div>
                <div className="modal-body-custom text-center pt-0 px-4">
                  <div
                    className="mx-auto rounded-circle d-flex align-items-center justify-content-center text-white mb-3"
                    style={{ width: '70px', height: '70px', background: '#22C55E', fontSize: '2rem' }}
                  >
                    <i className="fas fa-check"></i>
                  </div>
                  <h4 className="fw-bold text-dark mb-1">Appointment Confirmed!</h4>
                  <p className="text-muted small mb-4">
                    Your appointment has been successfully booked with <strong>{bookingSuccessData.doctor}</strong>.
                  </p>

                  <div className="card bg-light border-0 p-3 text-start mb-4">
                    <div className="d-flex justify-content-between mb-2">
                      <span className="text-muted small">Appointment ID:</span>
                      <strong className="text-primary">{bookingSuccessData.bookingId}</strong>
                    </div>
                    <div className="d-flex justify-content-between mb-2">
                      <span className="text-muted small">Specialist:</span>
                      <span>{bookingSuccessData.doctor} ({bookingSuccessData.specialty})</span>
                    </div>
                    <div className="d-flex justify-content-between mb-2">
                      <span className="text-muted small">Date &amp; Time:</span>
                      <strong>{bookingSuccessData.date}, {bookingSuccessData.time}</strong>
                    </div>
                    <div className="d-flex justify-content-between mb-2">
                      <span className="text-muted small">Location:</span>
                      <span>{bookingSuccessData.location}</span>
                    </div>
                    <div className="d-flex justify-content-between mb-2">
                      <span className="text-muted small">Mode:</span>
                      <span className="badge bg-primary-subtle text-primary">{bookingSuccessData.type}</span>
                    </div>
                    <div className="d-flex justify-content-between pt-2 border-top">
                      <span className="text-muted small">Consultation Fee:</span>
                      <strong className="text-dark">₹{bookingSuccessData.fee}</strong>
                    </div>
                  </div>

                  <div className="alert alert-info small d-flex align-items-center mb-0">
                    <i className="fas fa-info-circle me-2 fs-5"></i>
                    <div>
                      An SMS confirmation with hospital token and instructions has been sent to your registered mobile number.
                    </div>
                  </div>
                </div>

                <div className="modal-footer-custom justify-content-center gap-3">
                  <button
                    className="btn btn-outline-secondary"
                    onClick={() => setIsSlotModalOpen(false)}
                  >
                    Book Another
                  </button>
                  <button
                    className="btn btn-primary px-4 fw-bold"
                    onClick={() => {
                      setIsSlotModalOpen(false);
                      navigate('/appointments');
                    }}
                  >
                    <i className="fas fa-calendar-check me-2"></i> Go to My Appointments
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* Global Footer */}
      <Footer />
    </div>
  );
}
