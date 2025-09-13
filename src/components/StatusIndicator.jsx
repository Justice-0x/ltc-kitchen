import { useState, useEffect } from 'react';

const StatusIndicator = ({ equipmentType, equipmentId }) => {
  const [status, setStatus] = useState('operational');
  const [lastUpdate, setLastUpdate] = useState(new Date());
  const [isOnline, setIsOnline] = useState(true);

  useEffect(() => {
    // Simulate real-time status updates
    const interval = setInterval(() => {
      setLastUpdate(new Date());
      // Simulate occasional status changes
      if (Math.random() < 0.1) {
        const statuses = ['operational', 'maintenance', 'warning', 'offline'];
        setStatus(statuses[Math.floor(Math.random() * statuses.length)]);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const getStatusInfo = (status) => {
    switch (status) {
      case 'operational':
        return {
          color: 'green',
          icon: '✅',
          label: 'Operational',
          bgColor: 'bg-green-50',
          borderColor: 'border-green-200',
          textColor: 'text-green-800',
          pulseColor: 'bg-green-500'
        };
      case 'maintenance':
        return {
          color: 'yellow',
          icon: '🔧',
          label: 'Maintenance',
          bgColor: 'bg-yellow-50',
          borderColor: 'border-yellow-200',
          textColor: 'text-yellow-800',
          pulseColor: 'bg-yellow-500'
        };
      case 'warning':
        return {
          color: 'orange',
          icon: '⚠️',
          label: 'Warning',
          bgColor: 'bg-orange-50',
          borderColor: 'border-orange-200',
          textColor: 'text-orange-800',
          pulseColor: 'bg-orange-500'
        };
      case 'offline':
        return {
          color: 'red',
          icon: '❌',
          label: 'Offline',
          bgColor: 'bg-red-50',
          borderColor: 'border-red-200',
          textColor: 'text-red-800',
          pulseColor: 'bg-red-500'
        };
      default:
        return {
          color: 'gray',
          icon: '❓',
          label: 'Unknown',
          bgColor: 'bg-gray-50',
          borderColor: 'border-gray-200',
          textColor: 'text-gray-800',
          pulseColor: 'bg-gray-500'
        };
    }
  };

  const statusInfo = getStatusInfo(status);

  return (
    <div className={`inline-flex items-center space-x-2 px-3 py-2 rounded-full ${statusInfo.bgColor} ${statusInfo.borderColor} border-2 transition-all duration-300 hover:shadow-md`}>
      <div className="relative">
        <div className={`w-3 h-3 rounded-full ${statusInfo.pulseColor} ${isOnline ? 'animate-pulse' : ''}`}></div>
        {isOnline && (
          <div className={`absolute inset-0 w-3 h-3 rounded-full ${statusInfo.pulseColor} animate-ping opacity-75`}></div>
        )}
      </div>
      <span className={`text-sm font-medium ${statusInfo.textColor}`}>
        {statusInfo.icon} {statusInfo.label}
      </span>
      <span className={`text-xs ${statusInfo.textColor} opacity-70`}>
        {lastUpdate.toLocaleTimeString()}
      </span>
    </div>
  );
};

export default StatusIndicator;
