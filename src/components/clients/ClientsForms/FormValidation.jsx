
  // Validates if a field is required
  export const validateRequired = (value) => {
    if (!value || value.trim() === '') {
      return 'This field is required';
    }
    return '';
  };

  // Validates email format
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

  // Validates phone number format
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

  // Validates website URL format
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

  // Validates the entire client form
  export const validateClientForm = (formData) => {
    const errors = {};
    
    // Required fields validation
    if (!formData.name) errors.name = validateRequired(formData.name);
    if (!formData.lifecycle) errors.lifecycle = validateRequired(formData.lifecycle);
    if (!formData.contactName) errors.contactName = validateRequired(formData.contactName);
    
    // Format validations
    if (formData.email) errors.email = validateEmail(formData.email);
    if (formData.phone) errors.phone = validatePhone(formData.phone);
    if (formData.website) errors.website = validateWebsite(formData.website);
    
    return errors;
  };

  // Returns true if the form is valid (no errors)
  export const isFormValid = (errors) => {
    return Object.keys(errors).length === 0 || 
           Object.values(errors).every(error => error === '');
  };
