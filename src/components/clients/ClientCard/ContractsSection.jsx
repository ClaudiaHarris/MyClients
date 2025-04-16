
import React from 'react';

const ContractsSection = ({ contracts }) => {
  return (
    <div className="contracts-section">
     
      {contracts.length > 0 ? (
        <table className="contracts-table">
          <thead>
            <tr>
              <th>Contract Type</th>
              <th>Start Date</th>
              <th>End Date</th>
            </tr>
          </thead>
          <tbody>
            {contracts.map(contract => (
              <tr key={contract.id}>
                <td>{contract.type}</td>
                <td>{contract.startDate}</td>
                <td>{contract.endDate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="no-contracts-message">No contracts available</p>
      )}
    </div>
  );
};
export default ContractsSection;