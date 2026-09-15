/**
 * API Endpoints Constants
 * 
 * Centralized file to maintain all application API routes.
 * Using this prevents hardcoded strings throughout the application.
 */

// const base_url= 'http://localhost:8080';
const base_url= 'https://api.arigenhmis.com/hims';

export const API_BASE_URL = import.meta.env.HIMS_API_BASE_URL || base_url;

export const ENDPOINTS = {
  AUTH: {
    SEND_OTP: '/mobileController/mLogin',
    VERIFY_OTP: '/mobileController/verifyOtp',
    // LOGOUT: '/auth/logout',
  },
  MASTER: {
    GET_ALL_HOSPITALS: '/master/hospitalResponse/getAll/1',
  },
  APPOINTMENTS: {
    HISTORY_LIST: '/mobileController/getAppointmentHistoryList'
  },
  // USERS: {
  //   PROFILE: '/users/profile',
  //   UPDATE: '/users/update',
  // },
  // Add other modules here like PATIENTS, DOCTORS, APPOINTMENTS etc.
};
