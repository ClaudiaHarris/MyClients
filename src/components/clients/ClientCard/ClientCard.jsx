// src/components/clients/ClientCard/ClientCard.jsx
import React from 'react';
import ClientDetails from './ClientDetails';
import ContactSection from './ContactSection';
import SalesRepSection from './SalesRepSection';
import ContractsSection from './ContractsSection';
import { mockSalesReps } from '../../../data/mockData';

const ClientCard = ({ client }) => {
  // Find the sales rep details from our mock data
  const salesRep = mockSalesReps.find(rep => rep.name === client.salesRep) || {};

  return (
    <div className="client-card">
      <div className="client-card-header">
        <h2>{client.name}</h2>
        <div className="client-card-actions">
          <button className="edit-btn">Edit</button>
          <button className="delete-btn">Delete</button>
          <button className="archive-btn">Archive</button>
        </div>
      </div>
      
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

export default ClientCard;