import { useState } from 'react';

const QuickActions = ({ equipmentType, equipmentId }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [actionResult, setActionResult] = useState(null);

  const handleAction = async (action, actionName) => {
    setIsLoading(true);
    setActionResult(null);

    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Handle different actions
      switch (action) {
        case 'viewHistory':
          setActionResult({
            type: 'success',
            message: `📊 Equipment history loaded for ${equipmentId}`,
            data: generateMockHistory()
          });
          break;
        
        case 'scheduleService':
          setActionResult({
            type: 'success',
            message: `🔧 Service scheduled for ${equipmentId}`,
            data: generateMockServiceSchedule()
          });
          break;
        
        case 'forceDefrost':
          setActionResult({
            type: 'success',
            message: `🚨 Force defrost initiated for ${equipmentId}`,
            data: generateMockDefrostStatus()
          });
          break;
        
        case 'temperatureLogs':
          setActionResult({
            type: 'success',
            message: `📈 Temperature logs retrieved for ${equipmentId}`,
            data: generateMockTemperatureLogs()
          });
          break;
        
        default:
          setActionResult({
            type: 'error',
            message: 'Unknown action requested'
          });
      }
    } catch (error) {
      setActionResult({
        type: 'error',
        message: `Failed to ${actionName.toLowerCase()}: ${error.message}`
      });
    } finally {
      setIsLoading(false);
    }
  };

  const generateMockHistory = () => ({
    events: [
      { date: '2024-01-15 14:30', event: 'Service completed - Filter replacement', tech: 'Mike R.' },
      { date: '2024-01-10 09:15', event: 'Maintenance check - All systems OK', tech: 'Sarah L.' },
      { date: '2024-01-05 16:45', event: 'Temperature calibration', tech: 'Mike R.' },
      { date: '2023-12-28 11:20', event: 'Defrost cycle completed', tech: 'System' }
    ]
  });

  const generateMockServiceSchedule = () => ({
    nextService: '2024-02-15 10:00 AM',
    serviceType: 'Quarterly Maintenance',
    technician: 'Mike Rodriguez',
    tasks: [
      'Clean condenser coils',
      'Check refrigerant levels',
      'Calibrate temperature sensors',
      'Inspect electrical connections'
    ]
  });

  const generateMockDefrostStatus = () => ({
    status: 'Defrost Cycle Active',
    duration: '15 minutes',
    currentTemp: '32°F',
    targetTemp: '45°F',
    progress: '65%'
  });

  const generateMockTemperatureLogs = () => ({
    current: '38°F',
    average: '37°F',
    range: '35-42°F',
    last24h: [
      { time: '00:00', temp: '38°F' },
      { time: '06:00', temp: '37°F' },
      { time: '12:00', temp: '39°F' },
      { time: '18:00', temp: '38°F' }
    ]
  });

  const actions = [
    {
      id: 'viewHistory',
      name: 'View History',
      icon: '📊',
      color: 'bg-blue-600 hover:bg-blue-700',
      description: 'View maintenance and service history'
    },
    {
      id: 'scheduleService',
      name: 'Schedule Service',
      icon: '🔧',
      color: 'bg-green-600 hover:bg-green-700',
      description: 'Schedule maintenance or repair service'
    },
    {
      id: 'forceDefrost',
      name: 'Force Defrost',
      icon: '🚨',
      color: 'bg-orange-600 hover:bg-orange-700',
      description: 'Initiate emergency defrost cycle'
    },
    {
      id: 'temperatureLogs',
      name: 'Temperature Logs',
      icon: '📈',
      color: 'bg-purple-600 hover:bg-purple-700',
      description: 'View temperature monitoring data'
    }
  ];

  return (
    <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl p-6 border border-blue-200">
      <h3 className="text-lg font-semibold text-slate-900 mb-4">Quick Actions</h3>
      
      <div className="flex flex-wrap gap-3 mb-4">
        {actions.map((action) => (
          <button
            key={action.id}
            onClick={() => handleAction(action.id, action.name)}
            disabled={isLoading}
            className={`px-4 py-2 text-white rounded-lg transition-colors text-sm font-medium ${action.color} ${
              isLoading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            title={action.description}
          >
            {isLoading ? '⏳ Loading...' : `${action.icon} ${action.name}`}
          </button>
        ))}
      </div>

      {/* Action Results */}
      {actionResult && (
        <div className={`p-4 rounded-lg border ${
          actionResult.type === 'success' 
            ? 'bg-green-50 border-green-200' 
            : 'bg-red-50 border-red-200'
        }`}>
          <div className={`font-medium ${
            actionResult.type === 'success' ? 'text-green-900' : 'text-red-900'
          }`}>
            {actionResult.message}
          </div>
          
          {actionResult.data && (
            <div className="mt-3 space-y-2">
              {actionResult.data.events && (
                <div>
                  <div className="text-sm font-medium text-slate-700 mb-2">Recent Events:</div>
                  <div className="space-y-1 max-h-32 overflow-y-auto">
                    {actionResult.data.events.map((event, idx) => (
                      <div key={idx} className="text-xs text-slate-600 bg-white p-2 rounded">
                        <div className="font-medium">{event.date}</div>
                        <div>{event.event} - {event.tech}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {actionResult.data.nextService && (
                <div className="text-sm">
                  <div className="font-medium text-slate-700">Next Service:</div>
                  <div className="text-slate-600">{actionResult.data.nextService}</div>
                  <div className="text-slate-600">Technician: {actionResult.data.technician}</div>
                </div>
              )}
              
              {actionResult.data.status && (
                <div className="text-sm">
                  <div className="font-medium text-slate-700">Status:</div>
                  <div className="text-slate-600">{actionResult.data.status}</div>
                  <div className="text-slate-600">Progress: {actionResult.data.progress}</div>
                </div>
              )}
              
              {actionResult.data.current && (
                <div className="text-sm">
                  <div className="font-medium text-slate-700">Current Temperature:</div>
                  <div className="text-slate-600">{actionResult.data.current}</div>
                  <div className="text-slate-600">Range: {actionResult.data.range}</div>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default QuickActions;
