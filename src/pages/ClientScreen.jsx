// src/pages/ClientScreen.jsx
import React, { useEffect, useState } from 'react';
import supabase from '../config/supabaseClient'; 
import MainLayout from '../components/layout/MainLayout'; // Assuming you have a MainLayout component
import ClientList from '../components/clients/ClientsList/ClientList'; // Assuming you have a ClientList component
import ClientCard from '../components/clients/ClientCard/ClientCard'; // Assuming you have a ClientCard component
import ProjectsBox from '../components/clients/ProjectsBox/ProjectsBox'; // Assuming you have a ProjectsBox component
import AddClientModal from '../components/modal/AddClientModal'; // Assuming you have an AddClientModal component
import ClientListActions from '../components/clients/ClientsList/ClientListActions'; // Assuming you have a ClientListActions component
// Mock data
const mockClients = [
  {
    id: 1,
    name: "TechVision Inc.",
    contactName: "Sarah Johnson",
    lifecycleStage: "client",
    salesRep: "Michael Scott",
    office: "NY",
    email: "sarah@techvision.com",
    address: "123 Innovation Way, Silicon Valley, CA",
    website: "www.techvision.com",
    phone: "555-123-4567",
    ext: "789",
    contracts: [101, 202]
  },
  {
    id: 2,
    name: "Global Services LLC",
    contactName: "Robert Chen",
    lifecycleStage: "prospect",
    salesRep: "Jim Halpert",
    office: "Frankfurt",
    email: "robert@globalservices.com",
    address: "456 Corporate Blvd, Chicago, IL",
    website: "www.globalservices.com",
    phone: "555-987-6543",
    ext: "456",
    contracts: [300]
  },
  {
    id: 3,
    name: "Innovate Partners",
    contactName: "Maya Rodriguez",
    lifecycleStage: "lead",
    salesRep: "Dwight Schrute",
    office: "Rio de Janeiro",
    email: "maya@innovatepartners.com",
    address: "789 Venture St, Boston, MA",
    website: "www.innovatepartners.com",
    phone: "555-456-7890",
    ext: "789",
    contracts: [411]
  },
  {
    id: 4,
    name: "Forward Solutions",
    contactName: "Alex Thompson",
    lifecycleStage: "client",
    salesRep: "Michael Scott",
    office: "NY",
    email: "alex@forwardsolutions.com",
    address: "321 Progress Ave, Seattle, WA",
    website: "www.forwardsolutions.com",
    phone: "555-234-5678",
    ext: "144",
    contracts: [589]
  },
  {
    id: 5,
    name: "Bright Future Co",
    contactName: "Jordan Williams",
    lifecycleStage: "prospect",
    salesRep: "Jim Halpert",
    office: "Frankfurt",
    email: "jordan@brightfuture.com",
    address: "654 Opportunity Ln, Austin, TX",
    website: "www.brightfuture.com",
    phone: "555-876-5432",
    ext: "101",
    contracts: []
  }
];

const mockProjects = [
  {
    id: 201,
    clientId: 1,
    name: "CRM System Integration",
    status: "active",
    startDate: "2023-02-01",
    endDate: "2023-08-31",
    supportTickets: 3
  },
  {
    id: 202,
    clientId: 1,
    name: "Mobile App Development",
    status: "pending",
    startDate: "2023-09-15",
    endDate: "2024-03-15",
    supportTickets: 0
  },
  {
    id: 203,
    clientId: 4,
    name: "Digital Transformation",
    status: "active",
    startDate: "2023-04-01",
    endDate: "2023-10-31",
    supportTickets: 5
  },
  {
    id: 204,
    clientId: 1,
    name: "Website Redesign",
    status: "closed",
    startDate: "2022-11-15",
    endDate: "2023-01-31",
    supportTickets: 1
  }
];

const mockSalesReps = [
  { id: 1, name: "Michael Scott", office: "NY", email: "michael@globaltech.com", phone: "555-111-2222", ext: "123" },
  { id: 2, name: "Jim Halpert", office: "Frankfurt", email: "jim@globaltech.com", phone: "555-333-4444", ext: "456" },
  { id: 3, name: "Dwight Schrute", office: "Rio de Janeiro", email: "dwight@globaltech.com", phone: "555-555-6666", ext: "789" },
];

const mockContracts = [
  { id: 101, clientId: 1, type: "Software Development", startDate: "2023-01-15", endDate: "2023-12-31" },
  { id: 202, clientId: 1, type: "Support & Maintenance", startDate: "2023-01-15", endDate: "2024-01-14" },
  { id: 300, clientId: 2, type: "Consulting", startDate: "2023-03-10", endDate: "2023-09-10" },
  { id: 411, clientId: 3, type: "Digital Marketing", startDate: "2023-05-01", endDate: "2024-05-01" },
  { id: 589, clientId: 4, type: "Cloud Services", startDate: "2023-06-15", endDate: "2024-06-15" }
]

// Main ClientScreen component
const ClientScreen = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedClient, setSelectedClient] = useState(null);
  const [searchValue, setSearchValue] = useState('');

  const filteredClients = mockClients.filter(client =>
    client.name.toLowerCase().includes(searchValue.toLowerCase()) ||
    client.contactName.toLowerCase().includes(searchValue.toLowerCase())
  );

  const [fetchError, setFetchError] = useState(null);
  const [clients, setClients] = useState([]);

  useEffect(() => {
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

    fetchClients();
  }, []);
  
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
          />
        </div>
        
        {/* Middle: Client details */}
        <div className="client-details-container">
          {selectedClient ? (
            <>
              <ClientCard client={selectedClient} />
            </>
          ) : (
            <div className="no-selection-placeholder">
              Select a client to view details
            </div>
          )}
        </div>

        {/* Left: Projects */}

        <div className="projects-container">
          {selectedClient ? (
            <>
              <ProjectsBox clientId={selectedClient.id} />
            </>
          ) : (
            <div className="no-selection-placeholder">
              Select a client to view projects
            </div>
          )}
        </div>


      </div>
      
      <AddClientModal 
        isOpen={isAddModalOpen} 
        onClose={() => setIsAddModalOpen(false)}
      />
    </MainLayout>
  );
};

export default ClientScreen;