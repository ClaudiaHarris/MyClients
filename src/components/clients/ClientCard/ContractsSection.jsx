import React from 'react';
import ContractsList from './contracts/ContractsList';

const ContractsSection = ({ contracts = [], onContractSelect }) => {
  return (
    <div className="contracts-section">
      
      <h3>Contracts</h3>
      {contracts && contracts.length > 0 ? (
        <div>
          <ContractsList
            contracts = {contracts}
            onContractSelect={onContractSelect}
          />
        </div>
      ) : (
        <p className="no-contracts-message">No contracts available</p>
      )}
     
    </div>
    
  );
};

export default ContractsSection;