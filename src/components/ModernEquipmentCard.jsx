import { useState, useEffect } from 'react';

const ModernEquipmentCard = ({ 
  equipment, 
  onStatusChange, 
  onMaintenanceClick,
  onPartsClick,
  priority = 'medium' 
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [localStatus, setLocalStatus] = useState(equipment.status || 'operational');

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() < 0.05) { // 5% chance of status change
        const statuses = ['operational', 'maintenance', 'warning', 'offline'];
        const newStatus = statuses[Math.floor(Math.random() * statuses.length)];
        setLocalStatus(newStatus);
        onStatusChange?.(equipment.id, newStatus);
      }
    }, 10000); // Check every 10 seconds

    return () => clearInterval(interval);
  }, [equipment.id, onStatusChange]);

  const getStatusConfig = (status) => {
    const configs = {
      operational: {
        color: 'from-green-500 to-emerald-600',
        bgColor: 'bg-green-50',
        borderColor: 'border-green-200',
        textColor: 'text-green-800',
        icon: '✅',
        label: 'Operational',
        pulse: 'animate-pulse'
      },
      maintenance: {
        color: 'from-yellow-500 to-orange-500',
        bgColor: 'bg-yellow-50',
        borderColor: 'border-yellow-200',
        textColor: 'text-yellow-800',
        icon: '🔧',
        label: 'Maintenance',
        pulse: 'animate-bounce'
      },
      warning: {
        color: 'from-orange-500 to-red-500',
        bgColor: 'bg-orange-50',
        borderColor: 'border-orange-200',
        textColor: 'text-orange-800',
        icon: '⚠️',
        label: 'Warning',
        pulse: 'animate-pulse'
      },
      offline: {
        color: 'from-red-500 to-red-700',
        bgColor: 'bg-red-50',
        borderColor: 'border-red-200',
        textColor: 'text-red-800',
        icon: '❌',
        label: 'Offline',
        pulse: 'animate-pulse'
      }
    };
    return configs[status] || configs.operational;
  };

  const statusConfig = getStatusConfig(localStatus);

  const handleQuickAction = async (action) => {
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    switch (action) {
      case 'maintenance':
        onMaintenanceClick?.(equipment);
        break;
      case 'parts':
        onPartsClick?.(equipment);
        break;
      default:
        break;
    }
    
    setIsLoading(false);
  };

  return (
    <div 
      className={`group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-2 overflow-hidden ${
        priority === 'high' ? 'ring-2 ring-blue-500' : ''
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Gradient Background */}
      <div className={`absolute inset-0 bg-gradient-to-br ${statusConfig.color} opacity-5 group-hover:opacity-10 transition-opacity duration-300`}></div>
      
      {/* Header */}
      <div className="relative p-6 pb-4">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="text-4xl">{equipment.icon}</div>
            <div>
              <h3 className="text-xl font-bold text-gray-900">{equipment.name}</h3>
              <p className="text-sm text-gray-600">Model: {equipment.model}</p>
            </div>
          </div>
          
          {/* Status Badge */}
          <div className={`inline-flex items-center space-x-2 px-3 py-1 rounded-full ${statusConfig.bgColor} ${statusConfig.borderColor} border`}>
            <div className={`w-2 h-2 rounded-full ${statusConfig.color.replace('from-', 'bg-').replace(' to-', '')} ${statusConfig.pulse}`}></div>
            <span className={`text-xs font-medium ${statusConfig.textColor}`}>
              {statusConfig.icon} {statusConfig.label}
            </span>
          </div>
        </div>

        {/* Equipment Stats */}
        <div className="grid grid-cols-3 gap-4 mb-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900">{equipment.uptime || 98}%</div>
            <div className="text-xs text-gray-600">Uptime</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900">{equipment.temperature || 42}°F</div>
            <div className="text-xs text-gray-600">Temperature</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900">{equipment.pressure || 18} PSI</div>
            <div className="text-xs text-gray-600">Pressure</div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className={`px-6 pb-6 transition-all duration-300 ${isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}>
        <div className="flex space-x-2">
          <button
            onClick={() => handleQuickAction('maintenance')}
            disabled={isLoading}
            className="flex-1 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          >
            {isLoading ? '⏳' : '🔧'} Schedule Service
          </button>
          <button
            onClick={() => handleQuickAction('parts')}
            disabled={isLoading}
            className="flex-1 bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          >
            {isLoading ? '⏳' : '🛠️'} Order Parts
          </button>
        </div>
      </div>

      {/* Hover Effect Overlay */}
      {isHovered && (
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none"></div>
      )}

      {/* Priority Indicator */}
      {priority === 'high' && (
        <div className="absolute top-2 right-2 w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
      )}
    </div>
  );
};

export default ModernEquipmentCard;
