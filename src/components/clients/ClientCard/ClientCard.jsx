// src/components/clients/ClientCard/ClientCard.jsx
import React from 'react';
import ClientDetails from './ClientDetails';
import ContactSection from './ContactSection';
import SalesRepSection from './SalesRepSection';
import ContractsSection from './ContractsSection';
import { mockSalesReps, mockContracts } from '../../../data/mockData';

const ClientCard = ({ client }) => {
  // Find the sales rep details from our mock data
  const salesRep = mockSalesReps.find(rep => rep.name === client.salesRep) || {};
  const clientContracts = mockContracts.filter(contract => client.contracts.includes(contract.id));
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
        
        <ContractsSection contracts={clientContracts} />
      </div>
    </div>
  );
};

export default ClientCard;