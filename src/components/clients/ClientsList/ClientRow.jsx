import React, {useState} from "react";
import Button from '../../common/Button';
import {useClientContext} from '../../../contexts/ClientContext';
import EditClientModal from '../ClientsForms/EditClientModal';
import DeleteConfirmation from '../ClientsForms/DeleteConfirmation';

const ClientRow = ({ client, onSelect }) => {
 
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const {removeClient} = useClientContext();


  const handleDelete = async () => {
    try {
      await removeClient(client.id);
      setShowDeleteModal(false); // Clear the selected client after deletion
    } catch (error) {
      console.error("Error deleting client:", error);
    }
  };

  //Get lifecycle stage class

  const getLifecycleClass = (stage) => {
    switch (stage.toLowerCase()) {
      case "prospect":
        return "lifecycle-prospect";
      case "Lead":
        return "lifecycle-lead";
      case "client":
        return "lifecycle-client";
      default:
        return '';
    }
  };

  return (
    <>
    <tr onClick={() => onSelect(client)} className="client-row">
      <td className="client-name">{client.name}</td>
      <td>{client.contactName}</td>
      <td>
        <span className={`lifecycle-badge ${getLifecycleClass(client.lifecycleStage)}`}>
          {client.lifecycleStage}
          </span>
      </td>
      <td>{client.salesRep}</td>
      <td>{client.office}</td>
      <td>
        <a href={`mailto:${client.email}`} onClick={(e) => e.stopPropagation()}>
          {client.email}
        </a>
      </td>
      <td className="actions-cell">
        <Button
        className="edit-button"
        onClick={(e) => {
          e.stopPropagation(); // Prevent row click event
          setShowEditModal(true);
        }}
        >Delete </Button>

      </td>
      </tr>
      
      {/* Edit Client Modal */}
      <EditClientModal
      isOpen={showEditModal}
      onClose={() => setShowEditModal(false)}
      client={client}
      />

      {/* Delete Confirmation Modal */}
      <DeleteConfirmation
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onDelete={handleDelete}
        clientName={client.name}
      />
      </>
  );

};

export default ClientRow;