import { useState } from 'react';

const FloatingActions = ({ equipmentId }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeAction, setActiveAction] = useState(null);

  const actions = [
    {
      id: 'qr',
      icon: '📱',
      label: 'QR Scan',
      color: 'bg-blue-500 hover:bg-blue-600',
      onClick: () => {
        setActiveAction('qr');
        alert('QR Scanner activated!');
        setTimeout(() => setActiveAction(null), 2000);
      }
    },
    {
      id: 'status',
      icon: '📊',
      label: 'Live Status',
      color: 'bg-green-500 hover:bg-green-600',
      onClick: () => {
        setActiveAction('status');
        alert('Opening live status dashboard...');
        setTimeout(() => setActiveAction(null), 2000);
      }
    },
    {
      id: 'service',
      icon: '🔧',
      label: 'Schedule Service',
      color: 'bg-orange-500 hover:bg-orange-600',
      onClick: () => {
        setActiveAction('service');
        alert('Opening service scheduler...');
        setTimeout(() => setActiveAction(null), 2000);
      }
    },
    {
      id: 'parts',
      icon: '🛠️',
      label: 'Order Parts',
      color: 'bg-purple-500 hover:bg-purple-600',
      onClick: () => {
        setActiveAction('parts');
        alert('Opening parts catalog...');
        setTimeout(() => setActiveAction(null), 2000);
      }
    }
  ];

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Action Buttons */}
      <div className={`flex flex-col space-y-3 mb-4 transition-all duration-300 ${isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}`}>
        {actions.map((action) => (
          <div key={action.id} className="flex items-center space-x-3">
            <span className="text-white text-sm font-medium bg-black/50 backdrop-blur-sm px-3 py-1 rounded-full whitespace-nowrap">
              {action.label}
            </span>
            <button
              onClick={action.onClick}
              disabled={activeAction === action.id}
              className={`w-12 h-12 ${action.color} text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center`}
            >
              <span className="text-xl">{action.icon}</span>
            </button>
          </div>
        ))}
      </div>

      {/* Main FAB */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-14 h-14 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 transform ${isOpen ? 'rotate-45 scale-110' : 'hover:scale-110'} flex items-center justify-center`}
      >
        <svg 
          className={`w-6 h-6 transition-transform duration-300 ${isOpen ? 'rotate-45' : ''}`} 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        </svg>
      </button>

      {/* Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/20 backdrop-blur-sm -z-10" 
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
};

export default FloatingActions;
