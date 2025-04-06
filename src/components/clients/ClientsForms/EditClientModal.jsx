import React, { useState, useEffect } from 'react';
import Modal from '../../common/Modal';
import Button from '../../common/Button';
import {useClientContext} from '../../../contexts/ClientContext';
import {validateClientForm} from './FormValidation';

const EditClientModal = ({ isOpen, onClose, client}) => {
  const {editClient} = useClientContext();
  const [formData, setFormData] = useState({
    name: '',
    lifecycleStage:'lead',
    address: '',
    country: '',
    contactName: '',
    contactPhone: '',
    contactExtension: '',
    contactEmail: '',
    salesRep: '',
    office: 'NY',
    website:''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  //populate form when there is data
  useEffect(() => {
    if (client) {
      setFormData({
        name: client.name || '',
        lifecycleStage: client.lifecycleStage || '',
        address: client.address || '',
        country: client.country || '',
        contactName: client.contactName || '',
        contactPhone: client.contactPhone || '',
        contactExtension: client.contactExtension || '',
        contactEmail: client.contactEmail || '',
        salesRep: client.salesRep || '',
        office: client.office || 'NY',
        website: client.website || ''
      });

      }
    }, [client]);
  
  const handleChange = (e)=> {
    const {name, value} = e.target;
    setFormData({
      ...formData,
      [name]: value
    });

    //clear error for this field when user starts typing

    if (errors[name]) {
      setErrors({
        ...errors,
        [name]:null
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    //validate form

    const validationErrors = validateClientForm(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      setIsSubmitting(true);
      await editClient(client.id, formData);
      onClose();

    } catch (error) {
      console.error('Error updating client:', error);
      setErrors({
        form: 'Failed to update client. Please try again.'
      });

    }finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Edit Client">
      
      <form onSubmit={handleSubmit} className="client-form">
        {errors.form && (
          <div className="error-message form-error">{errors.form}</div>
        )}

        <div className="form-section">
          <h3>Client Information</h3>

          <div className="form-field">
            <label htmlFor="name">Busines Name*</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter business name"
              className={errors.name ? 'error' : ''}
            />

            {errors.name && <div className="error-message">{errors.name}</div>}
          </div>

          <div className="form-field">
            <label htmlFor="lifecycleStage">Lifecycle Stage*</label>
            <select
              id="lifecycleStage"
              name="lifecycleStage"
              value={formData.lifecycleStage}
              onChange={handleChange}
              className={errors.lifecycleStage ? 'error' : ''}
            >
              <option value="lead">Lead</option>  
              <option value="prospect">Prospect</option>
              <option value="client">Client</option>
            </select>

            {errors.lifecycleStage && (
              <div className="error-message">{errors.lifecycleStage}</div>
            )}
        </div>

        <div className="form-field">
          <label htmlFor="address">Main Address*</label>
          <input
            type="text"
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeHolder="Enter main address"
            className={errors.address ? 'error' : ''}
          />

          {errors.address && <div className="error-message">{errors.address}</div>}
        </div>

        <div className="form-field">
            <label htmlFor="country">Country*</label>
            <input
              type="text"
              id="country"
              name="country"
              value={formData.country}
              onChange={handleChange}
              placeholder="Enter country"
              className={errors.country ? 'error' : ''}
            />
            {errors.country && <div className="error-message">{errors.country}</div>}
          </div>
          
          <div className="form-field">
            <label htmlFor="website">Website</label>
            <input
              type="text"
              id="website"
              name="website"
              value={formData.website}
              onChange={handleChange}
              placeholder="Enter website URL"
            />
          </div>
        </div>

        <div className="form-section">
          <h3>Contact Information</h3>
          
          <div className="form-field">
            <label htmlFor="contactName">Contact Name*</label>
            <input
              type="text"
              id="contactName"
              name="contactName"
              value={formData.contactName}
              onChange={handleChange}
              placeholder="Enter contact name"
              className={errors.contactName ? 'error' : ''}
            />
            {errors.contactName && (
              <div className="error-message">{errors.contactName}</div>
            )}
          </div>
          
          <div className="form-field">
            <label htmlFor="contactPhone">Phone*</label>
            <input
              type="text"
              id="contactPhone"
              name="contactPhone"
              value={formData.contactPhone}
              onChange={handleChange}
              placeholder="Enter phone number"
              className={errors.contactPhone ? 'error' : ''}
            />
            {errors.contactPhone && (
              <div className="error-message">{errors.contactPhone}</div>
            )}
          </div>
          
          <div className="form-field">
            <label htmlFor="contactExtension">Extension</label>
            <input
              type="text"
              id="contactExtension"
              name="contactExtension"
              value={formData.contactExtension}
              onChange={handleChange}
              placeholder="Enter extension (if any)"
            />
          </div>
          
          <div className="form-field">
            <label htmlFor="contactEmail">Email*</label>
            <input
              type="email"
              id="contactEmail"
              name="contactEmail"
              value={formData.contactEmail}
              onChange={handleChange}
              placeholder="Enter email address"
              className={errors.contactEmail ? 'error' : ''}
            />
            {errors.contactEmail && (
              <div className="error-message">{errors.contactEmail}</div>
            )}
          </div>
        </div>
        
        <div className="form-section">
          <h3>GlobalTech Assignment</h3>
          
          <div className="form-field">
            <label htmlFor="salesRep">Sales Representative</label>
            <input
              type="text"
              id="salesRep"
              name="salesRep"
              value={formData.salesRep}
              onChange={handleChange}
              placeholder="Enter sales rep name"
            />
          </div>

          <div className="form-field">
            <label htmlFor="office">Assigned Office*</label>
            <select
              id="office"
              name="office"
              value={formData.office}
              onChange={handleChange}
              className={errors.office ? 'error' : ''}
            >
              <option value="NY">New York</option>
              <option value="RIO">Rio de Janeiro</option>
              <option value="FRK">Frankfurt</option>
            </select>
            {errors.office && <div className="error-message">{errors.office}</div>}
          </div>
        </div>

        <div className="form-actions">
          <Button type="button" onClick={onClose} variant="secondary">
            Cancel
          </Button>

          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Saving...' :'Save Changes'}
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default EditClientModal;