import React from 'react';
import ClientDetails from './ClientDetails';
import ContactSection from './ContactSection';
import ContractsSection from './ContractsSection';
import SalesRepSection from './SalesRepSection';
import './ClientCard.css';

const ClientCard = ({client}) => {

  if (!client) {
    return (
      <div className="client-card-empty">Select a Client to view details.</div>
    );
  }

  return (
    <div className="client-card">
      <h2 className="card-title">Client Details</h2>
      <div className="card-sections">
        <ClientDetails client={client} />
        <ContactSection contact={client.contact} />
        <SalesRepSection salesRep={client.salesRep} />
        <ContractsSection contracts={client.contracts} />
      </div>
    </div>
  );
};

export default ClientCard;