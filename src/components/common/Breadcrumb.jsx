import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";

const Breadcrumb = () => {
  return (
    <div className="breadcrumb">
      <span className="breadcrumb-item">Dashboard </span>
      <FontAwesomeIcon icon={faChevronRight} className="breadcrumb-icon" />
      <span className="breadcrumb-item"> Clients </span>
      <FontAwesomeIcon icon={faChevronRight} className="breadcrumb-icon" />
      <span className="breadcrumb-item active"> My Clients</span>
    </div>
  );
};

export default Breadcrumb;