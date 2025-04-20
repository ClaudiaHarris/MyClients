import React, { useState, useEffect } from 'react';
import  Button  from '../common/Button';
import { mockSalesReps } from '../../data/mockData'; // Mock data for sales representatives
import './Modal.css'; // Import your CSS styles
const AddClientModal = ({ isOpen, onClose, selectedClient }) => {

  const [formData, setFormData] = useState({
    name: '',
    lifecycleStage: 'lead',
    address: '',
    contactName: '',
    contactPhone: '',
    contactEmail: '',
    salesRep: '',
    office: 'NY',
    website: ''
  });

  //prefill for edit
  useEffect(() => {
    if (selectedClient) {
      setFormData({
        name: selectedClient.name || '',
        lifecycleStage: selectedClient.lifecycleStage || 'lead',  
        address: selectedClient.address || '',
        contactName: selectedClient.contactName || '',
        contactPhone: selectedClient.contactPhone || '',
        contactEmail: selectedClient.contactEmail || '',
        salesRep: selectedClient.salesRep || '',
        office: selectedClient.office || 'NY',
        website: selectedClient.website || ''
      });
    } else {
      setFormData({
        name: '',
        lifecycleStage: 'lead',
        address: '',
        contactName: '',
        contactPhone: '',
        contactEmail: '',
        salesRep: '',
        office: 'NY',
        website: ''
      });
    }
  }, [selectedClient]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Early return after hooks
  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, you would add the client to your data
    console.log('New client data:', formData);
    alert('Client would be added here in a real app');
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-header">
          <h2>Add or Update Client</h2>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>
        <form onSubmit={handleSubmit}>

          <div className="modal-body">

            <div className="modal-section">
              <div className="form-group">
                <label>Business Name*</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="form-control"
                />
              </div>
            
              <div className="form-group">
                <label>Lifecycle*</label>
                <select
                  name="lifecycleStage"
                  value={formData.lifecycleStage}
                  onChange={handleChange}
                  required
                  className="form-control"
                >
                  <option value="lead">Lead</option>
                  <option value="prospect">Prospect</option>
                  <option value="client">Client</option>
                </select>
              </div>
            
              <div className="form-group">
                <label>Main Address</label>
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className="form-control"
                  rows="2"
                />
              </div>
            
              <div className="form-group">
                <label>Website</label>
                <input
                  type="text"
                  name="website"
                  value={formData.website}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="www.example.com"
                />
              </div>

            </div>
            

            <div className="modal-section">
             
              <div className="form-section">
                <h3>Contact Information</h3>
                
                <div className="form-group">
                  <label>Contact Name*</label>
                  <input
                    type="text"
                    name="contactName"
                    value={formData.contactName}
                    onChange={handleChange}
                    required
                    className="form-control"
                  />
                </div>
                
                <div className="form-group">
                  <label>Contact Phone</label>
                  <input
                    type="tel"
                    name="contactPhone"
                    value={formData.contactPhone}
                    onChange={handleChange}
                    className="form-control"
                  />
                </div>
                
                <div className="form-group">
                  <label>Contact Email*</label>
                  <input
                    type="email"
                    name="contactEmail"
                    value={formData.contactEmail}
                    onChange={handleChange}
                    required
                    className="form-control"
                  />
                </div>
              </div>
            </div>
            
            <div className="modal-section">
              <h3>Assignment</h3>
              
              <div className="form-group">
                <label>Sales Representative</label>
                <select
                  name="salesRep"
                  value={formData.salesRep}
                  onChange={handleChange}
                  className="form-control"
                >
                  <option value="">Select a Sales Rep</option>
                  {mockSalesReps.map(rep => (
                    <option key={rep.id} value={rep.name}>{rep.name}</option>
                  ))}
                </select>
              </div>
              
              <div className="form-group">
                <label>GlobalTech Office*</label>
                <select
                  name="office"
                  value={formData.office}
                  onChange={handleChange}
                  required
                  className="form-control"
                >
                  <option value="NY">New York</option>
                  <option value="Frankfurt">Frankfurt</option>
                  <option value="Rio de Janeiro">Rio de Janeiro</option>
                </select>
              </div>
            </div>
          
          
            <div className="modal-footer">
              <Button type="button" variant="secondary" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit" variant="primary">
                Submit
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddClientModal;
