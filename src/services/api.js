import { API_CONFIG } from '../config/api.config';


const apiRequest = async (endpoint, options = {}) => {
  try {
    const url = `${API_CONFIG.BASE_URL}${endpoint}`;
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('API request error:', error);
    throw error;
  }
};

/**
 * HTTP GET request
 * @param {string} endpoint - The API endpoint
 * @param {Object} options - Additional options
 * @returns {Promise<any>} - The response data
 */
export const get = (endpoint, options = {}) => {
  return apiRequest(endpoint, { method: 'GET', ...options });
};

/**
 * HTTP POST request
 * @param {string} endpoint - The API endpoint
 * @param {Object} data - The data to send in the request body
 * @param {Object} options - Additional options
 * @returns {Promise<any>} - The response data
 */
export const post = (endpoint, data, options = {}) => {
  return apiRequest(endpoint, {
    method: 'POST',
    body: JSON.stringify(data),
    ...options,
  });
};

/**
 * HTTP PUT request
 * @param {string} endpoint - The API endpoint
 * @param {Object} data - The data to send in the request body
 * @param {Object} options - Additional options
 * @returns {Promise<any>} - The response data
 */
export const put = (endpoint, data, options = {}) => {
  return apiRequest(endpoint, {
    method: 'PUT',
    body: JSON.stringify(data),
    ...options,
  });
};

/**
 * HTTP PATCH request
 * @param {string} endpoint - The API endpoint
 * @param {Object} data - The data to send in the request body
 * @param {Object} options - Additional options
 * @returns {Promise<any>} - The response data
 */
export const patch = (endpoint, data, options = {}) => {
  return apiRequest(endpoint, {
    method: 'PATCH',
    body: JSON.stringify(data),
    ...options,
  });
};

/**
 * HTTP DELETE request
 * @param {string} endpoint - The API endpoint
 * @param {Object} options - Additional options
 * @returns {Promise<any>} - The response data
 */
export const remove = (endpoint, options = {}) => {
  return apiRequest(endpoint, { method: 'DELETE', ...options });
};

// Create all API methods
const api = {
  get,
  post,
  put,
  patch,
  remove,
};
// Export the object
export default api;