import { useState, useEffect } from 'react';

const ContactForm7 = ({ 
  formId = 'contact-form',
  title = 'Get in Touch',
  description = 'Send us a message and we\'ll get back to you as soon as possible.',
  fields = {
    name: { type: 'text', label: 'Full Name', required: true },
    email: { type: 'email', label: 'Email Address', required: true },
    phone: { type: 'tel', label: 'Phone Number', required: false },
    subject: { type: 'text', label: 'Subject', required: true },
    message: { type: 'textarea', label: 'Message', required: true },
    equipment: { type: 'select', label: 'Equipment Type', required: false, options: [
      'Perlick Chillers',
      'Hoshizaki Ice Makers',
      'TurboChef Ovens',
      'Frosty Soft-Serve',
      'Southbend Ranges',
      'Chicago Folders',
      'Other'
    ]}
  }
}) => {
  const [formData, setFormData] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [errors, setErrors] = useState({});

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: null
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    Object.entries(fields).forEach(([field, config]) => {
      if (config.required && !formData[field]) {
        newErrors[field] = `${config.label} is required`;
      }
      
      if (config.type === 'email' && formData[field] && !/\S+@\S+\.\S+/.test(formData[field])) {
        newErrors[field] = 'Please enter a valid email address';
      }
    });
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    setSubmitStatus(null);
    
    try {
      // Simulate Contact Form 7 API call
      const response = await fetch('/wp-json/contact-form-7/v1/contact-forms/1/feedback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          'your-name': formData.name,
          'your-email': formData.email,
          'your-phone': formData.phone,
          'your-subject': formData.subject,
          'your-message': formData.message,
          'your-equipment': formData.equipment
        })
      });
      
      if (response.ok) {
        setSubmitStatus('success');
        setFormData({});
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderField = (field, config) => {
    const fieldId = `cf7-${field}`;
    const hasError = errors[field];
    
    switch (config.type) {
      case 'textarea':
        return (
          <div key={field} className="space-y-2">
            <label htmlFor={fieldId} className="block text-sm font-medium text-gray-700">
              {config.label} {config.required && <span className="text-red-500">*</span>}
            </label>
            <textarea
              id={fieldId}
              value={formData[field] || ''}
              onChange={(e) => handleInputChange(field, e.target.value)}
              rows={4}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                hasError ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder={`Enter your ${config.label.toLowerCase()}...`}
            />
            {hasError && <p className="text-sm text-red-500">{hasError}</p>}
          </div>
        );
        
      case 'select':
        return (
          <div key={field} className="space-y-2">
            <label htmlFor={fieldId} className="block text-sm font-medium text-gray-700">
              {config.label} {config.required && <span className="text-red-500">*</span>}
            </label>
            <select
              id={fieldId}
              value={formData[field] || ''}
              onChange={(e) => handleInputChange(field, e.target.value)}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                hasError ? 'border-red-500' : 'border-gray-300'
              }`}
            >
              <option value="">Select {config.label}</option>
              {config.options?.map((option) => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
            {hasError && <p className="text-sm text-red-500">{hasError}</p>}
          </div>
        );
        
      default:
        return (
          <div key={field} className="space-y-2">
            <label htmlFor={fieldId} className="block text-sm font-medium text-gray-700">
              {config.label} {config.required && <span className="text-red-500">*</span>}
            </label>
            <input
              type={config.type}
              id={fieldId}
              value={formData[field] || ''}
              onChange={(e) => handleInputChange(field, e.target.value)}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                hasError ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder={`Enter your ${config.label.toLowerCase()}...`}
            />
            {hasError && <p className="text-sm text-red-500">{hasError}</p>}
          </div>
        );
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-xl p-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">{title}</h2>
        <p className="text-gray-600">{description}</p>
      </div>

      {submitStatus === 'success' && (
        <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
          <div className="flex items-center">
            <div className="text-green-500 mr-3">✅</div>
            <p className="text-green-800 font-medium">Thank you! Your message has been sent successfully.</p>
          </div>
        </div>
      )}

      {submitStatus === 'error' && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
          <div className="flex items-center">
            <div className="text-red-500 mr-3">❌</div>
            <p className="text-red-800 font-medium">Sorry, there was an error sending your message. Please try again.</p>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {Object.entries(fields).map(([field, config]) => {
            if (field === 'message' || field === 'equipment') return null;
            return renderField(field, config);
          })}
        </div>

        {renderField('equipment', fields.equipment)}
        {renderField('message', fields.message)}

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center space-x-2"
          >
            {isSubmitting ? (
              <>
                <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                </svg>
                <span>Sending...</span>
              </>
            ) : (
              <>
                <span>📧</span>
                <span>Send Message</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ContactForm7;
