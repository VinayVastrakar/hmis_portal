import { API_BASE_URL } from '../constants/apiEndpoints';

/**
 * Global API Configuration and interceptor logic using native fetch.
 * Handles base URLs, default headers, and token injection.
 */

// Helper to get token (can be replaced with your state management or storage logic)
const getAuthToken = () => {
  return localStorage.getItem('token');
};

export const fetchApi = async (endpoint, options = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;
  
  const { requireAuth = true, ...restOptions } = options;

  // Set up default headers
  const headers = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    ...restOptions.headers,
  };

  // Inject Authorization token if it exists and requiresAuth is true
  if (requireAuth) {
    const token = getAuthToken();
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
  }

  const config = {
    ...restOptions,
    headers,
  };

  try {
    const response = await fetch(url, config);

    // Handle Unauthorized errors (e.g., redirect to login)
    if (response.status === 401) {
      console.warn('Unauthorized access - potentially expired token');
      // e.g., window.location.href = '/login';
    }

    // Parse JSON
    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      // You can throw a customized error object here
      throw {
        status: response.status,
        message: data.message || 'Something went wrong',
        data
      };
    }

    return data;
  } catch (error) {
    // Handle network errors or errors thrown above
    console.error('API Error:', error);
    throw error;
  }
};
