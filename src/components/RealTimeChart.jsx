import { useState, useEffect, useRef } from 'react';

const RealTimeChart = ({ 
  equipmentId, 
  dataType = 'temperature',
  title = 'Real-time Data',
  color = 'blue',
  unit = '°F',
  minValue = 0,
  maxValue = 100
}) => {
  const [data, setData] = useState([]);
  const [isConnected, setIsConnected] = useState(false);
  const [currentValue, setCurrentValue] = useState(0);
  const canvasRef = useRef(null);
  const animationRef = useRef(null);

  // Simulate real-time data
  useEffect(() => {
    const interval = setInterval(() => {
      const newValue = Math.random() * (maxValue - minValue) + minValue;
      const timestamp = new Date();
      
      setData(prev => {
        const newData = [...prev, { value: newValue, timestamp }];
        // Keep only last 50 data points
        return newData.slice(-50);
      });
      
      setCurrentValue(newValue);
      setIsConnected(true);
    }, 1000);

    return () => clearInterval(interval);
  }, [minValue, maxValue]);

  // Draw chart
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || data.length === 0) return;

    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;

    // Clear canvas
    ctx.clearRect(0, 0, width, height);

    // Draw grid
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
    ctx.lineWidth = 1;
    for (let i = 0; i <= 10; i++) {
      const y = (height / 10) * i;
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }

    // Draw data line
    if (data.length > 1) {
      ctx.strokeStyle = getColorValue(color);
      ctx.lineWidth = 3;
      ctx.beginPath();

      data.forEach((point, index) => {
        const x = (width / (data.length - 1)) * index;
        const y = height - ((point.value - minValue) / (maxValue - minValue)) * height;
        
        if (index === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      });

      ctx.stroke();

      // Draw data points
      ctx.fillStyle = getColorValue(color);
      data.forEach((point, index) => {
        const x = (width / (data.length - 1)) * index;
        const y = height - ((point.value - minValue) / (maxValue - minValue)) * height;
        
        ctx.beginPath();
        ctx.arc(x, y, 4, 0, 2 * Math.PI);
        ctx.fill();
      });
    }

    // Draw current value indicator
    if (data.length > 0) {
      const lastPoint = data[data.length - 1];
      const x = width - 20;
      const y = height - ((lastPoint.value - minValue) / (maxValue - minValue)) * height;
      
      ctx.fillStyle = getColorValue(color);
      ctx.beginPath();
      ctx.arc(x, y, 8, 0, 2 * Math.PI);
      ctx.fill();
      
      // Draw value text
      ctx.fillStyle = 'white';
      ctx.font = '14px Inter, sans-serif';
      ctx.textAlign = 'right';
      ctx.fillText(`${lastPoint.value.toFixed(1)}${unit}`, x - 10, y - 10);
    }
  }, [data, color, minValue, maxValue, unit]);

  const getColorValue = (color) => {
    const colors = {
      blue: '#3b82f6',
      green: '#10b981',
      red: '#ef4444',
      yellow: '#f59e0b',
      purple: '#8b5cf6',
      pink: '#ec4899'
    };
    return colors[color] || colors.blue;
  };

  const getStatusColor = () => {
    if (currentValue < (maxValue - minValue) * 0.3 + minValue) return 'text-green-400';
    if (currentValue < (maxValue - minValue) * 0.7 + minValue) return 'text-yellow-400';
    return 'text-red-400';
  };

  return (
    <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 hover:bg-white/20 transition-all duration-300">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold text-white">{title}</h3>
        <div className="flex items-center space-x-2">
          <div className={`w-3 h-3 rounded-full ${isConnected ? 'bg-green-400 animate-pulse' : 'bg-red-400'}`}></div>
          <span className="text-sm text-slate-300">
            {isConnected ? 'Live' : 'Disconnected'}
          </span>
        </div>
      </div>

      <div className="mb-4">
        <div className="flex items-baseline space-x-2">
          <span className={`text-4xl font-bold ${getStatusColor()}`}>
            {currentValue.toFixed(1)}
          </span>
          <span className="text-xl text-slate-300">{unit}</span>
        </div>
        <div className="text-sm text-slate-400">
          Equipment ID: {equipmentId}
        </div>
      </div>

      <div className="relative">
        <canvas
          ref={canvasRef}
          width={400}
          height={200}
          className="w-full h-48 rounded-lg bg-black/20"
        />
        
        {/* Chart overlay with min/max values */}
        <div className="absolute top-2 left-2 text-xs text-slate-400">
          {maxValue}{unit}
        </div>
        <div className="absolute bottom-2 left-2 text-xs text-slate-400">
          {minValue}{unit}
        </div>
      </div>

      {/* Data summary */}
      <div className="mt-4 grid grid-cols-3 gap-4 text-center">
        <div>
          <div className="text-sm text-slate-400">Min</div>
          <div className="text-white font-semibold">
            {data.length > 0 ? Math.min(...data.map(d => d.value)).toFixed(1) : '--'}{unit}
          </div>
        </div>
        <div>
          <div className="text-sm text-slate-400">Max</div>
          <div className="text-white font-semibold">
            {data.length > 0 ? Math.max(...data.map(d => d.value)).toFixed(1) : '--'}{unit}
          </div>
        </div>
        <div>
          <div className="text-sm text-slate-400">Avg</div>
          <div className="text-white font-semibold">
            {data.length > 0 ? (data.reduce((acc, d) => acc + d.value, 0) / data.length).toFixed(1) : '--'}{unit}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RealTimeChart;
