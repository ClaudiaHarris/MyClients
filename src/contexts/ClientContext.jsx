import React, { createContext, useState, useEffect, useContext } from 'react';
import { getClients, addClient, updateClient, deleteClient } from '../services/clientService';

// Create the context
const ClientContext = createContext();

/**
 * ClientProvider component that wraps the application to provide client data and operations
 * 
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child components that will have access to the context
 */
export const ClientProvider = ({ children }) => {
  // State for clients data
  const [clients, setClients] = useState([]);
  // Loading state for asynchronous operations
  const [loading, setLoading] = useState(true);
  // Error state for handling failures
  const [error, setError] = useState(null);
  // Currently selected client
  const [selectedClient, setSelectedClient] = useState(null);

  // Fetch clients when the component mounts
  useEffect(() => {
    fetchClients();
  }, []);

  /**
   * Fetch all clients from the API
   */
  const fetchClients = async () => {
    try {
      setLoading(true);
      const data = await getClients();
      setClients(data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch clients. Please try again later.');
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
      setLoading(true);
      // Make the API call to create the client
      const newClient = await addClient(clientData);
      // Update the local state with the new client
      setClients((prevClients) => [...prevClients, newClient]);
      return newClient;
    } catch (err) {
      setError('Failed to create client. Please try again.');
      console.error('Error creating client:', err);
      throw err; // Re-throw to allow handling in the component that called this
    } finally {
      setLoading(false);
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
        prevClients.map((client) => 
          client.id === id ? updatedClient : client
        )
      );
      
      // If this is the currently selected client, update that too
      if (selectedClient && selectedClient.id === id) {
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