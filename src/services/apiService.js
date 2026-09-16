import { fetchApi } from './apiConfig';

/**
 * Generic API Service methods
 * Provides clean methods for GET, POST, PUT, PATCH, DELETE operations.
 */

export const apiService = {
  /**
   * Perform a GET request
   * @param {string} endpoint - The endpoint URL (e.g., '/users/profile')
   * @param {object} options - Optional configuration including headers, requireAuth, etc.
   */
  get: (endpoint, options = {}) => {
    return fetchApi(endpoint, {
      method: 'GET',
      ...options,
    });
  },

  /**
   * Perform a POST request
   * @param {string} endpoint - The endpoint URL
   * @param {object} body - The request payload
   * @param {object} options - Optional configuration including headers, requireAuth, etc.
   */
  post: (endpoint, body, options = {}) => {
    return fetchApi(endpoint, {
      method: 'POST',
      body: JSON.stringify(body),
      ...options,
    });
  },

  /**
   * Perform a PUT request
   * @param {string} endpoint - The endpoint URL
   * @param {object} body - The request payload
   * @param {object} options - Optional configuration including headers, requireAuth, etc.
   */
  put: (endpoint, body, options = {}) => {
    return fetchApi(endpoint, {
      method: 'PUT',
      body: JSON.stringify(body),
      ...options,
    });
  },

  /**
   * Perform a PATCH request
   * @param {string} endpoint - The endpoint URL
   * @param {object} body - The request payload
   * @param {object} options - Optional configuration including headers, requireAuth, etc.
   */
  patch: (endpoint, body, options = {}) => {
    return fetchApi(endpoint, {
      method: 'PATCH',
      body: JSON.stringify(body),
      ...options,
    });
  },

  /**
   * Perform a DELETE request
   * @param {string} endpoint - The endpoint URL
   * @param {object} options - Optional configuration including headers, requireAuth, etc.
   */
  delete: (endpoint, options = {}) => {
    return fetchApi(endpoint, {
      method: 'DELETE',
      ...options,
    });
  },

  /**
   * Perform a GET request to fetch a PDF or Blob
   * @param {string} endpoint - The endpoint URL
   * @param {object} options - Optional configuration
   */
  getPdf: async (endpoint, options = {}) => {
    const { requireAuth = true, ...restOptions } = options;
    const { API_BASE_URL } = await import('../constants/apiEndpoints');
    
    const headers = {
      'Accept': 'application/pdf',
      ...restOptions.headers,
    };

    if (requireAuth) {
      const token = localStorage.getItem('token');
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }
    }

    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'GET',
      ...restOptions,
      headers,
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch PDF: ${response.statusText}`);
    }

    return await response.blob();
  }
};
