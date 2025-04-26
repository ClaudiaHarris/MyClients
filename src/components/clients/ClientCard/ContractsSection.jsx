import React from 'react';
import ContractsList from './contracts/ContractsList';

const ContractsSection = ({ contracts = [], onContractSelect, selectedContract }) => {
  return (
    <div className="contracts-section">
      
      <h3>Contracts</h3>
      {contracts && contracts.length > 0 ? (
        <div>
          <ContractsList
            contracts = {contracts}
            onContractSelect={onContractSelect}
            selectedContract={selectedContract}
          />
        </div>
      ) : (
        <p className="no-contracts-message">No contracts available</p>
      )}
     
    </div>
    
  );
};

export default ContractsSection;