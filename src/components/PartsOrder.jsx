import { useEffect, useState } from 'react';

const PartsOrder = ({ part, equipment }) => {
  const [quantity, setQuantity] = useState(1);
  const [isOrdering, setIsOrdering] = useState(false);
  const [showQuote, setShowQuote] = useState(false);
  const [prefill, setPrefill] = useState({ model: '', serial: '' });

  // Prefill from URL params (?model=...&serial=...)
  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const model = params.get('model') || '';
      const serial = params.get('serial') || '';
      if (model || serial) setPrefill({ model, serial });
    } catch (_) {}
  }, []);

  const suppliers = [
    {
      name: 'PartsTown',
      url: `https://www.partstown.com/search?q=${encodeURIComponent(part.sku)}`,
      logo: '🏪',
      description: 'Official PartsTown - Fast shipping'
    },
    {
      name: 'General Parts',
      url: `https://generalparts.com/oemparts/?search=${encodeURIComponent(part.sku)}`,
      logo: '🔧',
      description: 'General Parts Group - OEM parts'
    },
    {
      name: 'PartsFPS',
      url: `https://www.partsfps.com/search?q=${encodeURIComponent(part.sku)}`,
      logo: '⚡',
      description: 'PartsFPS - Same day shipping'
    },
    {
      name: 'EMRCO',
      url: `https://www.emrco.com/parts-equipment/parts-sales/?search=${encodeURIComponent(part.sku)}`,
      logo: '🏭',
      description: 'EMRCO - 250+ manufacturers'
    }
  ];

  const handleOrder = (supplier) => {
    setIsOrdering(true);
    // Open supplier in new tab
    window.open(supplier.url, '_blank');
    
    // Simulate order processing
    setTimeout(() => {
      setIsOrdering(false);
      setShowQuote(true);
    }, 1000);
  };

  const handleQuote = () => {
    const quoteData = {
      part: part.name,
      sku: part.sku,
      quantity: quantity,
      equipment: equipment,
      model: prefill.model,
      serial: prefill.serial,
      timestamp: new Date().toISOString()
    };
    
    // Store in localStorage for quote management
    const existingQuotes = JSON.parse(localStorage.getItem('partsQuotes') || '[]');
    existingQuotes.push(quoteData);
    localStorage.setItem('partsQuotes', JSON.stringify(existingQuotes));
    
    setShowQuote(true);
  };

  return (
    <div className="space-y-4">
      {/* Current Unit Context */}
      {(prefill.model || prefill.serial) && (
        <div className="p-2 rounded bg-blue-50 border border-blue-200 text-xs text-blue-800">
          Unit context: {prefill.model && (<span className="mr-2"><strong>Model:</strong> {prefill.model}</span>)}{prefill.serial && (<span><strong>Serial:</strong> {prefill.serial}</span>)}
        </div>
      )}
      {/* Quantity Selector */}
      <div className="flex items-center space-x-2">
        <label className="text-sm font-medium text-slate-700">Quantity:</label>
        <select 
          value={quantity} 
          onChange={(e) => setQuantity(parseInt(e.target.value))}
          className="px-2 py-1 border border-slate-300 rounded text-sm"
        >
          {[1,2,3,4,5,10].map(num => (
            <option key={num} value={num}>{num}</option>
          ))}
        </select>
      </div>

      {/* Order Buttons */}
      <div className="space-y-2">
        <button
          onClick={handleQuote}
          className="w-full px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 text-sm font-medium"
        >
          📋 Get Quote
        </button>
        
        <div className="text-xs text-slate-500 text-center mb-2">Or order directly from:</div>
        
        <div className="grid grid-cols-2 gap-2">
          {suppliers.map((supplier, index) => (
            <button
              key={index}
              onClick={() => handleOrder(supplier)}
              disabled={isOrdering}
              className="px-3 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 text-xs disabled:opacity-50"
            >
              {supplier.logo} {supplier.name}
            </button>
          ))}
        </div>
      </div>

      {/* Quote Confirmation */}
      {showQuote && (
        <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
          <div className="flex items-center space-x-2">
            <span className="text-green-600">✅</span>
            <span className="text-sm font-medium text-green-800">
              Quote added! Check your cart for details.
            </span>
          </div>
        </div>
      )}

      {/* Spec Sheet Button */}
      <button className="w-full px-3 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 text-sm">
        📄 Spec Sheet
      </button>
    </div>
  );
};

export default PartsOrder;
