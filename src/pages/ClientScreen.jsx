// src/pages/ClientScreen.jsx
import React, { useEffect, useState } from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faUser, faCog, faSearch, faChevronRight } from '@fortawesome/free-solid-svg-icons'; 
import supabase from '../config/supabaseClient'; 



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
    contracts: [
      { id: 101, type: "Software Development", startDate: "2023-01-15", endDate: "2023-12-31" },
      { id: 102, type: "Support & Maintenance", startDate: "2023-01-15", endDate: "2024-01-14" }
    ]
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
    contracts: []
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
    contracts: []
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
    contracts: [
      { id: 103, type: "Consulting", startDate: "2023-03-10", endDate: "2023-09-10" }
    ]
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
//breadcrumb component
const Breadcrumb = () => {
  return (
    <div className="breadcrumb">
      <span className="breadcrumb-item">Dashboard </span>
      <FontAwesomeIcon icon={faChevronRight} className="breadcrumb-icon" />
      <span className="breadcrumb-item"> Clients </span>
      <FontAwesomeIcon icon={faChevronRight} className="breadcrumb-icon" />
      <span className="breadcrumb-item active"> My Clients</span>
    </div>
  );
};
//page-hero component
const PageHeader = () => {
  console.log (supabase)
  return (
    <div className="page-header">
      <h1 className="page-title">My Clients</h1>
    </div>
  );
};

// Simple Navbar component
const Navbar = () => {
  return (
    <nav className="navbar">
      
      <ul className="nav-button-links">
        <li><button className="nav-button-link">Dashboard</button></li>
        <li><button className="nav-button-link active">Clients</button></li>
        <li><button className="nav-button-link">Projects</button></li>
        <li><button className="nav-button-link">Contracts</button></li>
      </ul>
      <div className="nav-right">
        <button className="user-profile">
          <FontAwesomeIcon icon={faUser} className="user-icon"/> 
        </button>
        <button className="settings">
          <FontAwesomeIcon icon={faCog} className="settings-icon"/> 
        </button>
        
      </div>
    </nav>
  );
};

// Simple Button component
const Button = ({ children, onClick, variant = 'primary', type = 'button' }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`btn btn-${variant}`}
    >
      {children}
    </button>
  );
};

// Simple Search Bar component
const SearchBar = ({ value, onChange }) => {
  return (
    <div className="search-bar">
      <FontAwesomeIcon icon={faSearch} className="search-icon" />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search by client or contact name..."
        className="search-input"
      />
      {value && (
        <button 
          className="clear-search-btn"
          onClick={() => onChange('')}
        >
          ✕
        </button>
      )}
    </div>
  );
};

// Client Row component
const ClientRow = ({ client, onSelect }) => {
  return (
    <tr onClick={() => onSelect(client)} className="client-row">
      <td>{client.name}</td>
      <td>{client.contactName}</td>
      <td>
        <span className={`lifecycle-stage ${client.lifecycleStage}`}>
          {client.lifecycleStage}
        </span>
      </td>
      <td>{client.salesRep}</td>
      <td>{client.office}</td>
      <td>{client.email}</td>
      <td className="actions">
        <button 
          onClick={(e) => {
            e.stopPropagation(); // Prevent row selection
            alert(`Edit ${client.name}`); 
          }}
          className="edit-btn"
        >
          Edit
        </button>
        <button 
          onClick={(e) => {
            e.stopPropagation(); // Prevent row selection
            alert(`Delete ${client.name}`);
          }}
          className="delete-btn"
        >
          Delete
        </button>
      </td>
    </tr>
  );
};

