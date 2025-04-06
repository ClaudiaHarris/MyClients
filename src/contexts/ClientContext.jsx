import React, { createContext, useState, useEffect, useContext } from 'react';
import { getClients, updateClient, deleteClient } from '../services/clientService';

// Create the context
const ClientContext = createContext();


export const ClientProvider = ({ children }) => {
  // Initialize clients as an empty array
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedClient, setSelectedClient] = useState(null);

  // Fetch clients when the component mounts
  useEffect(() => {
    fetchClients();
  }, []);

  
  //Fetch all clients from the API
   
  const fetchClients = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getClients();
      setClients(data);
    } catch (err) {
      setError('Unable to connect to the server. Please check your connection and try again.');
      console.error('Error fetching clients:', err);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Create a new client
   * 
   * @param {Object} clientData - Data for the new client
   * @returns {Promise<Object>} - The newly created client
   */
  const createClient = async (clientData) => {
    try {
      const response = await fetch('http://localhost:8000/clients', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(clientData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      // Ensure we're spreading an array
      setClients(prevClients => Array.isArray(prevClients) ? [...prevClients, data] : [data]);
      return data;
    } catch (error) {
      console.error('Error in createClient:', error);
      throw error;
    }
  };

  /**
   * Update an existing client
   * 
   * @param {string|number} id - The ID of the client to update
   * @param {Object} clientData - New data for the client
   * @returns {Promise<Object>} - The updated client
   */
  const editClient = async (id, clientData) => {
    try {
      setLoading(true);
      // Make the API call to update the client
      const updatedClient = await updateClient(id, clientData);
      // Update the local state with the updated client
      setClients((prevClients) => 
        Array.isArray(prevClients) 
          ? prevClients.map((client) => client.id === id ? updatedClient : client)
          : [updatedClient]
      );
      
      // If this is the currently selected client, update that too
      if (selectedClient?.id === id) {
        setSelectedClient(updatedClient);
      }
      
      return updatedClient;
    } catch (err) {
      setError('Failed to update client. Please try again.');
      console.error('Error updating client:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  /**
   * Delete a client
   * 
   * @param {string|number} id - The ID of the client to delete
   * @returns {Promise<void>}
   */
  const removeClient = async (id) => {
    try {
      setLoading(true);
      // Make the API call to delete the client
      await deleteClient(id);
      // Update the local state by removing the client
      setClients((prevClients) => 
        prevClients.filter((client) => client.id !== id)
      );
      
      // If this was the selected client, clear the selection
      if (selectedClient && selectedClient.id === id) {
        setSelectedClient(null);
      }
    } catch (err) {
      setError('Failed to delete client. Please try again.');
      console.error('Error deleting client:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  /**
   * Select a client to view details
   * 
   * @param {Object|null} client - The client to select, or null to clear selection
   */
  const selectClient = (client) => {
    setSelectedClient(client);
  };

  // The value that will be provided to consumers of this context
  const contextValue = {
    clients,
    loading,
    error,
    selectedClient,
    createClient,
    editClient,
    removeClient,
    selectClient,
    refreshClients: fetchClients,
  };

  return (
    <ClientContext.Provider value={contextValue}>
      {children}
    </ClientContext.Provider>
  );
};

/**
 * Custom hook to use the client context
 * 
 * @returns {Object} The client context value
 * @throws {Error} If used outside of a ClientProvider
 */
export const useClientContext = () => {
  const context = useContext(ClientContext);
  
  if (context === undefined) {
    throw new Error('useClientContext must be used within a ClientProvider');
  }
  
  return context;
};

export default ClientContext;