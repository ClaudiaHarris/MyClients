// src/components/clients/ClientCard/ClientCard.jsx
import React, { useEffect, useState } from 'react';
import supabase from '../../../config/supabaseClient';
import ClientDetails from './ClientDetails';
import ContractsList from './contracts/ContractsList';
import ContactSection from './ContactSection';
import SalesRepSection from './SalesRepSection';
import ContractsSection from './ContractsSection';
import './ClientCard.css';

const ClientCard = ({ client }) => {
  const [salesRep, setSalesRep] = useState(null);
  const [contracts, setContracts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!client) return;
      
      try {
        setLoading(true);
        setError(null);
        
        // Fetch sales rep details if there's a sales_rep_id
        if (client.sales_rep_id) {
          const { data: repData, error: repError } = await supabase
            .from('sales_reps')
            .select('*')
            .eq('sales_rep_id', client.sales_rep_id)
            .single();
            
          if (repError) throw repError;
          setSalesRep(repData);
        }

        // Fetch contracts
        const { data: contractsData, error: contractsError } = await supabase
          .from('contracts')
          .select('*')
          .eq('client_id', client.client_id);
          
        if (contractsError) throw contractsError;
        setContracts(contractsData || []);

      } catch (err) {
        console.error('Error fetching client data:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [client]);

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
          name={salesRep?.name || client.sales_rep || 'None assigned'}
          rep_phone={salesRep?.phone || ''}
          rep_extension={salesRep?.ext || ''}
          region={salesRep?.region || ''}
        />
        
        <ContractsSection contracts={contracts} />

        {error && <div className="error-message">{error}</div>}
      </div>
    </div>
  );
};

export default ClientCard;