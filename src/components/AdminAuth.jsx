import { useState, useEffect } from 'react';

const AdminAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [attempts, setAttempts] = useState(0);

  useEffect(() => {
    // Check if already authenticated
    const auth = localStorage.getItem('admin-authenticated');
    if (auth === 'true') {
      setIsAuthenticated(true);
    }
    setIsLoading(false);
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    
    // Your secret admin password - change this to something secure!
    const validPasswords = [
      'billshope',
      'MYGUY_ADMIN_2025',
      'KITCHEN_MASTER_ADMIN'
    ];
    
    if (validPasswords.includes(password) || validPasswords.includes(password.toUpperCase())) {
      setIsAuthenticated(true);
      localStorage.setItem('admin-authenticated', 'true');
      setError('');
      setPassword('');
    } else {
      const newAttempts = attempts + 1;
      setAttempts(newAttempts);
      
      if (newAttempts >= 3) {
        setError('Too many failed attempts. Access blocked for 5 minutes.');
        setTimeout(() => {
          setAttempts(0);
          setError('');
        }, 300000); // 5 minutes
      } else {
        setError(`Invalid password. ${3 - newAttempts} attempts remaining.`);
      }
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('admin-authenticated');
    setPassword('');
    setError('');
    setAttempts(0);
  };

  // Admin functions
  const updateAccessCodes = () => { 
    console.log('Updating access codes...'); 
    alert('Access codes updated successfully!');
  };
  
  const updateManagerSettings = () => {
    const email = document.getElementById('parts-order-email').value;
    const name = document.getElementById('manager-name').value;
    const phone = document.getElementById('manager-phone').value;
    
    // Save to localStorage for now
    localStorage.setItem('manager-email', email);
    localStorage.setItem('manager-name', name);
    localStorage.setItem('manager-phone', phone);
    
    alert('Manager settings saved successfully!');
    console.log('Manager settings updated:', { email, name, phone });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">⚙️</div>
          <div className="text-white text-xl">Loading Admin Panel...</div>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 flex items-center justify-center p-8">
        <div className="max-w-md w-full">
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8">
            <div className="text-center mb-8">
              <div className="text-6xl mb-4">🔒</div>
              <h1 className="text-3xl font-bold text-white mb-2">Admin Access</h1>
              <p className="text-blue-200">Enter admin password to continue</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-blue-200 mb-2">
                  Admin Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  placeholder="Enter admin password"
                  required
                />
              </div>

              {error && (
                <div className="p-3 bg-red-500/20 border border-red-400/30 rounded-lg">
                  <p className="text-red-200 text-sm">{error}</p>
                </div>
              )}

              <button
                type="submit"
                className="w-full px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-semibold"
              >
                🔐 Access Admin Panel
              </button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-xs text-gray-400">
                Contact system administrator for access
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // If authenticated, show the admin panel content
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 p-8">
      
      {/* Logout Button */}
      <div className="max-w-7xl mx-auto mb-6">
        <div className="flex justify-end">
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm"
          >
            🚪 Logout
          </button>
        </div>
      </div>
      
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-5xl md:text-7xl font-black text-white mb-4 bg-gradient-to-r from-red-400 via-orange-500 to-yellow-600 bg-clip-text text-transparent">
          Admin Panel
        </h1>
        <p className="text-xl text-blue-200">Manage Equipment, Manuals, and System Settings</p>
      </div>

      {/* Admin Tabs */}
      <div className="max-w-7xl mx-auto">
        <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8">
          
          {/* Tab Navigation */}
          <div className="flex flex-wrap justify-center mb-8 space-x-2">
            <button onClick={() => showTab('equipment')} className="admin-tab active px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold transition-all">
              📋 Equipment
            </button>
            <button onClick={() => showTab('manuals')} className="admin-tab px-6 py-3 bg-slate-600 text-white rounded-lg font-semibold transition-all">
              📚 Manuals
            </button>
            <button onClick={() => showTab('parts')} className="admin-tab px-6 py-3 bg-slate-600 text-white rounded-lg font-semibold transition-all">
              🛠 Parts
            </button>
            <button onClick={() => showTab('settings')} className="admin-tab px-6 py-3 bg-slate-600 text-white rounded-lg font-semibold transition-all">
              ⚙️ Settings
            </button>
          </div>

          {/* Equipment Management Tab */}
          <div id="equipment-tab" className="admin-content">
            <h2 className="text-3xl font-bold text-white mb-6">Equipment Management</h2>
            
            {/* Add New Equipment */}
            <div className="bg-white/5 rounded-xl p-6 mb-8">
              <h3 className="text-xl font-semibold text-white mb-4">Add New Equipment</h3>
              <form id="add-equipment-form" className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-blue-200 mb-2">Equipment Name</label>
                  <input type="text" id="eq-name" className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500" placeholder="e.g., Hoshizaki Ice Maker" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-blue-200 mb-2">Model Number</label>
                  <input type="text" id="eq-model" className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500" placeholder="e.g., KM-500MAH" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-blue-200 mb-2">Category</label>
                  <select id="eq-category" className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:ring-2 focus:ring-blue-500">
                    <option value="Refrigeration">Refrigeration</option>
                    <option value="Cooking">Cooking</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-blue-200 mb-2">Icon</label>
                  <input type="text" id="eq-icon" className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500" placeholder="e.g., 🧊" />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-blue-200 mb-2">Description</label>
                  <textarea id="eq-description" rows="3" className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500" placeholder="Equipment description..."></textarea>
                </div>
                <div className="md:col-span-2">
                  <button type="submit" className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-semibold">
                    ➕ Add Equipment
                  </button>
                </div>
              </form>
            </div>

            {/* Equipment List */}
            <div className="bg-white/5 rounded-xl p-6">
              <h3 className="text-xl font-semibold text-white mb-4">Current Equipment</h3>
              <div id="equipment-list" className="space-y-3">
                {/* Equipment items will be loaded here */}
              </div>
            </div>
          </div>

          {/* Manuals Management Tab */}
          <div id="manuals-tab" className="admin-content hidden">
            <h2 className="text-3xl font-bold text-white mb-6">Manuals Management</h2>
            
            {/* Upload New Manual */}
            <div className="bg-white/5 rounded-xl p-6 mb-8">
              <h3 className="text-xl font-semibold text-white mb-4">Upload New Manual</h3>
              <form id="upload-manual-form" className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-blue-200 mb-2">Equipment</label>
                  <select id="manual-equipment" className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:ring-2 focus:ring-blue-500">
                    <option value="">Select Equipment</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-blue-200 mb-2">Manual File (PDF)</label>
                  <input type="file" id="manual-file" accept=".pdf" className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-700" />
                </div>
                <div>
                  <button type="submit" className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold">
                    📤 Upload Manual
                  </button>
                </div>
              </form>
            </div>

            {/* Manuals List */}
            <div className="bg-white/5 rounded-xl p-6">
              <h3 className="text-xl font-semibold text-white mb-4">Current Manuals</h3>
              <div id="manuals-list" className="space-y-3">
                {/* Manuals will be loaded here */}
              </div>
            </div>
          </div>

          {/* Parts Management Tab */}
          <div id="parts-tab" className="admin-content hidden">
            <h2 className="text-3xl font-bold text-white mb-6">Parts Management</h2>
            
            {/* Add New Part */}
            <div className="bg-white/5 rounded-xl p-6 mb-8">
              <h3 className="text-xl font-semibold text-white mb-4">Add New Part</h3>
              <form id="add-part-form" className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-blue-200 mb-2">Part Name</label>
                  <input type="text" id="part-name" className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500" placeholder="e.g., Water Filter" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-blue-200 mb-2">SKU</label>
                  <input type="text" id="part-sku" className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500" placeholder="e.g., WF-001" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-blue-200 mb-2">Equipment</label>
                  <select id="part-equipment" className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:ring-2 focus:ring-blue-500">
                    <option value="">Select Equipment</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-blue-200 mb-2">Price</label>
                  <input type="number" id="part-price" step="0.01" className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500" placeholder="0.00" />
                </div>
                <div className="md:col-span-2">
                  <button type="submit" className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-semibold">
                    ➕ Add Part
                  </button>
                </div>
              </form>
            </div>

            {/* Parts List */}
            <div className="bg-white/5 rounded-xl p-6">
              <h3 className="text-xl font-semibold text-white mb-4">Current Parts</h3>
              <div id="parts-list" className="space-y-3">
                {/* Parts will be loaded here */}
              </div>
            </div>
          </div>

          {/* Settings Tab */}
          <div id="settings-tab" className="admin-content hidden">
            <h2 className="text-3xl font-bold text-white mb-6">System Settings</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Manager Email Configuration */}
              <div className="bg-white/5 rounded-xl p-6">
                <h3 className="text-xl font-semibold text-white mb-4">Manager Email Settings</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-blue-200 mb-2">Parts Order Email</label>
                    <input 
                      type="email" 
                      id="parts-order-email" 
                      className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500" 
                      placeholder="manager@company.com"
                      defaultValue="support@myguy.dev"
                    />
                    <p className="text-xs text-gray-400 mt-1">Email address for parts orders and bulk requests</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-blue-200 mb-2">Manager Name</label>
                    <input 
                      type="text" 
                      id="manager-name" 
                      className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500" 
                      placeholder="Manager Name"
                      defaultValue="Kitchen Manager"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-blue-200 mb-2">Manager Phone</label>
                    <input 
                      type="tel" 
                      id="manager-phone" 
                      className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500" 
                      placeholder="(555) 123-4567"
                      defaultValue=""
                    />
                  </div>
                  <button onClick={() => updateManagerSettings()} className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                    💾 Save Manager Settings
                  </button>
                </div>
              </div>

              {/* Access Codes */}
              <div className="bg-white/5 rounded-xl p-6">
                <h3 className="text-xl font-semibold text-white mb-4">Access Codes</h3>
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-blue-200 mb-2">Bills Bitch Access Codes</label>
                    <textarea id="access-codes" rows="4" className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500" placeholder="Enter access codes, one per line" defaultValue="BILLS_BITCH_2025
MYGUY_ACCESS
KITCHEN_MASTER"></textarea>
                  </div>
                  <button onClick={() => updateAccessCodes()} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                    💾 Update Codes
                  </button>
                </div>
              </div>

              {/* System Info */}
              <div className="bg-white/5 rounded-xl p-6">
                <h3 className="text-xl font-semibold text-white mb-4">System Information</h3>
                <div className="space-y-2 text-sm text-blue-200">
                  <p><strong>Version:</strong> 1.0.0</p>
                  <p><strong>Last Updated:</strong> <span id="last-updated">Just now</span></p>
                  <p><strong>Total Equipment:</strong> <span id="total-equipment">0</span></p>
                  <p><strong>Total Manuals:</strong> <span id="total-manuals">0</span></p>
                  <p><strong>Total Parts:</strong> <span id="total-parts">0</span></p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminAuth;
