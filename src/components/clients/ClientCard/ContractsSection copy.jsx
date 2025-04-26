import React from 'react';
import ContractsList from './contracts/ContractsList';

const ContractsSection = ({ contracts }) => {
  return (
    <div className="contracts-section">
     
      {contracts.length > 0 ? (
        <div>
          <h3>Contracts</h3>
        
          {contracts.map(contract => (
            <div key={contract.contract_id}>
              
              <p><strong>Type: </strong>{contract.contract_type}</p>
              <p><strong>Start Date: </strong>{contract.start_date}</p>
              <p><strong>End Date: </strong>{contract.end_date}</p>
              <p><strong>Value: </strong>${contract.value}</p>

            </div>
          ))}
        </div>
      ) : (
        <p className="no-contracts-message">No contracts available</p>
      )}
    </div>
  );
};
export default ContractsSection;