// src/pages/ClientScreen.jsx
import React, { useEffect, useState } from 'react';
import supabase from '../config/supabaseClient'; 
import MainLayout from '../components/layout/MainLayout'; 
import ClientList from '../components/clients/ClientsList/ClientList'; 
import ClientCard from '../components/clients/ClientCard/ClientCard'; 
import ProjectsBox from '../components/clients/ProjectsBox/ProjectsBox'; 
import AddClientModal from '../components/modal/AddClientModal'; 
import ClientListActions from '../components/clients/ClientsList/ClientListActions'; 

const ClientScreen = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false); // New state for edit modal
  const [selectedClient, setSelectedClient] = useState(null);
  const [searchValue, setSearchValue] = useState('');
  const [selectedContract, setSelectedContract] = useState(null);
  
  const [fetchError, setFetchError] = useState(null);
  const [clients, setClients] = useState([]);

  const fetchClients = async () => {
    const { data, error } = await supabase
      .from('clients')
      .select();

    if (error) {
      setFetchError('Could not fetch client');
      setClients(null);
      console.log(error);
    }
    if (data) {
      setClients(data);
      setFetchError(null);
    }
  };

  useEffect(() => {
    fetchClients();
  }, []);
  
  const handleEditClient = (client) => {
    setSelectedClient(client);
    setIsEditModalOpen(true);
  };

  const handleDeleteClient = async (client) => {
    if (window.confirm(`Are you sure you want to delete client "${client.legal_name}"?`)) {
      try {
        const { error } = await supabase
          .from('clients')
          .delete()
          .eq('client_id', client.client_id);

        if (error) {
          alert(`Error deleting client: ${error.message}`);
          return;
        }

        // If client was selected, clear the selection
        if (selectedClient?.client_id === client.client_id) {
          setSelectedClient(null);
        }

        // Refresh the client list
        fetchClients();
      } catch (err) {
        console.error('Error deleting client:', err);
        alert('Failed to delete client. Please try again.');
      }
    }
  };
  
  // Use Supabase clients for filtering/search
  const filteredClients = (clients || []).filter(client =>
    (client.legal_name || client.name || '').toLowerCase().includes(searchValue.toLowerCase()) ||
    (client.contact_name || '').toLowerCase().includes(searchValue.toLowerCase())
  );

  const handleContractSelect = (contract) => {
    setSelectedContract(contract);
  };

  const handleClearContractFilter = () => {
    setSelectedContract(null);
  }

  return (
    <MainLayout pageTitle="My Clients"> 
    

      <div className="client-screen-container">

        <div className="client-list-container">
          <ClientListActions 
            onAddNew={() => setIsAddModalOpen(true)}
            searchValue={searchValue}
            onSearchChange={setSearchValue}
          />
          <ClientList 
            clients={filteredClients}
            onClientSelect={setSelectedClient}
            onAddNew={() => setIsAddModalOpen(true)}
            onEdit={handleEditClient} 
            onDelete={handleDeleteClient}
          />
        </div>
        
        
        <div className="client-details-container">
          {selectedClient ? (
            <>
              <ClientCard 
              client={selectedClient}
              onContractSelect={handleContractSelect}
              selectedContract={selectedContract} />
            </>
          ) : (
            <div className="no-selection-placeholder">
              Select a client to view details
            </div>
          )}
        </div>

       

        <div className="projects-container">
          {selectedClient ? (
            <>
              <ProjectsBox 
                clientId={selectedClient.client_id}
                contractId={selectedContract?.contract_id}
                onClearContractFilter={handleClearContractFilter}
              />
            </>
          ) : (
            <div className="no-selection-placeholder">
              Select a client to view projects
            </div>
          )}
        </div>


      </div>
      
      <AddClientModal 
        isOpen={isAddModalOpen || isEditModalOpen} 
        onClose={() => {
          setIsAddModalOpen(false);
          setIsEditModalOpen(false);
          setSelectedClient(null);
        }}
        selectedClient={isEditModalOpen ? selectedClient : null} // Pass client only for edit
        onClientAdded={fetchClients}
      />
    </MainLayout>
  );
};

export default ClientScreen;