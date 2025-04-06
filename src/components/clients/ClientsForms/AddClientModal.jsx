import React, {useState} from 'react';
import Modal from '../../common/Modal';
import Button from '../../common/Button';
import {useClientContext} from '../../../contexts/ClientContext';
import {validateClientForm} from './FormValidation';

const AddClientModal = ({isOpen, onClose}) => {
  //context for client operations
  const {createClient} = useClientContext();

  //initial form state
  const initialFormState = {
      name: '',
    lifecycleStage: 'lead', // Default value
    address: '',
    country: '',
    contactName: '',
    contactPhone: '',
    contactExtension: '',
    contactEmail: '',
    salesRep: '',
    office: 'New York', // Default value
    website: ''
  };
  
  //Form state
  const [formData, setFormData] = useState(initialFormState);

  //validation errors
  const [errors, setErrors] = useState({});

  //loading state while submitting
  const [isSubmitting, setIsSubmitting] = useState(false);

  //handle input changes
  const handleChange = (e) => {
    const {name, value} = e.target;
    setFormData({
      ...formData,
      [name]:value
    });

    //clear error when user types
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]:null
      });
    }
  };

  //handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    //validate form data
    const validationErrors = validateClientForm(formData);

    if (Object.keys(validationErrors).length>0) {
      setErrors(validationErrors);
      return;
    }

    try {
      setIsSubmitting(true);

      //generate client id
      const clientData = {
        ...formData,
        clientNumber: `CL-${Math.floor(Math.random() * 10000).toString().padStart(4, '0')}`
      };

      await createClient(clientData);

      //reset form and close modal on success
      setFormData(initialFormState);
      onClose();

    } catch (error) {
      console.error('Error creating client: ', error);
      setErrors({
        form: 'Failed to create client. Please try again.'
      });

    } finally {
      setIsSubmitting(false);
    }
  };

  //handle modal closing, reset form state

  const handleClose = () => {
    setFormData(initialFormState);
    setErrors({});
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="Add New Client">
    <form onSubmit={handleSubmit} className="client-form">
    
    {/* General error message */}
    {errors.form && (
      <div className="error-message">{errors.form}</div>
    )}

    {/* Client Basic Information */}
     <div className="form-section">
          <h3>Client Information</h3>
          
          <div className="form-group">
            <label htmlFor="name">Business Name *</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={errors.name ? 'error' : ''}
            />
            {errors.name && <div className="field-error">{errors.name}</div>}
          </div>
          
          <div className="form-group">
            <label htmlFor="lifecycleStage">Lifecycle Stage *</label>
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
            {errors.lifecycleStage && <div className="field-error">{errors.lifecycleStage}</div>}
          </div>

          <div className="form-group">
            <label htmlFor="website">Website</label>
            <input
              type="text"
              id="website"
              name="website"
              value={formData.website}
              onChange={handleChange}
              className={errors.website ? 'error' : ''}
            />
            {errors.website && <div className="field-error">{errors.website}</div>}
          </div>
        </div>
        
        {/* Address Information */}
        <div className="form-section">
          <h3>Address Information</h3>
          
          <div className="form-group">
            <label htmlFor="address">Main HQ Address *</label>
            <input
              type="text"
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className={errors.address ? 'error' : ''}
            />
            {errors.address && <div className="field-error">{errors.address}</div>}
          </div>
          
          <div className="form-group">
            <label htmlFor="country">Country *</label>
            <input
              type="text"
              id="country"
              name="country"
              value={formData.country}
              onChange={handleChange}
              className={errors.country ? 'error' : ''}
            />
            {errors.country && <div className="field-error">{errors.country}</div>}
          </div>
        </div>
        
        {/* Contact Information */}
        <div className="form-section">
          <h3>Contact Information</h3>
          
          <div className="form-group">
            <label htmlFor="contactName">Contact Name *</label>
            <input
              type="text"
              id="contactName"
              name="contactName"
              value={formData.contactName}
              onChange={handleChange}
              className={errors.contactName ? 'error' : ''}
            />
            {errors.contactName && <div className="field-error">{errors.contactName}</div>}
          </div>
          
          <div className="form-group">
            <label htmlFor="contactPhone">Phone Number *</label>
            <input
              type="tel"
              id="contactPhone"
              name="contactPhone"
              value={formData.contactPhone}
              onChange={handleChange}
              className={errors.contactPhone ? 'error' : ''}
            />
            {errors.contactPhone && <div className="field-error">{errors.contactPhone}</div>}
          </div>
          
          <div className="form-group">
            <label htmlFor="contactExtension">Extension</label>
            <input
              type="text"
              id="contactExtension"
              name="contactExtension"
              value={formData.contactExtension}
              onChange={handleChange}
              className={errors.contactExtension ? 'error' : ''}
            />
            {errors.contactExtension && <div className="field-error">{errors.contactExtension}</div>}
          </div>
          
          <div className="form-group">
            <label htmlFor="contactEmail">Email *</label>
            <input
              type="email"
              id="contactEmail"
              name="contactEmail"
              value={formData.contactEmail}
              onChange={handleChange}
              className={errors.contactEmail ? 'error' : ''}
            />
            {errors.contactEmail && <div className="field-error">{errors.contactEmail}</div>}
          </div>
        </div>
        
        {/* Assignment Information */}
        <div className="form-section">
          <h3>Assignment Information</h3>
          
          <div className="form-group">
            <label htmlFor="salesRep">Sales Representative</label>
            <select
              id="salesRep"
              name="salesRep"
              value={formData.salesRep}
              onChange={handleChange}
              className={errors.salesRep ? 'error' : ''}
            >
              <option value="">-- Select Sales Rep --</option>
              <option value="John Doe">John Doe</option>
              <option value="Jane Smith">Jane Smith</option>
              <option value="Carlos Rodriguez">Carlos Rodriguez</option>
              <option value="Anna Mueller">Anna Mueller</option>
            </select>
            {errors.salesRep && <div className="field-error">{errors.salesRep}</div>}
          </div>
          
          <div className="form-group">
            <label htmlFor="office">GlobalTech Office *</label>
            <select
              id="office"
              name="office"
              value={formData.office}
              onChange={handleChange}
              className={errors.office ? 'error' : ''}
            >
              <option value="New York">New York</option>
              <option value="Rio de Janeiro">Rio de Janeiro</option>
              <option value="Frankfurt">Frankfurt</option>
            </select>
            {errors.office && <div className="field-error">{errors.office}</div>}
          </div>
        </div>
        
        {/* Form Actions */}
        <div className="form-actions">
          <Button 
            type="button" 
            onClick={handleClose} 
            className="cancel-button"
            disabled={isSubmitting}
          >
            Cancel
          </Button>
          <Button 
            type="submit" 
            className="submit-button"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Adding...' : 'Add Client'}
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default AddClientModal;

