// src/components/clients/ClientCard/ClientCard.jsx
import React from 'react';
import ClientDetails from './ClientDetails';
import ContactSection from './ContactSection';
import SalesRepSection from './SalesRepSection';
import ContractsSection from './ContractsSection';
import './ClientCard.css'; // Import your CSS styles

const ClientCard = ({ client, sales_rep, contracts }) => {
  if (!client) return null;

  return (
    <div className="client-card">
      <div className="client-card-content">
        <ClientDetails 
          legal_name={client.legal_name}
          street_address={client.street_address} 
          city={client.city} 
          state={client.state}
          postal_code={client.postal_code}
          country={client.country}
        />
        
        <ContactSection 
          contact_name={client.contact_name} 
          contact_title={client.contact_title}
          contact_email={client.contact_email} 
          contact_phone={client.contact_phone}
          contact_ext={client.contact_ext} 
        />
        
        <SalesRepSection 
          name={client.sales_rep || ''}
          rep_phone={client.rep_phone || ''}
          rep_extension={client.rep_extension || ''}
          region={client.region || ''}
        />
        
        <ContractsSection contracts={contracts || []} />
      </div>
    </div>
  );
};

export default ClientCard;