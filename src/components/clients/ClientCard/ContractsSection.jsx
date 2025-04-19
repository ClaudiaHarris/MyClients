import React from 'react';

const ContractsSection = ({ contracts }) => {
  return (
    <div className="contracts-section">
     
      {contracts.length > 0 ? (
        <div>
          {contracts.map(contract => (
            <div key={contract.id}>
              <p><strong>Type: </strong>{contract.type}</p>
              <p><strong>Start Date: </strong>{contract.startDate}</p>
              <p><strong>End Date: </strong>{contract.endDate}</p>
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