// Client List component
const ClientList = ({ clients, onClientSelect, onAddNew }) => {
  const [sortField, setSortField] = useState('name');
  const [sortDirection, setSortDirection] = useState('asc');
  const [searchTerm, setSearchTerm] = useState('');



  // Filter clients based on search term
  const filteredClients = clients.filter(client => 
    client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.contactName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Sort clients based on sort field and direction
  const sortedClients = [...filteredClients].sort((a, b) => {
    if (sortDirection === 'asc') {
      return a[sortField] > b[sortField] ? 1 : -1;
    } else {
      return a[sortField] < b[sortField] ? 1 : -1;
    }
  });

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };



  return (
    <div className="client-list">
      <div className="client-table-container">
        <table className="client-table">
          <thead className="client-table-header">
            <tr>
              <th onClick={() => handleSort('name')}>
                Client Name
                {sortField === 'name' && (sortDirection === 'asc' ? ' ↑' : ' ↓')}
              </th>
              <th onClick={() => handleSort('contactName')}>
                Contact
                {sortField === 'contactName' && (sortDirection === 'asc' ? ' ↑' : ' ↓')}
              </th>
              <th onClick={() => handleSort('lifecycleStage')}>
                Lifecycle
                {sortField === 'lifecycleStage' && (sortDirection === 'asc' ? ' ↑' : ' ↓')}
              </th>
              <th onClick={() => handleSort('salesRep')}>
                Sales Rep
                {sortField === 'salesRep' && (sortDirection === 'asc' ? ' ↑' : ' ↓')}
              </th>
              <th onClick={() => handleSort('office')}>
                Office
                {sortField === 'office' && (sortDirection === 'asc' ? ' ↑' : ' ↓')}
              </th>
              <th>Email</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {sortedClients.map(client => (
              <ClientRow 
                key={client.id} 
                client={client} 
                onSelect={onClientSelect} 
              />
            ))}
            {sortedClients.length === 0 && (
              <tr>
                <td colSpan="7" className="no-clients-message">
                  No clients found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// Client Card Sub-Components
const ClientDetails = ({ name, address, website }) => {
  return (
    <div className="client-details-section">
    
      <div className="section-content">
        <h4><strong> {name}</strong></h4>
        <p> {address}</p>
        <p><span> 
          <a href={`https://${website}`} target="_blank" rel="noopener noreferrer">{website}</a>
          <div className="client-card-actions">
            <button className="edit-btn">Edit</button>
            <button className="delete-btn">Delete</button>
            <button className="archive-btn">Archive</button>
          </div>
        </span></p>
      </div>
    </div>
  );
};

const ContactSection = ({ name, email, phone, ext }) => {
  return (
    <div className="contact-section">
      
      <div className="section-content">
        <p><strong> {name}</strong></p>
        <p> {phone} ext:{ext}</p>
        <p> <span><a href={`mailto:${email}`}>{email}</a>
          <div className="client-card-actions">
            <button className="edit-btn">Edit</button>
            <button className="delete-btn">Delete</button>
          </div>
            </span></p>
        
      </div>
    </div>
  );
};

const SalesRepSection = ({ name, office, email, phone }) => {
  return (
    <div className="sales-rep-section">
      
      <div className="section-content">
        <p><strong>Sales Rep:</strong> {name || 'None assigned'}</p>
        {name && (
          <>
            <p><strong>Office:</strong> {office}</p>
            <p><strong>Contact:</strong> <a href={`mailto:${email}`}>{email}</a> | {phone}</p>
          </>
        )}
      </div>
    </div>
  );
};

const ContractsSection = ({ contracts }) => {
  return (
    <div className="contracts-section">
     
      {contracts.length > 0 ? (
        <table className="contracts-table">
          <thead>
            <tr>
              <th>Contract Type</th>
              <th>Start Date</th>
              <th>End Date</th>
            </tr>
          </thead>
          <tbody>
            {contracts.map(contract => (
              <tr key={contract.id}>
                <td>{contract.type}</td>
                <td>{contract.startDate}</td>
                <td>{contract.endDate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="no-contracts-message">No contracts available</p>
      )}
    </div>
  );
};

// Client Card component
const ClientCard = ({ client }) => {
  // Find the sales rep details from our mock data
  const salesRep = mockSalesReps.find(rep => rep.name === client.salesRep) || {};

  return (
    <div className="client-card">
           
      <div className="client-card-content">
        <ClientDetails 
          name={client.name}
          address={client.address} 
          website={client.website} 
        />
        
        <ContactSection 
          name={client.contactName} 
          email={client.email} 
          phone={client.phone} 
        />
        
        <SalesRepSection 
          name={salesRep.name} 
          office={salesRep.office} 
          email={salesRep.email} 
          phone={salesRep.phone} 
        />
        
        <ContractsSection contracts={client.contracts} />
      </div>
    </div>
  );
};

// Projects Box Components
const ProjectTabs = ({ activeTab, onTabChange, projectCounts }) => {
  return (
    <div className="project-tabs">
      <button 
        className={`tab ${activeTab === 'all' ? 'active' : ''}`}
        onClick={() => onTabChange('all')}
      >
        All ({projectCounts.all})
      </button>
      <button 
        className={`tab ${activeTab === 'pending' ? 'active' : ''}`}
        onClick={() => onTabChange('pending')}
      >
        Pending ({projectCounts.pending})
      </button>
      <button 
        className={`tab ${activeTab === 'active' ? 'active' : ''}`}
        onClick={() => onTabChange('active')}
      >
        Active ({projectCounts.active})
      </button>
      <button 
        className={`tab ${activeTab === 'closed' ? 'active' : ''}`}
        onClick={() => onTabChange('closed')}
      >
        Closed ({projectCounts.closed})
      </button>
    </div>
  );
};

const ProjectList = ({ projects }) => {
  return (
    <div className="project-list">
      {projects.length > 0 ? (
        <table className="projects-table">
          <thead>
            <tr>
              <th>Project Name</th>
              <th>Status</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Support Tickets</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {projects.map(project => (
              <tr key={project.id}>
                <td>{project.name}</td>
                <td>
                  <span className={`status-badge ${project.status}`}>
                    {project.status}
                  </span>
                </td>
                <td>{project.startDate}</td>
                <td>{project.endDate}</td>
                <td>
                  <button 
                    className="support-tickets-link"
                    onClick={() => alert(`View ${project.supportTickets} support tickets`)}
                  >
                    {project.supportTickets} tickets
                  </button>
                </td>
                <td className="actions">
                  <button className="edit-btn">Edit</button>
                  <button className="delete-btn">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="no-projects-message">No projects available</p>
      )}
    </div>
  );
};

const ProjectsBox = ({ clientId }) => {
  const [activeTab, setActiveTab] = useState('all');
  
  // Filter projects for this client
  const clientProjects = mockProjects.filter(project => project.clientId === clientId);
  
  // Filter projects based on the active tab
  const filteredProjects = activeTab === 'all' 
    ? clientProjects 
    : clientProjects.filter(project => project.status === activeTab);

  return (
    <div className="projects-box">
      <div className="projects-box-header">
        <h2>Projects</h2>
        <div className="projects-box-actions">
          <button className="add-project-btn">Add Project</button>
        </div>
      </div>

      <ProjectTabs 
        activeTab={activeTab} 
        onTabChange={setActiveTab} 
        projectCounts={{
          all: clientProjects.length,
          pending: clientProjects.filter(p => p.status === 'pending').length,
          active: clientProjects.filter(p => p.status === 'active').length,
          closed: clientProjects.filter(p => p.status === 'closed').length
        }}
      />
      
      <ProjectList projects={filteredProjects} />
    </div>
  );
};

// Main Layout component
const MainLayout = ({ children }) => {
  return (
    <div className="main-layout">
      <Navbar />
      <div className="header-logo">
        <img src="/globaltech-logo-light.svg" alt="GlobalTech Logo" className="logo" />
      </div>
      
      <main className="main-content">
        {children}
      </main>
    </div>
  );
};
// Add Client Modal component
const AddClientModal = ({ isOpen, onClose }) => {

  const [formData, setFormData] = useState({
    name: '',
    lifecycleStage: 'lead',
    address: '',
    contactName: '',
    contactPhone: '',
    contactEmail: '',
    salesRep: '',
    office: 'NY',
    website: ''
  });

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Early return after hooks
  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, you would add the client to your data
    console.log('New client data:', formData);
    alert('Client would be added here in a real app');
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-header">
          <h2>Add New Client</h2>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="modal-body">
            <div className="form-group">
              <label>Business Name*</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="form-control"
              />
            </div>
            
            <div className="form-group">
              <label>Lifecycle*</label>
              <select
                name="lifecycleStage"
                value={formData.lifecycleStage}
                onChange={handleChange}
                required
                className="form-control"
              >
                <option value="lead">Lead</option>
                <option value="prospect">Prospect</option>
                <option value="client">Client</option>
              </select>
            </div>
            
            <div className="form-group">
              <label>Main Address</label>
              <textarea
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="form-control"
                rows="3"
              />
            </div>
            
            <div className="form-group">
              <label>Website</label>
              <input
                type="url"
                name="website"
                value={formData.website}
                onChange={handleChange}
                className="form-control"
                placeholder="www.example.com"
              />
            </div>
            
            <div className="form-section">
              <h3>Contact Information</h3>
              
              <div className="form-group">
                <label>Contact Name*</label>
                <input
                  type="text"
                  name="contactName"
                  value={formData.contactName}
                  onChange={handleChange}
                  required
                  className="form-control"
                />
              </div>
              
              <div className="form-group">
                <label>Contact Phone</label>
                <input
                  type="tel"
                  name="contactPhone"
                  value={formData.contactPhone}
                  onChange={handleChange}
                  className="form-control"
                />
              </div>
              
              <div className="form-group">
                <label>Contact Email*</label>
                <input
                  type="email"
                  name="contactEmail"
                  value={formData.contactEmail}
                  onChange={handleChange}
                  required
                  className="form-control"
                />
              </div>
            </div>
            
            <div className="form-section">
              <h3>Assignment</h3>
              
              <div className="form-group">
                <label>Sales Representative</label>
                <select
                  name="salesRep"
                  value={formData.salesRep}
                  onChange={handleChange}
                  className="form-control"
                >
                  <option value="">Select a Sales Rep</option>
                  {mockSalesReps.map(rep => (
                    <option key={rep.id} value={rep.name}>{rep.name}</option>
                  ))}
                </select>
              </div>
              
              <div className="form-group">
                <label>GlobalTech Office*</label>
                <select
                  name="office"
                  value={formData.office}
                  onChange={handleChange}
                  required
                  className="form-control"
                >
                  <option value="NY">New York</option>
                  <option value="Frankfurt">Frankfurt</option>
                  <option value="Rio de Janeiro">Rio de Janeiro</option>
                </select>
              </div>
            </div>
          </div>
          
          <div className="modal-footer">
            <Button type="button" variant="secondary" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" variant="primary">
              Add Client
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

const AddClientButton = ({ onClick }) => {
  return (
    <button className="btn btn-alert" onClick={onClick}>
      New Client
    </button>
  );
}
const ClientListActions = ({ onAddNew, searchValue, onSearchChange }) => {
  return (
    
      <div className="client-list-actions">
        <AddClientButton onClick={onAddNew} />
        <SearchBar value={searchValue} onChange={onSearchChange} />
      </div>
   
  );
};
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
    <MainLayout>
      <Breadcrumb /> 
      <PageHeader />

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
        
        {/* Right side: Client details and Projects */}
        <div className="client-details-container">
          {selectedClient ? (
            <>
              <ClientCard client={selectedClient} />
              <ProjectsBox clientId={selectedClient.id} />
            </>
          ) : (
            <div className="no-selection-placeholder">
              Select a client to view details
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