// src/services/api.js
// This file handles the base API configuration and common API request functions

// Base URL for API - update this to match your API's URL when deployed
const API_BASE_URL = 'http://localhost:8000'; // Default for local development

/**
 * Handles API requests with appropriate error handling
 * @param {string} endpoint - The API endpoint to call (without the base URL)
 * @param {Object} options - Fetch options like method, headers, and body
 * @returns {Promise<any>} - Returns the parsed JSON response
 */
async function apiRequest(endpoint, options = {}) {
  // Set default headers if not provided
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  // Combine options with headers
  const requestOptions = {
    ...options,
    headers,
  };

  try {
    // Make the API request
    const response = await fetch(`${API_BASE_URL}${endpoint}`, requestOptions);

    // Check if the response was successful
    if (!response.ok) {
      // Try to parse error message from the response if available
      let errorData;
      try {
        errorData = await response.json();
      } catch (e) {
        // If response can't be parsed as JSON, use status text
        errorData = { message: response.statusText };
      }

      throw new Error(
        errorData.message || `API request failed with status ${response.status}`
      );
    }

    // For successful responses with no content (204)
    if (response.status === 204) {
      return null;
    }

    // Parse and return the JSON response
    return await response.json();
  } catch (error) {
    console.error('API request error:', error);
    throw error;
  }
}

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