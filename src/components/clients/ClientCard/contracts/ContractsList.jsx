import React from 'react';
import ContractDetails from './ContractDetails';

const ContractsList = ({ contracts = [], onContractSelect, selectedContract }) => {
  // Check if contracts exists and has items
  if (!contracts || contracts.length === 0) {
    return <div className="no-contracts-message">No contracts available</div>;
  }
  
  return (
    <table className="contracts-list">
      <thead>
        <tr>
          <th>Type</th>
          <th>Value</th>
          <th>Start Date</th>
          <th>End Date</th>
          
        </tr>
      </thead>
      <tbody>
        {contracts.map(contract => (
          <ContractDetails
            key={contract.contract_id}
            contract={contract}
            onSelect={onContractSelect}
            isSelected={selectedContract && selectedContract.contract_id === contract.contract_id}
          />
        ))}
      </tbody>
    </table>
  );
};

export default ContractsList;