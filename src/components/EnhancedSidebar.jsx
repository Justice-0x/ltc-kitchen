import { useState, useEffect } from 'react';

const EnhancedSidebar = () => {
  const [activeSection, setActiveSection] = useState('');
  const [hoveredItem, setHoveredItem] = useState(null);
  const [isCollapsed, setIsCollapsed] = useState(false);

  useEffect(() => {
    // Get current path to highlight active section
    const path = window.location.pathname;
    if (path === '/') setActiveSection('dashboard');
    else if (path.includes('/docs')) setActiveSection('docs');
    else if (path.includes('/parts')) setActiveSection('parts');
    else if (path.includes('/quote')) setActiveSection('quotes');
    else setActiveSection(path.slice(1));
  }, []);

  const equipmentSections = [
    {
      title: 'Refrigeration',
      icon: '❄️',
      items: [
        { name: 'Perlick Chillers', path: '/perlick', icon: '🍺', status: 'operational' },
        { name: 'Perlick Low Boys', path: '/perlick-lowboys', icon: '🍺', status: 'operational' },
        { name: 'Hoshizaki Ice', path: '/hoshizaki', icon: '🧊', status: 'operational' },
        { name: 'Hoshizaki Refrigerators', path: '/hoshizaki-refrigerators', icon: '🧊', status: 'maintenance' },
        { name: 'Walk-In Coolers', path: '/walk-ins', icon: '🚪', status: 'operational' },
        { name: 'Low Boys', path: '/low-boys', icon: '📦', status: 'operational' },
        { name: 'American Panel', path: '/american-panel', icon: '🏢', status: 'operational' }
      ]
    },
    {
      title: 'Cooking',
      icon: '🔥',
      items: [
        { name: 'TurboChef', path: '/turbochef', icon: '🔥', status: 'operational' },
        { name: 'Southbend', path: '/southbend', icon: '🍳', status: 'operational' },
        { name: 'Frosty', path: '/frosty', icon: '🍦', status: 'maintenance' }
      ]
    },
    {
      title: 'Controls',
      icon: '🎛️',
      items: [
        { name: 'K2E Controllers', path: '/k2e-controllers', icon: '🎛️', status: 'operational' },
        { name: 'ADT Systems', path: '/adt-systems', icon: '📊', status: 'operational' }
      ]
    },
    {
      title: 'Other Equipment',
      icon: '⚙️',
      items: [
        { name: 'Chicago Folders', path: '/chicago-folders', icon: '📄', status: 'operational' },
        { name: 'Ironers', path: '/ironers', icon: '🧺', status: 'operational' },
        { name: 'Laundry', path: '/laundry', icon: '🌀', status: 'operational' },
        { name: "Bill's Bitch", path: '/bills-bitch', icon: '✨', status: 'operational' }
      ]
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'operational': return 'bg-green-500';
      case 'maintenance': return 'bg-yellow-500';
      case 'offline': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'operational': return 'Online';
      case 'maintenance': return 'Maintenance';
      case 'offline': return 'Offline';
      default: return 'Unknown';
    }
  };

  return (
    <nav className={`h-screen bg-gradient-to-b from-green-900 via-teal-800 to-blue-900 shadow-xl p-4 flex flex-col text-white transition-all duration-300 ${isCollapsed ? 'w-16' : 'w-64'} relative overflow-y-auto`}>
      
      {/* Collapse Toggle */}
      <button 
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute -right-3 top-8 bg-blue-600 hover:bg-blue-700 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs transition-colors z-10"
      >
        {isCollapsed ? '→' : '←'}
      </button>

      {/* Logo Header with SECRET EASTER EGG */}
      <div className={`flex items-center space-x-3 mb-6 p-2 transition-all duration-300 ${isCollapsed ? 'justify-center' : ''}`}>
        <img 
          src="/logo.png" 
          alt="Margaritaville Logo" 
          className="w-8 h-8 rounded-lg shadow-sm flex-shrink-0 cursor-pointer hover:scale-110 transition-transform" 
          onClick={() => {
            // SECRET EASTER EGG - Triple click to reveal message for Cody
            const now = Date.now();
            if (!window.logoClicks) window.logoClicks = [];
            window.logoClicks.push(now);
            window.logoClicks = window.logoClicks.filter(time => now - time < 2000); // Keep clicks within 2 seconds
            
            if (window.logoClicks.length >= 3) {
              // Show the secret message
              const modal = document.createElement('div');
              modal.className = 'fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-[9999]';
              modal.innerHTML = `
                <div class="bg-gradient-to-r from-red-600 to-pink-600 text-white p-8 rounded-xl shadow-2xl text-center animate-bounce">
                  <div class="text-6xl mb-4">🖕</div>
                  <h2 class="text-4xl font-bold mb-2">FUCK YOU CODY!</h2>
                  <p class="text-xl">Hope you enjoyed the surprise! 😂</p>
                  <button onclick="this.parentElement.parentElement.remove()" class="mt-4 px-6 py-2 bg-white text-red-600 rounded-lg font-bold hover:bg-gray-100">
                    Close (and tell nobody!)
                  </button>
                </div>
              `;
              document.body.appendChild(modal);
              window.logoClicks = []; // Reset
            }
          }}
        />
        {!isCollapsed && (
          <div>
            <h1 className="text-xl font-bold text-white">🍹 Margaritaville</h1>
            <p className="text-sm text-slate-300">Kitchen & Equipment</p>
          </div>
        )}
      </div>

      {/* Main Navigation */}
      <div className="space-y-1 mb-6">
        <a 
          href="/" 
          className={`nav-link mb-1 block p-2 rounded-lg transition-all duration-200 hover:bg-blue-600 hover:text-white hover:scale-105 ${activeSection === 'dashboard' ? 'bg-blue-600 text-white shadow-lg' : ''} ${isCollapsed ? 'justify-center' : ''} flex items-center space-x-2`}
          title={isCollapsed ? "Dashboard" : ""}
        >
          <span className="text-xl">🏠</span>
          {!isCollapsed && <span>Dashboard</span>}
        </a>
        
        <a 
          href="/docs" 
          className={`nav-link mb-1 block p-2 rounded-lg transition-all duration-200 hover:bg-blue-600 hover:text-white hover:scale-105 ${activeSection === 'docs' ? 'bg-blue-600 text-white shadow-lg' : ''} ${isCollapsed ? 'justify-center' : ''} flex items-center space-x-2`}
          title={isCollapsed ? "Documentation" : ""}
        >
          <span className="text-xl">📚</span>
          {!isCollapsed && <span>Docs</span>}
        </a>
        
        <a 
          href="/equipment" 
          className={`nav-link mb-1 block p-2 rounded-lg transition-all duration-200 hover:bg-blue-600 hover:text-white hover:scale-105 ${activeSection === 'equipment' ? 'bg-blue-600 text-white shadow-lg' : ''} ${isCollapsed ? 'justify-center' : ''} flex items-center space-x-2`}
          title={isCollapsed ? "Equipment Directory" : ""}
        >
          <span className="text-xl">📋</span>
          {!isCollapsed && <span>Equipment Directory</span>}
        </a>
      </div>

      {/* Equipment Sections */}
      {!isCollapsed && equipmentSections.map((section, sectionIndex) => (
        <div key={section.title} className="mb-4">
          <h3 className="font-bold mb-2 text-slate-300 text-sm uppercase tracking-wide flex items-center space-x-2">
            <span>{section.icon}</span>
            <span>{section.title}</span>
          </h3>
          
          <div className="space-y-1">
            {section.items.map((item, itemIndex) => (
              <a
                key={item.path}
                href={item.path}
                className={`nav-link block p-2 rounded-lg transition-all duration-200 hover:bg-gradient-to-r hover:from-yellow-500 hover:to-orange-500 hover:text-white hover:scale-105 hover:shadow-xl hover:shadow-orange-500/50 ${
                  activeSection === item.path.slice(1) ? 'bg-gradient-to-r from-yellow-500 to-orange-500 text-white shadow-lg' : ''
                } group relative overflow-hidden`}
                onMouseEnter={() => setHoveredItem(`${sectionIndex}-${itemIndex}`)}
                onMouseLeave={() => setHoveredItem(null)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="text-sm">{item.icon}</span>
                    <span className="text-sm">{item.name}</span>
                  </div>
                  
                  {/* Status Indicator */}
                  <div className="flex items-center space-x-1">
                    <div className={`w-2 h-2 rounded-full ${getStatusColor(item.status)} animate-pulse`}></div>
                    {hoveredItem === `${sectionIndex}-${itemIndex}` && (
                      <span className="text-xs text-slate-300">{getStatusText(item.status)}</span>
                    )}
                  </div>
                </div>

                {/* Hover Effect */}
                {hoveredItem === `${sectionIndex}-${itemIndex}` && (
                  <div className="absolute left-full ml-2 top-0 bg-slate-800 text-white p-2 rounded-lg shadow-lg z-50 whitespace-nowrap">
                    <div className="text-sm font-semibold">{item.name}</div>
                    <div className="text-xs text-slate-300">Status: {getStatusText(item.status)}</div>
                  </div>
                )}
              </a>
            ))}
          </div>
        </div>
      ))}

      {/* Collapsed Equipment Icons */}
      {isCollapsed && (
        <div className="space-y-2">
          {equipmentSections.map((section) => (
            <div key={section.title} className="space-y-1">
              {section.items.map((item) => (
                <a
                  key={item.path}
                  href={item.path}
                  className="nav-link block p-2 rounded-lg transition-all duration-200 hover:bg-blue-600 hover:text-white hover:scale-110 flex justify-center relative group"
                  title={item.name}
                >
                  <span className="text-lg">{item.icon}</span>
                  <div className={`absolute w-2 h-2 rounded-full ${getStatusColor(item.status)} -top-1 -right-1 animate-pulse`}></div>
                </a>
              ))}
            </div>
          ))}
        </div>
      )}

      {/* Parts & Service */}
      <div className="mt-auto">
        <hr className="my-4 border-slate-600" />
        
        {!isCollapsed && (
          <h3 className="font-bold mb-2 text-slate-300 text-sm uppercase tracking-wide">🛠 Parts & Service</h3>
        )}
        
        <a 
          href="/quote" 
          className={`mb-2 block p-2 rounded-lg transition-all duration-200 hover:bg-blue-600 hover:text-white hover:scale-105 ${activeSection === 'quote' ? 'bg-blue-600 text-white shadow-lg' : ''} ${isCollapsed ? 'justify-center' : ''} flex items-center space-x-2`}
          title={isCollapsed ? "My Quotes" : ""}
        >
          <span className="text-xl">📋</span>
          {!isCollapsed && <span>My Quotes</span>}
        </a>
      </div>

      {/* Tropical Animated Background Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Floating Palm Trees */}
        <div className="absolute text-6xl opacity-10 animate-bounce" style={{ top: '10%', right: '5%', animationDelay: '0s', animationDuration: '3s' }}>🌴</div>
        <div className="absolute text-4xl opacity-10 animate-bounce" style={{ top: '40%', right: '10%', animationDelay: '1s', animationDuration: '4s' }}>🌺</div>
        <div className="absolute text-5xl opacity-10 animate-bounce" style={{ top: '70%', right: '5%', animationDelay: '2s', animationDuration: '5s' }}>🥥</div>
        
        {/* Floating Margarita Glasses */}
        <div className="absolute text-3xl opacity-10 animate-pulse" style={{ top: '20%', left: '5%', animationDelay: '0.5s', animationDuration: '2s' }}>🍹</div>
        <div className="absolute text-4xl opacity-10 animate-pulse" style={{ top: '60%', left: '10%', animationDelay: '1.5s', animationDuration: '3s' }}>🍸</div>
        
        {/* Gradient Orbs */}
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full opacity-5 animate-pulse"
            style={{
              width: `${60 + i * 20}px`,
              height: `${60 + i * 20}px`,
              background: `linear-gradient(45deg, #10b981, #06b6d4, #3b82f6)`,
              top: `${15 + i * 25}%`,
              left: `${-20 + i * 10}%`,
              animationDelay: `${i * 1.5}s`,
              animationDuration: `${3 + i}s`
            }}
          />
        ))}
      </div>
    </nav>
  );
};

export default EnhancedSidebar;
