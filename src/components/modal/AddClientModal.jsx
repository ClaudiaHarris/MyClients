import React, { useState, useEffect } from 'react';
import  Button  from '../common/Button';
import './Modal.css'; 
import supabase from '../../config/supabaseClient';

const AddClientModal = ({ isOpen, onClose, selectedClient, onClientAdded }) => {

  

  const [formData, setFormData] = useState({
    legal_name: '',
    lifecycle: 'lead',
    street_address: '',
    city: '',
    state: '',
    postal_code: '',
    country: 'US',
    contact_name: '',
    contact_title: '',
    contact_phone: '',
    contact_ext: '',
    contact_email: '',
    
    office: 'NY'
   });

  //prefill for edit
  useEffect(() => {
    if (selectedClient) {
      setFormData({
        legal_name: selectedClient.legal_name || '',
        lifecycle: selectedClient.lifecycle || 'lead',  
        street_address: selectedClient.address || '',
        city: selectedClient.city || '',
        state: selectedClient.state || '',
        postal_code: selectedClient.postal_code || '',
        country: selectedClient.country || 'US',
        contact_name: selectedClient.contact_name || '',
        contact_title: selectedClient.contact_title || '',
        contact_phone: selectedClient.contact_phone || '',
        contact_ext: selectedClient.contact_ext || '',
        contact_email: selectedClient.contact_email || '',
        
        office: selectedClient.office || 'NY'
      });
    } else {
      setFormData({
        legal_name: '',
        lifecycle: 'lead',
        street_address: '',
        city: '',
        state: '',
        postal_code: '',
        country: 'US',
        contact_name: '',
        contact_title: '',
        contact_phone: '',
        contact_ext: '',
        contact_email: '',
        
        office: 'NY'
      });
    }
  }, [selectedClient]);

  if (!isOpen) return null;

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let error;

    if (selectedClient) {
      // Update existing client
      const { error: updateError } = await supabase
        .from('clients')
        .update({ ...formData })
        .eq('client_id', selectedClient.client_id);
      error = updateError;
    } else {
      // Insert new client
      const { error: insertError } = await supabase
        .from('clients')
        .insert([{ ...formData }]);
      error = insertError;
    }

    if (error) {
      alert(`Error ${selectedClient ? 'updating' : 'adding'} client: ${error.message}`);
      return;
    }
    if (onClientAdded) onClientAdded();
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
                <label>Legal Name*</label>
                <input
                  type="text"
                  name="legal_name"
                  value={formData.legal_name}
                  onChange={handleChange}
                  required
                  className="form-control"
                />
              </div>
            
              <div className="form-group">
                <label>Lifecycle*</label>
                <select
                  name="lifecycle"
                  value={formData.lifecycle}
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
                  name="street_address"
                  value={formData.street_address}
                  onChange={handleChange}
                  className="form-control"
                  rows="1"
                />
              </div>

              <div className="form-group">
                <label>City</label>
                <textarea
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  className="form-control"
                  rows="1"
                />
              </div>

              <div className="form-group">
                <label>State</label>
                <textarea
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  className="form-control"
                  rows="1"
                />
              </div>

              <div className="form-group">
                <label>Postal Code</label>
                <textarea
                  name="postal_code"
                  value={formData.postal_code}
                  onChange={handleChange}
                  className="form-control"
                  rows="1"
                />
              </div>

              <div className="form-group">
                <label>Country</label>
                <select
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  className="form-control">               
                    <option value="US">USA</option>
                    <option value="US">Brazil</option>
                    <option value="US">Germany</option>                
                </select>
              </div>

            </div>
            

            <div className="modal-section">
             
              <div className="form-section">
                <h3>Contact Information</h3>
                
                <div className="form-group">
                  <label>Contact Name*</label>
                  <input
                    type="text"
                    name="contact_name"
                    value={formData.contact_name}
                    onChange={handleChange}
                    required
                    className="form-control"
                  />
                </div>

                <div className="form-group">
                  <label>Contact Title</label>
                  <input
                    type="text"
                    name="contact_title"
                    value={formData.contact_title}
                    onChange={handleChange}
                    className="form-control"
                  />
                </div>
                
                <div className="form-group">
                  <label>Contact Phone</label>
                  <input
                    type="tel"
                    name="contact_phone"
                    value={formData.contact_phone}
                    onChange={handleChange}
                    className="form-control"
                  />
                </div>

                <div className="form-group">
                  <label>Contact Ext.</label>
                  <input
                    type="integer"
                    name="contact_ext"              
                    value={formData.contact_ext}
                    onChange={handleChange}
                    className="form-control"
                  />
                </div>
                
                <div className="form-group">
                  <label>Contact Email</label>
                  <input
                    type="email"
                    name="contact_email"
                    value={formData.contact_email}
                    onChange={handleChange}
                    className="form-control"
                  />
                </div>
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
