import { useState, useEffect } from 'react';

const SimpleSidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [activeSection, setActiveSection] = useState('dashboard');
  const [logoClickCount, setLogoClickCount] = useState(0);
  const [showEasterEgg, setShowEasterEgg] = useState(false);
  const [currentTheme, setCurrentTheme] = useState('dark');
  const themes = ['dark', 'light', 'spooky'];

  useEffect(() => {
    const path = window.location.pathname;
    if (path === '/') setActiveSection('dashboard');
    else if (path.includes('/equipment')) setActiveSection('equipment');
    else if (path.includes('/monitoring')) setActiveSection('monitoring');
    else if (path.includes('/docs')) setActiveSection('docs');
    else if (path.includes('/contact')) setActiveSection('contact');
    else if (path.includes('/bills-bitch')) setActiveSection('bills-bitch');
    else if (path.includes('/admin')) setActiveSection('admin');
    
    // Load current theme and ensure it's valid
    let savedTheme = localStorage.getItem('theme') || 'dark';
    if (!['dark', 'light', 'spooky'].includes(savedTheme)) {
      savedTheme = 'dark';
      localStorage.setItem('theme', savedTheme);
    }
    
    setCurrentTheme(savedTheme);
    // Apply theme immediately
    document.documentElement.setAttribute('data-theme', savedTheme);
    document.body.classList.remove('light', 'dark', 'spooky');
    document.body.classList.add(savedTheme);
    
    console.log('Sidebar initialized with theme:', savedTheme);
  }, []);

  const handleLogoClick = () => {
    const newCount = logoClickCount + 1;
    setLogoClickCount(newCount);
    
    if (newCount === 3) {
      setShowEasterEgg(true);
      // Reset counter after 5 seconds
      setTimeout(() => {
        setLogoClickCount(0);
        setShowEasterEgg(false);
      }, 5000);
    } else if (newCount > 3) {
      setLogoClickCount(0);
    }
  };

  const handleThemeToggle = () => {
    // Get current theme from localStorage instead of state
    const currentThemeFromStorage = localStorage.getItem('theme') || 'dark';
    const order = ['dark', 'light', 'spooky'];
    const idx = order.indexOf(currentThemeFromStorage);
    const nextTheme = order[(idx + 1) % order.length];

    console.log('Theme toggle:', { currentThemeFromStorage, nextTheme, idx });

    // Always update the theme directly
    document.documentElement.setAttribute('data-theme', nextTheme);
    document.body.classList.remove('light', 'dark', 'spooky');
    document.body.classList.add(nextTheme);
    localStorage.setItem('theme', nextTheme);
    
    // Force a visual refresh
    document.body.style.display = 'none';
    document.body.offsetHeight; // Trigger reflow
    document.body.style.display = '';
    
    // Update state
    setCurrentTheme(nextTheme);
    
    // Theme changed successfully
    
    // Also call global function if available for consistency
    if (window.switchTheme) {
      window.switchTheme(nextTheme);
    }
  };

  const navigationItems = [
    { name: 'Dashboard', href: '/', icon: '🏠' },
    { name: 'Equipment', href: '/equipment', icon: '📋' },
    { name: 'Monitoring', href: '/monitoring', icon: '📊' },
    { name: 'Contact', href: '/contact', icon: '📞' },
    { name: 'Docs', href: '/docs', icon: '📚' },
    { name: 'Commissioning', href: '/commissioning', icon: '✅' },
    { name: 'Calculators', href: '/calculators', icon: '🧮' },
    { name: 'PT Chart', href: '/pt-chart', icon: '📈' },
    { name: 'Troubleshooting', href: '/troubleshooting', icon: '🔧' },
    { name: 'Parts Order', href: '/parts-order', icon: '📦' },
    { name: 'Parts Cross-Ref', href: '/parts-crossref', icon: '🔄' },
    { name: 'Search', href: '/search', icon: '🔎' },
    { name: 'Kitchen Assistant', href: '/kitchen-assistant', icon: '🤖' }
  ];

  return (
    <div className={`bg-gradient-to-b from-teal-900 to-cyan-900 text-white transition-all duration-300 ${
      isCollapsed ? 'w-16' : 'w-64'
    } h-screen flex flex-col shadow-2xl overflow-y-auto overflow-x-hidden`}>
      
                  {/* Easter Egg Display */}
                  {showEasterEgg && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80">
                      <div className="bg-red-600 text-white p-16 rounded-3xl shadow-2xl animate-bounce max-w-4xl w-full text-center border-8 border-red-400">
                        <div className="text-9xl mb-8">🖕</div>
                        <div className="text-8xl font-black uppercase mb-8 tracking-wider">FUCK YOU BILL!</div>
                        <div className="text-6xl">🎉</div>
                      </div>
                    </div>
                  )}

      {/* Header */}
      <div className="p-4 border-b border-cyan-700">
        <div className="flex items-center justify-between">
          {!isCollapsed && (
            <div className="flex items-center space-x-3">
              <img 
                src="/favicon.svg" 
                alt="Margaritaville Logo" 
                className="w-10 h-10 rounded-lg shadow-sm cursor-pointer hover:scale-110 transition-transform" 
                onClick={handleLogoClick}
              />
              <div>
                <h1 className="text-lg font-bold">Margaritaville</h1>
                <p className="text-xs text-slate-400">Kitchen & Equipment</p>
              </div>
            </div>
          )}
          {isCollapsed && (
            <div className="flex justify-center">
              <img 
                src="/favicon.svg" 
                alt="Margaritaville Logo" 
                className="w-8 h-8 rounded-lg shadow-sm cursor-pointer hover:scale-110 transition-transform" 
                onClick={handleLogoClick}
              />
            </div>
          )}
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {navigationItems.map((item) => (
            <li key={item.name}>
              <a
                href={item.href}
                            className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                              activeSection === item.name.toLowerCase().replace(' ', '-')
                                ? 'bg-gradient-to-r from-cyan-500 to-teal-500 text-white shadow-lg'
                                : 'text-cyan-200 hover:bg-cyan-800/50 hover:text-white'
                            }`}
              >
                <span className="text-xl">{item.icon}</span>
                {!isCollapsed && <span>{item.name}</span>}
              </a>
            </li>
          ))}
        </ul>
      </nav>

                  {/* Premium Maintenance Status */}
                  {!isCollapsed && (
                    <div className="p-4 border-t border-cyan-700">
                      <h3 className="text-sm font-semibold text-cyan-300 mb-2">Smart Maintenance</h3>
                      <div className="text-center">
                        <div className="text-2xl mb-2">⭐</div>
                        <div className="text-xs text-amber-400 font-semibold">Premium Feature</div>
                        <div className="text-xs text-cyan-500 mt-1">AI Predictions</div>
                        <div className="text-xs text-cyan-500">$99/month</div>
                      </div>
                    </div>
                  )}

      {/* Footer with Logo */}
      <div className="p-4 border-t border-cyan-700">
        {!isCollapsed ? (
          <div className="text-center">
            <div className="text-xs text-cyan-400 mb-2">Powered by</div>
            <div className="flex items-center justify-center space-x-2">
              <img src="/favicon.svg" alt="Margaritaville Kitchen Logo" className="w-4 h-4 rounded" />
              <div className="text-sm font-semibold text-cyan-300">myguy.dev</div>
            </div>
          </div>
        ) : (
          <div className="flex justify-center">
            <img src="/favicon.svg" alt="Margaritaville Kitchen Logo" className="w-6 h-6 rounded" />
          </div>
        )}
      </div>

      {/* Theme Toggle */}
      <div className="p-4 border-t border-cyan-700">
        <button
          onClick={handleThemeToggle}
          className="w-full flex items-center justify-center space-x-2 px-3 py-2 text-cyan-400 hover:text-white hover:bg-cyan-800/50 rounded-lg transition-colors"
        >
          <span className="text-lg">
            {currentTheme === 'dark' ? '☀️' : currentTheme === 'light' ? '🌙' : '🕸️'}
          </span>
          {!isCollapsed && (
            <span className="text-sm">
              {currentTheme === 'dark' ? 'Light' : currentTheme === 'light' ? 'Spooky' : 'Dark'}
            </span>
          )}
        </button>
      </div>

      {/* Collapse Button */}
      <div className="p-4 border-t border-cyan-700">
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="w-full flex items-center justify-center space-x-2 px-3 py-2 text-cyan-400 hover:text-white hover:bg-cyan-800/50 rounded-lg transition-colors"
        >
          <span className="text-lg">{isCollapsed ? '→' : '←'}</span>
          {!isCollapsed && <span className="text-sm">Collapse</span>}
        </button>
      </div>
    </div>
  );
};

export default SimpleSidebar;
