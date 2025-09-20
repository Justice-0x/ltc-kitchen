import React, { useState, useEffect } from 'react';

export default function EnhancedPartsOrder({ 
  equipmentId = null, 
  modelId = null, 
  partNumber = null,
  initialQuantity = 1 
}) {
  const [formData, setFormData] = useState({
    // Equipment Info
    equipment: equipmentId || '',
    model: modelId || '',
    serial: '',
    location: '',
    
    // Part Info
    partNumber: partNumber || '',
    partName: '',
    quantity: initialQuantity,
    description: '',
    
    // Contact Info
    technician: '',
    email: '',
    phone: '',
    
    // Routing
    cc: [],
    bcc: [],
    
    // Priority
    priority: 'normal',
    urgency: 'standard',
    
    // Notes
    notes: '',
    installationDate: '',
    warrantyInfo: ''
  });

  const [suggestedParts, setSuggestedParts] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Prefill from URL params or localStorage
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const savedData = localStorage.getItem('partsOrderPrefill');
    
    if (savedData) {
      const parsed = JSON.parse(savedData);
      setFormData(prev => ({ ...prev, ...parsed }));
    }
    
    // Override with URL params
    if (urlParams.get('equipment')) {
      setFormData(prev => ({ ...prev, equipment: urlParams.get('equipment') }));
    }
    if (urlParams.get('model')) {
      setFormData(prev => ({ ...prev, model: urlParams.get('model') }));
    }
    if (urlParams.get('part')) {
      setFormData(prev => ({ ...prev, partNumber: urlParams.get('part') }));
    }
  }, [equipmentId, modelId, partNumber]);

  // Auto-suggest parts based on equipment
  useEffect(() => {
    if (formData.equipment) {
      // This would typically fetch from an API
      const suggestions = getSuggestedParts(formData.equipment);
      setSuggestedParts(suggestions);
    }
  }, [formData.equipment]);

  const getSuggestedParts = (equipment) => {
    const partsMap = {
      hoshizaki: [
        { partNumber: 'WF-001', name: 'Water Filter', price: '$45' },
        { partNumber: 'HS-500', name: 'Harvest Switch', price: '$125' },
        { partNumber: 'WIV-200', name: 'Water Inlet Valve', price: '$89' }
      ],
      turbochef: [
        { partNumber: 'TS-100', name: 'Temperature Sensor', price: '$95' },
        { partNumber: 'AS-200', name: 'Airflow Sensor', price: '$120' },
        { partNumber: 'DS-300', name: 'Door Switch', price: '$65' }
      ],
      perlick: [
        { partNumber: 'GP-300', name: 'Glycol Pump', price: '$450' },
        { partNumber: 'T-100', name: 'Thermostat', price: '$75' },
        { partNumber: 'GL-500', name: 'Glycol Lines', price: '$25/ft' }
      ]
    };
    return partsMap[equipment] || [];
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handlePartSelect = (part) => {
    setFormData(prev => ({
      ...prev,
      partNumber: part.partNumber,
      partName: part.name,
      description: `Price: ${part.price}`
    }));
  };

  const addCC = (email) => {
    if (email && !formData.cc.includes(email)) {
      setFormData(prev => ({ ...prev, cc: [...prev.cc, email] }));
    }
  };

  const removeCC = (email) => {
    setFormData(prev => ({ ...prev, cc: prev.cc.filter(e => e !== email) }));
  };

  const addBCC = (email) => {
    if (email && !formData.bcc.includes(email)) {
      setFormData(prev => ({ ...prev, bcc: [...prev.bcc, email] }));
    }
  };

  const removeBCC = (email) => {
    setFormData(prev => ({ ...prev, bcc: prev.bcc.filter(e => e !== email) }));
  };

  const savePrefill = () => {
    localStorage.setItem('partsOrderPrefill', JSON.stringify(formData));
    alert('Order template saved for future use');
  };

  const loadPrefill = () => {
    const saved = localStorage.getItem('partsOrderPrefill');
    if (saved) {
      setFormData(JSON.parse(saved));
    }
  };

  const generateEmail = () => {
    const subject = `Parts Order - ${formData.equipment} ${formData.model} - ${formData.partNumber}`;
    const body = `
Parts Order Request

Equipment: ${formData.equipment}
Model: ${formData.model}
Serial: ${formData.serial}
Location: ${formData.location}

Part Details:
- Part Number: ${formData.partNumber}
- Part Name: ${formData.partName}
- Quantity: ${formData.quantity}
- Description: ${formData.description}

Contact:
- Technician: ${formData.technician}
- Email: ${formData.email}
- Phone: ${formData.phone}

Priority: ${formData.priority}
Urgency: ${formData.urgency}

Notes: ${formData.notes}
Installation Date: ${formData.installationDate}
Warranty Info: ${formData.warrantyInfo}

CC: ${formData.cc.join(', ')}
BCC: ${formData.bcc.join(', ')}
    `.trim();

    const mailtoLink = `mailto:parts@ltckitchen.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.open(mailtoLink);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Save to localStorage for future reference
      localStorage.setItem('partsOrderPrefill', JSON.stringify(formData));
      
      // Generate email
      generateEmail();
      
      // Show success message
      alert('Parts order email generated and opened in your email client');
    } catch (error) {
      console.error('Error submitting parts order:', error);
      alert('Error generating parts order. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Enhanced Parts Order Form</h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Equipment Information */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Equipment Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Equipment Type</label>
              <select
                value={formData.equipment}
                onChange={(e) => handleInputChange('equipment', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select Equipment</option>
                <option value="hoshizaki">Hoshizaki Ice Maker</option>
                <option value="turbochef">TurboChef Oven</option>
                <option value="perlick">Perlick Glycol Chiller</option>
                <option value="southbend">Southbend Range</option>
                <option value="frosty">Frosty Soft-Serve</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Model</label>
              <input
                type="text"
                value={formData.model}
                onChange={(e) => handleInputChange('model', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g., KM-500MAH"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Serial Number</label>
              <input
                type="text"
                value={formData.serial}
                onChange={(e) => handleInputChange('serial', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Equipment serial number"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => handleInputChange('location', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g., Kitchen Station 1"
              />
            </div>
          </div>
        </div>

        {/* Part Information */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Part Information</h3>
          
          {/* Suggested Parts */}
          {suggestedParts.length > 0 && (
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Suggested Parts</label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {suggestedParts.map((part, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => handlePartSelect(part)}
                    className="p-3 text-left border border-gray-300 rounded-md hover:bg-blue-50 hover:border-blue-300"
                  >
                    <div className="font-medium">{part.name}</div>
                    <div className="text-sm text-gray-600">{part.partNumber} - {part.price}</div>
                  </button>
                ))}
              </div>
            </div>
          )}
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Part Number</label>
              <input
                type="text"
                value={formData.partNumber}
                onChange={(e) => handleInputChange('partNumber', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g., WF-001"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Part Name</label>
              <input
                type="text"
                value={formData.partName}
                onChange={(e) => handleInputChange('partName', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g., Water Filter"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Quantity</label>
              <input
                type="number"
                value={formData.quantity}
                onChange={(e) => handleInputChange('quantity', parseInt(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                min="1"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <input
                type="text"
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Additional part details"
              />
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Technician Name</label>
              <input
                type="text"
                value={formData.technician}
                onChange={(e) => handleInputChange('technician', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Your name"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="your.email@company.com"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="(555) 123-4567"
              />
            </div>
          </div>
        </div>

        {/* Email Routing */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Email Routing</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">CC Recipients</label>
              <div className="space-y-2">
                {formData.cc.map((email, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <span className="text-sm text-gray-600">{email}</span>
                    <button
                      type="button"
                      onClick={() => removeCC(email)}
                      className="text-red-600 hover:text-red-800"
                    >
                      Remove
                    </button>
                  </div>
                ))}
                <div className="flex space-x-2">
                  <input
                    type="email"
                    placeholder="Add CC email"
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        addCC(e.target.value);
                        e.target.value = '';
                      }
                    }}
                  />
                  <button
                    type="button"
                    onClick={(e) => {
                      const input = e.target.previousElementSibling;
                      addCC(input.value);
                      input.value = '';
                    }}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                  >
                    Add
                  </button>
                </div>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">BCC Recipients</label>
              <div className="space-y-2">
                {formData.bcc.map((email, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <span className="text-sm text-gray-600">{email}</span>
                    <button
                      type="button"
                      onClick={() => removeBCC(email)}
                      className="text-red-600 hover:text-red-800"
                    >
                      Remove
                    </button>
                  </div>
                ))}
                <div className="flex space-x-2">
                  <input
                    type="email"
                    placeholder="Add BCC email"
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        addBCC(e.target.value);
                        e.target.value = '';
                      }
                    }}
                  />
                  <button
                    type="button"
                    onClick={(e) => {
                      const input = e.target.previousElementSibling;
                      addBCC(input.value);
                      input.value = '';
                    }}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                  >
                    Add
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Priority and Additional Info */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Priority & Additional Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
              <select
                value={formData.priority}
                onChange={(e) => handleInputChange('priority', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="low">Low</option>
                <option value="normal">Normal</option>
                <option value="high">High</option>
                <option value="urgent">Urgent</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Urgency</label>
              <select
                value={formData.urgency}
                onChange={(e) => handleInputChange('urgency', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="standard">Standard (5-7 days)</option>
                <option value="rush">Rush (2-3 days)</option>
                <option value="emergency">Emergency (24 hours)</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Installation Date</label>
              <input
                type="date"
                value={formData.installationDate}
                onChange={(e) => handleInputChange('installationDate', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Warranty Info</label>
              <input
                type="text"
                value={formData.warrantyInfo}
                onChange={(e) => handleInputChange('warrantyInfo', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Warranty details if applicable"
              />
            </div>
          </div>
          
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
            <textarea
              value={formData.notes}
              onChange={(e) => handleInputChange('notes', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows="3"
              placeholder="Additional notes or special instructions"
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50"
          >
            {isSubmitting ? 'Generating...' : 'Generate Email Order'}
          </button>
          
          <button
            type="button"
            onClick={savePrefill}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Save Template
          </button>
          
          <button
            type="button"
            onClick={loadPrefill}
            className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
          >
            Load Template
          </button>
        </div>
      </form>
    </div>
  );
}
