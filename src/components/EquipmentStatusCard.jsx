import { useState, useEffect } from 'react';

const EquipmentStatusCard = ({ 
  equipmentId, 
  equipmentType, 
  priority = 'medium' 
}) => {
  const [status, setStatus] = useState('operational');
  const [uptime, setUptime] = useState(95);
  const [temperature, setTemperature] = useState(38);
  const [pressure, setPressure] = useState(20);
  const [lastUpdate, setLastUpdate] = useState(new Date());

  useEffect(() => {
    // Simulate real-time updates
    const interval = setInterval(() => {
      setLastUpdate(new Date());
      
      // Simulate occasional status changes
      if (Math.random() < 0.1) {
        const statuses = ['operational', 'maintenance', 'warning', 'offline'];
        setStatus(statuses[Math.floor(Math.random() * statuses.length)]);
      }
      
      // Simulate data fluctuations
      setUptime(prev => Math.max(80, Math.min(100, prev + (Math.random() - 0.5) * 2)));
      setTemperature(prev => Math.max(30, Math.min(50, prev + (Math.random() - 0.5) * 2)));
      setPressure(prev => Math.max(15, Math.min(25, prev + (Math.random() - 0.5) * 1)));
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
          bgColor: 'bg-green-500/20',
          borderColor: 'border-green-500/30',
          textColor: 'text-green-400'
        };
      case 'maintenance':
        return {
          color: 'yellow',
          icon: '🔧',
          label: 'Maintenance',
          bgColor: 'bg-yellow-500/20',
          borderColor: 'border-yellow-500/30',
          textColor: 'text-yellow-400'
        };
      case 'warning':
        return {
          color: 'orange',
          icon: '⚠️',
          label: 'Warning',
          bgColor: 'bg-orange-500/20',
          borderColor: 'border-orange-500/30',
          textColor: 'text-orange-400'
        };
      case 'offline':
        return {
          color: 'red',
          icon: '❌',
          label: 'Offline',
          bgColor: 'bg-red-500/20',
          borderColor: 'border-red-500/30',
          textColor: 'text-red-400'
        };
      default:
        return {
          color: 'gray',
          icon: '❓',
          label: 'Unknown',
          bgColor: 'bg-gray-500/20',
          borderColor: 'border-gray-500/30',
          textColor: 'text-gray-400'
        };
    }
  };

  const statusInfo = getStatusInfo(status);

  return (
    <div className={`bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300 transform hover:scale-105 ${
      priority === 'high' ? 'ring-2 ring-blue-500/50' : ''
    }`}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold text-white">{equipmentType}</h3>
        <div className={`inline-flex items-center space-x-2 px-3 py-1 rounded-full ${statusInfo.bgColor} ${statusInfo.borderColor} border`}>
          <div className={`w-2 h-2 rounded-full bg-${statusInfo.color}-500 animate-pulse`}></div>
          <span className={`text-sm font-medium ${statusInfo.textColor}`}>
            {statusInfo.icon} {statusInfo.label}
          </span>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4 text-white mb-4">
        <div className="text-center">
          <div className="text-2xl font-bold text-blue-400">{uptime.toFixed(1)}%</div>
          <div className="text-sm text-slate-400">Uptime</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-blue-400">{temperature.toFixed(1)}°F</div>
          <div className="text-sm text-slate-400">Temperature</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-blue-400">{pressure.toFixed(1)} PSI</div>
          <div className="text-sm text-slate-400">Pressure</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-blue-400">
            {lastUpdate.toLocaleTimeString()}
          </div>
          <div className="text-sm text-slate-400">Last Update</div>
        </div>
      </div>
      
      <div className="pt-4 border-t border-white/10">
        <div className="text-sm text-slate-400">
          Equipment ID: {equipmentId}
        </div>
      </div>
    </div>
  );
};

export default EquipmentStatusCard;
