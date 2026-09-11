import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import AlertNotification from '../components/AlertNotification';

const COUNTRY_CODES = [
  { code: '+91', country: 'India' },
  { code: '+1', country: 'USA' },
  { code: '+44', country: 'UK' },
  { code: '+61', country: 'Australia' },
  { code: '+971', country: 'UAE' },
];

export default function Login() {
  const [mobileNumber, setMobileNumber] = useState('');
  const [selectedCode, setSelectedCode] = useState('+91');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isVerifyingPin, setIsVerifyingPin] = useState(false);
  const [isSendingOtp, setIsSendingOtp] = useState(false);
  const [alert, setAlert] = useState(null);

  const inputRef = useRef(null);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }

    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleMobileChange = (e) => {
    const cleanValue = e.target.value.replace(/\D/g, '').slice(0, 10);
    setMobileNumber(cleanValue);
  };

  const validateMobile = () => {
    const trimmed = mobileNumber.trim();
    if (!trimmed) {
      setAlert({ message: 'Please enter your mobile number', type: 'warning' });
      inputRef.current?.focus();
      return false;
    }
    if (trimmed.length !== 10) {
      setAlert({ message: 'Please enter a valid 10-digit mobile number', type: 'warning' });
      inputRef.current?.focus();
      return false;
    }
    if (!/^[6-9]\d{9}$/.test(trimmed)) {
      setAlert({ message: 'Mobile number should start with 6, 7, 8, or 9', type: 'warning' });
      inputRef.current?.focus();
      return false;
    }
    return true;
  };

  const handleLoginWithPin = (e) => {
    e.preventDefault();
    if (!validateMobile()) return;

    setIsVerifyingPin(true);
    setAlert({ message: `Verifying PIN for ${selectedCode} ${mobileNumber}...`, type: 'info' });

    setTimeout(() => {
      setIsVerifyingPin(false);
      setAlert({ message: 'Login successful! Redirecting...', type: 'success' });
      setTimeout(() => {
        navigate('/dashboard');
      }, 700);
    }, 1500);
  };

  const handleGetOtp = (e) => {
    e.preventDefault();
    if (!validateMobile()) return;

    setIsSendingOtp(true);
    setAlert({ message: `Sending OTP to ${selectedCode} ${mobileNumber}...`, type: 'info' });

    setTimeout(() => {
      setIsSendingOtp(false);
      setAlert({ message: `OTP sent successfully to ${selectedCode} ${mobileNumber}`, type: 'success' });
      setTimeout(() => {
        navigate('/dashboard');
      }, 1000);
    }, 1500);
  };

  return (
    <div className="container-fluid px-0">
      <AlertNotification alert={alert} onClose={() => setAlert(null)} />
      
      <div className="row g-0">
        <div className="col-md-7 medical-theme-section">
          <div className="medical-background">
            <div className="medical-pattern"></div>
            
            {/* Logo */}
            <div className="logo-section">
              <img src="https://i.postimg.cc/K8xgWmqf/logo-hal.png" alt="ARI-Health Logo" />
            </div>
            
            {/* Medical Animated Illustration */}
            <div className="medical-illustration">
              <i className="fas fa-heartbeat medical-icon heart-icon"></i>
              <i className="fas fa-shield-alt medical-icon shield-icon"></i>
              <i className="fas fa-stethoscope medical-icon stethoscope-icon"></i>
            </div>
            
            {/* Content & Feature Badges */}
            <div className="medical-content">
              <h1 className="medical-title">Advanced Healthcare Platform</h1>
              <p className="medical-subtitle">
                Secure, efficient, and designed for modern healthcare needs. 
                Connecting patients with medical excellence.
              </p>
              
              <div className="features-grid">
                <div className="feature-item">
                  <div className="feature-icon">
                    <i className="fas fa-lock"></i>
                  </div>
                  <div className="feature-text">HIPAA Compliant</div>
                </div>
                <div className="feature-item">
                  <div className="feature-icon">
                    <i className="fas fa-bolt"></i>
                  </div>
                  <div className="feature-text">Instant Access</div>
                </div>
                <div className="feature-item">
                  <div className="feature-icon">
                    <i className="fas fa-user-md"></i>
                  </div>
                  <div className="feature-text">Doctor Verified</div>
                </div>
                <div className="feature-item">
                  <div className="feature-icon">
                    <i className="fas fa-chart-line"></i>
                  </div>
                  <div className="feature-text">Health Analytics</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Right Login Section */}
        <div className="col-md-5 col-12">
          <div className="login-section">
            <div className="login-card">
              <div className="welcome-text">Welcome Back</div>
              <h2 className="login-title">Login with your Mobile Number</h2>
              
              <form onSubmit={(e) => e.preventDefault()} id="loginForm">
                <div className="mb-4">
                  <label htmlFor="mobileNumber" className="form-label">Mobile Number</label>
                  <div className="input-group position-relative" ref={dropdownRef}>
                    <div 
                      className="country-code-dropdown" 
                      id="countryCodeDropdown"
                      onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    >
                      <span>{selectedCode}</span>
                      <span className="dropdown-arrow">
                        <i className="fas fa-chevron-down"></i>
                      </span>
                    </div>

                    {isDropdownOpen && (
                      <ul 
                        className="dropdown-menu show position-absolute" 
                        style={{ top: '100%', left: 0, zIndex: 1000, width: '180px' }}
                      >
                        {COUNTRY_CODES.map((item) => (
                          <li key={item.code}>
                            <button
                              type="button"
                              className="dropdown-item"
                              onClick={() => {
                                setSelectedCode(item.code);
                                setIsDropdownOpen(false);
                              }}
                            >
                              <strong>{item.code}</strong> {item.country}
                            </button>
                          </li>
                        ))}
                      </ul>
                    )}

                    <input 
                      ref={inputRef}
                      type="tel" 
                      className="form-control mobile-input" 
                      id="mobileNumber" 
                      placeholder="Enter 10 digit mobile number" 
                      maxLength={10}
                      pattern="[0-9]{10}" 
                      value={mobileNumber}
                      onChange={handleMobileChange}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          handleLoginWithPin(e);
                        }
                      }}
                      required 
                    />
                  </div>
                  <div className="form-text mt-2">Please enter your 10-digit mobile number.</div>
                </div>
                
                <div className="d-grid gap-3">
                  <button 
                    type="button" 
                    className="btn btn-login btn-pin" 
                    id="loginWithPin"
                    onClick={handleLoginWithPin}
                    disabled={isVerifyingPin || isSendingOtp}
                  >
                    {isVerifyingPin ? (
                      <>
                        <span className="spinner me-2"></span> Verifying PIN...
                      </>
                    ) : (
                      <>
                        <i className="fas fa-key me-2"></i> Login With Pin
                      </>
                    )}
                  </button>
                  
                  <button 
                    type="button" 
                    className="btn btn-login btn-otp" 
                    id="getOtp"
                    onClick={handleGetOtp}
                    disabled={isVerifyingPin || isSendingOtp}
                  >
                    {isSendingOtp ? (
                      <>
                        <span className="spinner me-2"></span> Sending OTP...
                      </>
                    ) : (
                      <>
                        <i className="fas fa-mobile-alt me-2"></i> Get OTP
                      </>
                    )}
                  </button>
                </div>
              </form>
              
              <div className="footer-info">
                <p className="text-muted mb-2">
                  By logging in, you agree to our{' '}
                  <a href="#terms" className="text-decoration-none">Terms & Conditions</a>{' '}
                  and{' '}
                  <a href="#privacy" className="text-decoration-none">Privacy Policy</a>
                </p>
                <p className="text-muted mb-0">
                  Need help?{' '}
                  <a href="#support" className="text-decoration-none">Contact Support</a>{' '}
                  or call 1800-300-9000
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
