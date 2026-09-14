import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function HealthRecords() {
  const [activeTab, setActiveTab] = useState('prescriptions');
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [downloadSuccessToast, setDownloadSuccessToast] = useState(false);

  // Health Records Menu Items
  const menuItems = [
    { id: 'prescriptions', label: 'Prescriptions', icon: 'fa-regular fa-file-lines' },
    { id: 'lab-results', label: 'Lab Results', icon: 'fa-solid fa-user-doctor' },
    { id: 'radiology-results', label: 'Radiology Results', icon: 'fa-solid fa-x-ray' },
    { id: 'ipd-records', label: 'IPD Records', icon: 'fa-solid fa-hospital-user' },
    { id: 'discharge-summaries', label: 'Discharge Summaries', icon: 'fa-solid fa-file-medical' },
  ];

  // Prescriptions Data (matching provided design reference)
  const prescriptionsData = [
    {
      id: 'rx-1',
      date: '10 Sep 2026',
      doctor: 'Dr. Sarah Johnson',
      specialty: 'Cardiologist',
      visitType: 'OPD',
      hospital: 'ARI Hospital, Delhi',
      diagnosis: 'Mild Hypertension & Palpitations',
      medicines: [
        { name: 'Amlodipine 5mg', dosage: '1 tablet', frequency: 'Once daily (Morning)', duration: '30 Days' },
        { name: 'Atorvastatin 10mg', dosage: '1 tablet', frequency: 'Once daily (Night)', duration: '30 Days' }
      ],
      notes: 'Follow low sodium diet. Re-check BP after 2 weeks.'
    },
    {
      id: 'rx-2',
      date: '18 Aug 2026',
      doctor: 'Dr. Priya Sharma',
      specialty: 'General Physician',
      visitType: 'OPD',
      hospital: 'ARI Hospital, Delhi',
      diagnosis: 'Seasonal Viral Infection',
      medicines: [
        { name: 'Paracetamol 650mg', dosage: '1 tablet', frequency: 'Thrice daily after meals', duration: '5 Days' },
        { name: 'Cetirizine 10mg', dosage: '1 tablet', frequency: 'Once daily at bedtime', duration: '5 Days' }
      ],
      notes: 'Hydrate well and rest adequately.'
    },
    {
      id: 'rx-3',
      date: '10 Jul 2026',
      doctor: 'Dr. Anil Mehta',
      specialty: 'Orthopedic',
      visitType: 'OPD',
      hospital: 'City Hospital, Delhi',
      diagnosis: 'Lumbar Strain / Lower Back Pain',
      medicines: [
        { name: 'Aceclofenac + Paracetamol', dosage: '1 tablet', frequency: 'Twice daily after meals', duration: '7 Days' },
        { name: 'Thiocolchicoside 4mg', dosage: '1 capsule', frequency: 'Twice daily', duration: '5 Days' }
      ],
      notes: 'Avoid lifting heavy objects. Perform lumbar stretches daily.'
    }
  ];

  // Lab Results Mock Data
  const labResultsData = [
    {
      id: 'lab-1',
      date: '02 Sep 2026',
      testName: 'Complete Blood Count (CBC) & ESR',
      doctor: 'Dr. Sarah Johnson',
      specialty: 'Cardiologist',
      visitType: 'OPD',
      status: 'Normal',
      hospital: 'ARI Central Pathology'
    },
    {
      id: 'lab-2',
      date: '15 Aug 2026',
      testName: 'Lipid Profile (Cholesterol, HDL, LDL)',
      doctor: 'Dr. Priya Sharma',
      specialty: 'General Physician',
      visitType: 'OPD',
      status: 'Borderline High',
      hospital: 'ARI Diagnostics Lab'
    },
    {
      id: 'lab-3',
      date: '28 Jun 2026',
      testName: 'HbA1c & Fasting Blood Sugar',
      doctor: 'Dr. Priya Sharma',
      specialty: 'General Physician',
      visitType: 'OPD',
      status: 'Normal (5.6%)',
      hospital: 'ARI Central Pathology'
    }
  ];

  // Radiology Results Mock Data
  const radiologyData = [
    {
      id: 'rad-1',
      date: '12 Jul 2026',
      scanName: 'X-Ray Lumbar Spine (AP & Lateral View)',
      doctor: 'Dr. Anil Mehta',
      specialty: 'Orthopedic',
      visitType: 'OPD',
      hospital: 'City Hospital Imaging Center'
    },
    {
      id: 'rad-2',
      date: '14 Jan 2026',
      scanName: 'Chest X-Ray (PA View)',
      doctor: 'Dr. Sarah Johnson',
      specialty: 'Cardiologist',
      visitType: 'OPD',
      hospital: 'ARI Hospital Radiology Wing'
    }
  ];

  // IPD Records Mock Data
  const ipdData = [
    {
      id: 'ipd-1',
      date: '14 Feb 2026 - 17 Feb 2026',
      admissionType: 'Day Care Surgery - Arthroscopy',
      doctor: 'Dr. Anil Mehta',
      specialty: 'Orthopedic',
      visitType: 'IPD',
      ward: 'Ward B, Bed 14',
      hospital: 'ARI Super Specialty Hospital'
    }
  ];

  // Discharge Summaries Mock Data
  const dischargeData = [
    {
      id: 'ds-1',
      date: '17 Feb 2026',
      summaryTitle: 'Discharge Summary - Knee Arthroscopy',
      doctor: 'Dr. Anil Mehta',
      specialty: 'Orthopedic',
      visitType: 'IPD',
      outcome: 'Stable & Discharged',
      hospital: 'ARI Super Specialty Hospital'
    }
  ];

  const handleOpenRecord = (record) => {
    setSelectedRecord(record);
    setShowModal(true);
  };

  const handleDownload = () => {
    setDownloadSuccessToast(true);
    setTimeout(() => {
      setDownloadSuccessToast(false);
    }, 3000);
  };

  const getActiveTabTitle = () => {
    const current = menuItems.find(item => item.id === activeTab);
    return current ? current.label : 'Health Records';
  };

  return (
    <div className="bg-light min-vh-100 d-flex flex-column">
      {/* Global Navbar */}
      <Navbar />

      {/* Main Content Area */}
      <main className="container-fluid px-3 px-lg-5 py-4 py-lg-5 flex-grow-1">
        <div className="row g-4 g-lg-5">
          {/* Left Menu Sidebar */}
          <div className="col-12 col-md-4 col-lg-3">
            <h5 className="fw-bold text-dark mb-3 ps-2">Health Records</h5>
            <div className="nav flex-column gap-1">
              {menuItems.map((item) => {
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setActiveTab(item.id)}
                    className={`btn d-flex align-items-center w-100 text-start py-3 px-3 rounded-3 border-0 ${
                      isActive
                        ? 'bg-white bg-opacity-10 text-primary fw-semibold border-start border-4 border-primary rounded-start-0'
                        : 'text-secondary bg-transparent fw-medium'
                    }`}
                    style={{
                      transition: 'all 0.2s ease',
                      fontSize: '0.95rem'
                    }}
                  >
                    <i className={`${item.icon} fs-5 me-3`} style={{ width: '24px', textAlign: 'center' }}></i>
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Section / Table Content */}
          <div className="col-12 col-md-8 col-lg-9">
            <h4 className="fw-bold text-dark mb-4">{getActiveTabTitle()}</h4>

            <div className="card border-0 shadow-sm rounded-4 bg-white p-3 p-lg-4">
              <div className="table-responsive">
                {activeTab === 'prescriptions' && (
                  <table className="table table-hover align-middle mb-0">
                    <thead>
                      <tr className="border-bottom">
                        <th scope="col" className="text-secondary fw-semibold py-3 border-0" style={{ fontSize: '0.9rem' }}>Date</th>
                        <th scope="col" className="text-secondary fw-semibold py-3 border-0" style={{ fontSize: '0.9rem' }}>Doctor</th>
                        <th scope="col" className="text-secondary fw-semibold py-3 border-0" style={{ fontSize: '0.9rem' }}>Specialty</th>
                        <th scope="col" className="text-secondary fw-semibold py-3 border-0" style={{ fontSize: '0.9rem' }}>Visit Type</th>
                        <th scope="col" className="text-secondary fw-semibold py-3 border-0" style={{ fontSize: '0.9rem' }}>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {prescriptionsData.map((item) => (
                        <tr key={item.id} className="border-bottom">
                          <td className="py-3 text-dark fw-medium" style={{ fontSize: '0.92rem' }}>{item.date}</td>
                          <td className="py-3 text-dark fw-medium" style={{ fontSize: '0.92rem' }}>{item.doctor}</td>
                          <td className="py-3 text-dark" style={{ fontSize: '0.92rem' }}>{item.specialty}</td>
                          <td className="py-3 text-dark" style={{ fontSize: '0.92rem' }}>{item.visitType}</td>
                          <td className="py-3">
                            <button
                              type="button"
                              className="btn btn-outline-primary btn-sm px-3 rounded-2 fw-medium"
                              onClick={() => handleOpenRecord(item)}
                            >
                              View / Download
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}

                {activeTab === 'lab-results' && (
                  <table className="table table-hover align-middle mb-0">
                    <thead>
                      <tr className="border-bottom">
                        <th scope="col" className="text-secondary fw-semibold py-3 border-0" style={{ fontSize: '0.9rem' }}>Test Date</th>
                        <th scope="col" className="text-secondary fw-semibold py-3 border-0" style={{ fontSize: '0.9rem' }}>Test Name</th>
                        <th scope="col" className="text-secondary fw-semibold py-3 border-0" style={{ fontSize: '0.9rem' }}>Ordered By</th>
                        <th scope="col" className="text-secondary fw-semibold py-3 border-0" style={{ fontSize: '0.9rem' }}>Status</th>
                        <th scope="col" className="text-secondary fw-semibold py-3 border-0" style={{ fontSize: '0.9rem' }}>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {labResultsData.map((item) => (
                        <tr key={item.id} className="border-bottom">
                          <td className="py-3 text-dark fw-medium" style={{ fontSize: '0.92rem' }}>{item.date}</td>
                          <td className="py-3 text-dark fw-semibold" style={{ fontSize: '0.92rem' }}>{item.testName}</td>
                          <td className="py-3 text-dark" style={{ fontSize: '0.92rem' }}>{item.doctor}</td>
                          <td className="py-3">
                            <span className={`badge ${item.status.includes('Normal') ? 'bg-success-subtle text-success' : 'bg-warning-subtle text-warning'} px-2 py-1`}>
                              {item.status}
                            </span>
                          </td>
                          <td className="py-3">
                            <button
                              type="button"
                              className="btn btn-outline-primary btn-sm px-3 rounded-2 fw-medium"
                              onClick={() => handleOpenRecord(item)}
                            >
                              View / Download
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}

                {activeTab === 'radiology-results' && (
                  <table className="table table-hover align-middle mb-0">
                    <thead>
                      <tr className="border-bottom">
                        <th scope="col" className="text-secondary fw-semibold py-3 border-0" style={{ fontSize: '0.9rem' }}>Date</th>
                        <th scope="col" className="text-secondary fw-semibold py-3 border-0" style={{ fontSize: '0.9rem' }}>Scan / Investigation</th>
                        <th scope="col" className="text-secondary fw-semibold py-3 border-0" style={{ fontSize: '0.9rem' }}>Doctor</th>
                        <th scope="col" className="text-secondary fw-semibold py-3 border-0" style={{ fontSize: '0.9rem' }}>Specialty</th>
                        <th scope="col" className="text-secondary fw-semibold py-3 border-0" style={{ fontSize: '0.9rem' }}>Visit Type</th>
                        <th scope="col" className="text-secondary fw-semibold py-3 border-0" style={{ fontSize: '0.9rem' }}>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {radiologyData.map((item) => (
                        <tr key={item.id} className="border-bottom">
                          <td className="py-3 text-dark fw-medium" style={{ fontSize: '0.92rem' }}>{item.date}</td>
                          <td className="py-3 text-dark fw-semibold" style={{ fontSize: '0.92rem' }}>{item.scanName}</td>
                          <td className="py-3 text-dark" style={{ fontSize: '0.92rem' }}>{item.doctor}</td>
                          <td className="py-3 text-dark" style={{ fontSize: '0.92rem' }}>{item.specialty}</td>
                          <td className="py-3 text-dark" style={{ fontSize: '0.92rem' }}>{item.visitType}</td>
                          <td className="py-3">
                            <button
                              type="button"
                              className="btn btn-outline-primary btn-sm px-3 rounded-2 fw-medium"
                              onClick={() => handleOpenRecord(item)}
                            >
                              View / Download
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}

                {activeTab === 'ipd-records' && (
                  <table className="table table-hover align-middle mb-0">
                    <thead>
                      <tr className="border-bottom">
                        <th scope="col" className="text-secondary fw-semibold py-3 border-0" style={{ fontSize: '0.9rem' }}>Duration</th>
                        <th scope="col" className="text-secondary fw-semibold py-3 border-0" style={{ fontSize: '0.9rem' }}>Admission Description</th>
                        <th scope="col" className="text-secondary fw-semibold py-3 border-0" style={{ fontSize: '0.9rem' }}>Doctor</th>
                        <th scope="col" className="text-secondary fw-semibold py-3 border-0" style={{ fontSize: '0.9rem' }}>Ward & Bed</th>
                        <th scope="col" className="text-secondary fw-semibold py-3 border-0" style={{ fontSize: '0.9rem' }}>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {ipdData.map((item) => (
                        <tr key={item.id} className="border-bottom">
                          <td className="py-3 text-dark fw-medium" style={{ fontSize: '0.92rem' }}>{item.date}</td>
                          <td className="py-3 text-dark fw-semibold" style={{ fontSize: '0.92rem' }}>{item.admissionType}</td>
                          <td className="py-3 text-dark" style={{ fontSize: '0.92rem' }}>{item.doctor}</td>
                          <td className="py-3 text-dark" style={{ fontSize: '0.92rem' }}>{item.ward}</td>
                          <td className="py-3">
                            <button
                              type="button"
                              className="btn btn-outline-primary btn-sm px-3 rounded-2 fw-medium"
                              onClick={() => handleOpenRecord(item)}
                            >
                              View / Download
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}

                {activeTab === 'discharge-summaries' && (
                  <table className="table table-hover align-middle mb-0">
                    <thead>
                      <tr className="border-bottom">
                        <th scope="col" className="text-secondary fw-semibold py-3 border-0" style={{ fontSize: '0.9rem' }}>Discharge Date</th>
                        <th scope="col" className="text-secondary fw-semibold py-3 border-0" style={{ fontSize: '0.9rem' }}>Summary Title</th>
                        <th scope="col" className="text-secondary fw-semibold py-3 border-0" style={{ fontSize: '0.9rem' }}>Consultant</th>
                        <th scope="col" className="text-secondary fw-semibold py-3 border-0" style={{ fontSize: '0.9rem' }}>Outcome</th>
                        <th scope="col" className="text-secondary fw-semibold py-3 border-0" style={{ fontSize: '0.9rem' }}>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {dischargeData.map((item) => (
                        <tr key={item.id} className="border-bottom">
                          <td className="py-3 text-dark fw-medium" style={{ fontSize: '0.92rem' }}>{item.date}</td>
                          <td className="py-3 text-dark fw-semibold" style={{ fontSize: '0.92rem' }}>{item.summaryTitle}</td>
                          <td className="py-3 text-dark" style={{ fontSize: '0.92rem' }}>{item.doctor}</td>
                          <td className="py-3">
                            <span className="badge bg-success-subtle text-success px-2 py-1">
                              {item.outcome}
                            </span>
                          </td>
                          <td className="py-3">
                            <button
                              type="button"
                              className="btn btn-outline-primary btn-sm px-3 rounded-2 fw-medium"
                              onClick={() => handleOpenRecord(item)}
                            >
                              View / Download
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Record Preview Modal (Bootstrap Standard Modal) */}
      {showModal && selectedRecord && (
        <>
          <div className="modal fade show d-block" tabIndex="-1" role="dialog" style={{ backgroundColor: 'rgba(15, 23, 42, 0.5)', zIndex: 1060 }}>
            <div className="modal-dialog modal-dialog-centered modal-lg" role="document">
              <div className="modal-content rounded-4 border-0 shadow">
                <div className="modal-header border-bottom py-3 px-4 bg-light rounded-top-4">
                  <div className="d-flex align-items-center gap-2">
                    <i className="fa-solid fa-file-medical text-primary fs-5"></i>
                    <h5 className="modal-title fw-bold text-dark mb-0">
                      {activeTab === 'prescriptions' ? 'Digital Prescription' : getActiveTabTitle()}
                    </h5>
                  </div>
                  <button
                    type="button"
                    className="btn-close shadow-none"
                    aria-label="Close"
                    onClick={() => setShowModal(false)}
                  ></button>
                </div>

                <div className="modal-body p-4">
                  {/* Doctor & Clinic Header Banner */}
                  <div className="p-3 bg-light rounded-3 mb-4 d-flex flex-wrap justify-content-between align-items-center gap-3">
                    <div>
                      <h6 className="fw-bold text-dark mb-1">{selectedRecord.doctor}</h6>
                      <p className="small text-muted mb-0">{selectedRecord.specialty} • {selectedRecord.hospital || 'ARI Hospital'}</p>
                    </div>
                    <div className="text-sm-end">
                      <span className="badge bg-primary-subtle text-primary px-3 py-1 mb-1 d-inline-block">
                        {selectedRecord.visitType || 'OPD'}
                      </span>
                      <div className="small text-muted">Date: <strong>{selectedRecord.date}</strong></div>
                    </div>
                  </div>

                  {/* Patient Info Card */}
                  <div className="border rounded-3 p-3 mb-4">
                    <div className="row g-2 small">
                      <div className="col-6 col-md-3">
                        <span className="text-muted d-block">Patient Name</span>
                        <strong className="text-dark">John Doe</strong>
                      </div>
                      <div className="col-6 col-md-3">
                        <span className="text-muted d-block">Age / Gender</span>
                        <strong className="text-dark">34 Yrs / Male</strong>
                      </div>
                      <div className="col-6 col-md-3">
                        <span className="text-muted d-block">Patient ID</span>
                        <strong className="text-dark">ARI-PT-8842</strong>
                      </div>
                      <div className="col-6 col-md-3">
                        <span className="text-muted d-block">ABHA ID</span>
                        <strong className="text-primary">91-8842-4912-5812</strong>
                      </div>
                    </div>
                  </div>

                  {/* Tab specific details */}
                  {activeTab === 'prescriptions' && (
                    <>
                      {selectedRecord.diagnosis && (
                        <div className="mb-3">
                          <h6 className="fw-bold text-dark mb-1">Diagnosis / Clinical Findings</h6>
                          <p className="text-secondary small mb-0">{selectedRecord.diagnosis}</p>
                        </div>
                      )}

                      <h6 className="fw-bold text-dark mb-2">Prescribed Medications (Rx)</h6>
                      <div className="table-responsive border rounded-3 mb-3">
                        <table className="table table-sm table-striped align-middle mb-0">
                          <thead className="table-light">
                            <tr>
                              <th className="py-2 px-3 small">Medicine Name</th>
                              <th className="py-2 px-3 small">Dosage</th>
                              <th className="py-2 px-3 small">Frequency</th>
                              <th className="py-2 px-3 small">Duration</th>
                            </tr>
                          </thead>
                          <tbody>
                            {selectedRecord.medicines ? (
                              selectedRecord.medicines.map((med, idx) => (
                                <tr key={idx}>
                                  <td className="py-2 px-3 fw-medium text-dark">{med.name}</td>
                                  <td className="py-2 px-3 text-secondary">{med.dosage}</td>
                                  <td className="py-2 px-3 text-secondary">{med.frequency}</td>
                                  <td className="py-2 px-3 text-secondary">{med.duration}</td>
                                </tr>
                              ))
                            ) : (
                              <tr>
                                <td colSpan="4" className="text-center py-2 text-muted">No medicines listed</td>
                              </tr>
                            )}
                          </tbody>
                        </table>
                      </div>

                      {selectedRecord.notes && (
                        <div className="alert alert-primary bg-primary bg-opacity-10 border-0 text-primary small py-2 px-3 mb-0">
                          <strong>Doctor's Advice: </strong>{selectedRecord.notes}
                        </div>
                      )}
                    </>
                  )}

                  {activeTab !== 'prescriptions' && (
                    <div className="p-4 text-center border rounded-3 bg-light">
                      <i className="fa-solid fa-file-circle-check text-primary fs-1 mb-2"></i>
                      <h6 className="fw-bold text-dark mb-1">Digitally Verified Medical Record</h6>
                      <p className="text-muted small mb-0">
                        This report was signed and verified electronically under Ayushman Bharat Digital Mission (ABDM).
                      </p>
                    </div>
                  )}
                </div>

                <div className="modal-footer border-top py-3 px-4 bg-light rounded-bottom-4 d-flex justify-content-between">
                  <button
                    type="button"
                    className="btn btn-light border px-4"
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>
                  <div className="d-flex gap-2">
                    <button
                      type="button"
                      className="btn btn-outline-primary px-3 fw-medium"
                      onClick={() => window.print()}
                    >
                      <i className="fa-solid fa-print me-2"></i> Print
                    </button>
                    <button
                      type="button"
                      className="btn btn-primary px-4 fw-medium"
                      onClick={handleDownload}
                    >
                      <i className="fa-solid fa-download me-2"></i> Download PDF
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Floating Download Success Toast */}
      {downloadSuccessToast && (
        <div className="position-fixed bottom-0 end-0 p-3" style={{ zIndex: 1100 }}>
          <div className="toast show align-items-center text-bg-success border-0 shadow-lg rounded-3" role="alert" aria-live="assertive" aria-atomic="true">
            <div className="d-flex">
              <div className="toast-body d-flex align-items-center gap-2">
                <i className="fa-solid fa-circle-check fs-5"></i>
                <span>Medical record PDF downloaded successfully!</span>
              </div>
              <button
                type="button"
                className="btn-close btn-close-white me-2 m-auto"
                aria-label="Close"
                onClick={() => setDownloadSuccessToast(false)}
              ></button>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <Footer />
    </div>
  );
}
