// src/services/clientService.js
import api from './api';

/**
 * Get all clients
 * @returns {Promise<Array>} Array of client objects
 */
export const getClients = async () => {
  try {
    const response = await api.get('/clients');
    return response.data;
  } catch (error) {
    console.error('Error fetching clients:', error);
    throw error;
  }
};

/**
 * Get a specific client by ID
 * @param {string|number} id - Client ID
 * @returns {Promise<Object>} Client object
 */
export const getClientById = async (id) => {
  try {
    const response = await api.get(`/clients/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching client with ID ${id}:`, error);
    throw error;
  }
};

/**
 * Add a new client
 * @param {Object} clientData - Client data object
 * @returns {Promise<Object>} Created client object
 */
export const addClient = async (clientData) => {
  try {
    const response = await api.post('/clients', clientData);
    return response.data;
  } catch (error) {
    console.error('Error adding client:', error);
    throw error;
  }
};

/**
 * Update an existing client
 * @param {string|number} id - Client ID
 * @param {Object} clientData - Updated client data
 * @returns {Promise<Object>} Updated client object
 */
export const updateClient = async (id, clientData) => {
  try {
    const response = await api.put(`/clients/${id}`, clientData);
    return response.data;
  } catch (error) {
    console.error(`Error updating client with ID ${id}:`, error);
    throw error;
  }
};

/**
 * Delete a client
 * @param {string|number} id - Client ID
 * @returns {Promise<void>}
 */
export const deleteClient = async (id) => {
  try {
    await api.delete(`/clients/${id}`);
  } catch (error) {
    console.error(`Error deleting client with ID ${id}:`, error);
    throw error;
  }
};

/**
 * Search for clients by name or other criteria
 * @param {string} searchTerm - Search term
 * @returns {Promise<Array>} Array of matching client objects
 */
export const searchClients = async (searchTerm) => {
  try {
    const response = await api.get(`/clients/search?term=${encodeURIComponent(searchTerm)}`);
    return response.data;
  } catch (error) {
    console.error('Error searching clients:', error);
    throw error;
  }
};

/**
 * Get client projects
 * @param {string|number} clientId - Client ID
 * @param {string} status - Project status (pending, active, closed)
 * @returns {Promise<Array>} Array of project objects
 */
export const getClientProjects = async (clientId, status = '') => {
  try {
    const url = status 
      ? `/clients/${clientId}/projects?status=${status}`
      : `/clients/${clientId}/projects`;
    const response = await api.get(url);
    return response.data;
  } catch (error) {
    console.error(`Error fetching projects for client with ID ${clientId}:`, error);
    throw error;
  }
};