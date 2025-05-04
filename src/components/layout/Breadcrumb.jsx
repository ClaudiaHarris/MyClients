import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";



const Breadcrumb = () => {

  const handleNavClick = (destination) => {
    alert(`In a real CRM application, you would now navigate to ${destination}`);
  };

  return (
    <div className="breadcrumb" style={{ cursor: 'pointer' }}>
      <span className="breadcrumb-item" onClick={() => handleNavClick('Dashboard')}>Dashboard </span>
      <FontAwesomeIcon icon={faChevronRight} className="breadcrumb-icon" />
      <span className="breadcrumb-item" onClick={() => handleNavClick('Clients')}> Clients </span>
      <FontAwesomeIcon icon={faChevronRight} className="breadcrumb-icon" />
      <span className="breadcrumb-item active"> My Clients</span>
    </div>
  );
};

export default Breadcrumb;