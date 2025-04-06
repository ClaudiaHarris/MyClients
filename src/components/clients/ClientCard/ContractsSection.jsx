// src/components/clients/ClientCard/ContractsSection.jsx
import React from 'react';
import Button from '../../common/Button';

const ContractsSection = ({ contracts }) => {
  // Format date to a more readable format
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  const handleAddContract = () => {
    // This function would be implemented to open the add contract modal
    console.log('Add new contract');
    // You would typically use a state from context or props to open a modal
  };

  return (
    <div className="card-section contracts-section">
      <div className="section-header">
        <h3>Contracts</h3>
        <Button onClick={handleAddContract} className="add-button">Add Contract</Button>
      </div>
      <div className="section-content">
        {contracts && contracts.length > 0 ? (
          <table className="contracts-table">
            <thead>
              <tr>
                <th>Type</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {contracts.map((contract, index) => (
                <tr key={index}>
                  <td>{contract.type}</td>
                  <td>{formatDate(contract.startDate)}</td>
                  <td>{formatDate(contract.endDate)}</td>
                  <td className="action-buttons">
                    <Button className="small-button">Edit</Button>
                    <Button className="small-button delete-button">Delete</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="no-data-message">No contracts available</p>
        )}
      </div>
    </div>
  );
};

export default ContractsSection;