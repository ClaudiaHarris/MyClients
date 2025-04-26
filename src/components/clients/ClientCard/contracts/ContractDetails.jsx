import React from 'react';

const ContractDetails = ({ contract, onSelect, isSelected }) => {

  const handleClick = () => {
    console.log('contract clicked: ', contract);
    if (onSelect && typeof onSelect === 'function') {
      onSelect(contract);
    }
  };

  return (
    <tr 
      onClick={handleClick}
      className="contract-details"
      style={{ 
        cursor: onSelect ? 'pointer' : 'default',
        backgroundColor: isSelected ? 'var(--light-grey)':''
      }}
    >
      <td>{contract.contract_type}</td>
      <td>${contract.value}</td>
      <td>{contract.start_date}</td>
      <td>{contract.end_date}</td>
      <td>{contract.status || 'Pending'}</td>
    </tr>
  );
};

export default ContractDetails;