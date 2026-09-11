import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="footer-ari" id="contact">
      <div className="container-custom">
        <div className="row">
          <div className="col-lg-4 col-md-6 mb-5">
            <div className="brand-name mb-4">
              <img 
                src="https://i.postimg.cc/K8xgWmqf/logo-hal.png" 
                alt="ARI-Health Logo" 
                style={{ height: '50px', background: '#F8F9FF', padding: '6px 12px', borderRadius: '8px' }} 
              />
            </div>
            <p className="mb-4" style={{ color: '#B0B7C3' }}>
              Your health is our priority. Book appointments with top doctors easily and conveniently from anywhere.
            </p>
            <div className="d-flex gap-3">
              <a href="#facebook" className="text-white"><i className="fab fa-facebook-f"></i></a>
              <a href="#twitter" className="text-white"><i className="fab fa-twitter"></i></a>
              <a href="#linkedin" className="text-white"><i className="fab fa-linkedin-in"></i></a>
              <a href="#instagram" className="text-white"><i className="fab fa-instagram"></i></a>
            </div>
          </div>
          
          <div className="col-lg-2 col-md-6 mb-5">
            <h5 className="mb-4 text-white">Quick Links</h5>
            <div className="footer-links">
              <Link to="/dashboard">Home</Link>
              <a href="#doctors">Find Doctors</a>
              <Link to="/dashboard">Dashboard</Link>
              <a href="#appointments">Appointments</a>
              <a href="#emergency">Emergency</a>
            </div>
          </div>

          <div className="col-lg-3 col-md-6 mb-5">
            <h5 className="mb-4 text-white">Services</h5>
            <div className="footer-links">
              <a href="#consultation">Online Consultation</a>
              <a href="#lab">Lab Tests</a>
              <a href="#delivery">Medicine Delivery</a>
              <a href="#checkups">Health Checkups</a>
              <a href="#care">Specialist Care</a>
            </div>
          </div>

          <div className="col-lg-3 col-md-6 mb-5">
            <h5 className="mb-4 text-white">Contact Us</h5>
            <div className="footer-links">
              <p className="mb-3" style={{ color: '#B0B7C3' }}>
                <i className="fas fa-phone me-3"></i> 1800-300-9000
              </p>
              <p className="mb-3" style={{ color: '#B0B7C3' }}>
                <i className="fas fa-envelope me-3"></i> support@arihealth.com
              </p>
              <p className="mb-0" style={{ color: '#B0B7C3' }}>
                <i className="fas fa-map-marker-alt me-3"></i> 123 Health Street, Medical City, India
              </p>
            </div>
          </div>
        </div>

        <hr className="mt-4 mb-4" style={{ borderColor: '#2A2A3E' }} />
        
        <div className="row">
          <div className="col-md-6">
            <p className="mb-0" style={{ color: '#B0B7C3' }}>
              &copy; {new Date().getFullYear()} ARI-Health. All rights reserved.
            </p>
          </div>
          <div className="col-md-6 text-md-end mt-2 mt-md-0">
            <a href="#privacy" style={{ color: '#B0B7C3' }} className="me-4">Privacy Policy</a>
            <a href="#terms" style={{ color: '#B0B7C3' }}>Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
