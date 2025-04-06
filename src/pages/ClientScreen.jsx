import React, { useState } from 'react';
import MainLayout from '../components/layout/MainLayout';
import ClientList from '../components/clients/ClientsList/ClientList';
import ClientCard from '../components/clients/ClientCard/ClientCard';
import ProjectsBox from '../components/clients/ProjectsBox/ProjectsBox';
import AddClientModal from '../components/clients/ClientsForms/AddClientModal';
import { useClientContext } from '../contexts/ClientContext';
import './ClientScreen.css';

/**
 * Main screen for client management
 * Contains the client list, client details, and projects in a bento box layout
 */
const ClientScreen = () => {
  // State for controlling modals
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  
  // Get client context data
  const { selectedClient, selectClient } = useClientContext();

  return (
    <MainLayout>
      <div className="client-screen-container">
        {/* Left side: Client List */}
        <div className="client-list-container">
          <ClientList 
            onClientSelect={selectClient}
            onAddNew={() => setIsAddModalOpen(true)}
          />
        </div>
        
        {/* Right side: Client details and Projects */}
        <div className="client-details-container">
          {/* Client details section */}
          <div className="client-card-container">
            {selectedClient ? (
              <ClientCard client={selectedClient} />
            ) : (
              <div className="no-selection-placeholder">
                <div className="placeholder-content">
                  <i className="placeholder-icon">👆</i>
                  <p>Select a client from the list to view details</p>
                </div>
              </div>
            )}
          </div>

          {/* Projects section */}
          <div className="projects-container">
            {selectedClient ? (
              <ProjectsBox clientId={selectedClient.id} />
            ) : (
              <div className="no-selection-placeholder">
                <div className="placeholder-content">
                  <p>Client projects will appear here</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Modals */}
      <AddClientModal 
        isOpen={isAddModalOpen} 
        onClose={() => setIsAddModalOpen(false)} 
      />
    </MainLayout>
  );
};

export default ClientScreen;