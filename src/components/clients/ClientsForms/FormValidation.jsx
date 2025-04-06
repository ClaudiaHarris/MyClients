export const validateRequired = (value) => {
  if (!value || value.trim() === '') {
    return 'This field is required';
  }
  return '';
};

export const validateEmail = (email) => {
  if (!email || email.trim() === '') {
    return 'Email is required';
  }
  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return 'Please enter a valid email address';
  }
  
  return '';
};

export const validatePhone = (phone) => {
  if (!phone || phone.trim() === '') {
    return '';  // Phone optional
  }
  
  // Simple regex for phone format validation
  // accepts formats like: (123) 456-7890, 123-456-7890, 1234567890
  const phoneRegex = /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/;
  if (!phoneRegex.test(phone)) {
    return 'Please enter a valid phone number';
  }
  
  return '';
};

export const validateWebsite = (website) => {
  if (!website || website.trim() === '') {
    return '';  // Website optional
  }
  
  try {
    // Using URL constructor for validation
    new URL(website);
    return '';
  } catch (error) {
    return 'Please enter a valid website URL (e.g., https://example.com)';
  }
};

export const validateClientForm = (formData) => {
  const errors = {};
  
  // Required fields validation
  if (!formData.name) errors.name = 'Business name is required';
  if (!formData.lifecycleStage) errors.lifecycleStage = 'Lifecycle stage is required';
  if (!formData.address) errors.address = 'Address is required';
  if (!formData.country) errors.country = 'Country is required';
  if (!formData.contactName) errors.contactName = 'Contact name is required';
  if (!formData.contactPhone) errors.contactPhone = 'Phone number is required';
  if (!formData.contactEmail) errors.contactEmail = 'Email is required';
  if (!formData.office) errors.office = 'Office is required';
  
  // Format validations
  if (formData.contactEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.contactEmail)) {
    errors.contactEmail = 'Please enter a valid email address';
  }
  
  return errors;
};

export const isFormValid = (errors) => {
  return Object.keys(errors).length === 0 || 
         Object.values(errors).every(error => error === '');
};
