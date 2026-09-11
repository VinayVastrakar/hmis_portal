import React, { useEffect } from 'react';

export default function AlertNotification({ alert, onClose }) {
  useEffect(() => {
    if (!alert) return;
    const timer = setTimeout(() => {
      onClose();
    }, 4500);
    return () => clearTimeout(timer);
  }, [alert, onClose]);

  if (!alert) return null;

  return (
    <div 
      className={`alert-notification alert alert-${alert.type || 'info'} alert-dismissible fade show`} 
      role="alert"
    >
      <div>
        {alert.type === 'warning' && <i className="fas fa-exclamation-triangle me-2"></i>}
        {alert.type === 'success' && <i className="fas fa-check-circle me-2"></i>}
        {alert.type === 'info' && <i className="fas fa-info-circle me-2"></i>}
        {alert.message}
      </div>
      <button 
        type="button" 
        className="btn-close" 
        aria-label="Close" 
        onClick={onClose}
      ></button>
    </div>
  );
}
