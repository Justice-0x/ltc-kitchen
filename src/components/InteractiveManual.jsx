import { useState, useEffect } from 'react';

const InteractiveManual = ({ manualData }) => {
  const [activeTab, setActiveTab] = useState('specs');
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const tabs = [
    { id: 'specs', label: 'Specifications', icon: '⚙️' },
    { id: 'troubleshooting', label: 'Troubleshooting', icon: '🚨' },
    { id: 'maintenance', label: 'Maintenance', icon: '🔧' },
    { id: 'sections', label: 'Manual Sections', icon: '📚' }
  ];

  const handleDownloadPDF = async () => {
    setIsLoading(true);
    // Simulate PDF download
    setTimeout(() => {
      alert(`Downloading ${manualData.title} PDF...`);
      setIsLoading(false);
    }, 1000);
  };

  const filteredSections = manualData.sections?.filter(section =>
    section.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  return (
    <div className="space-y-6">
      {/* Interactive Tabs */}
      <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-4">
          <h2 className="text-xl font-bold text-white flex items-center">
            <span className="mr-2">📖</span>
            Interactive Manual
          </h2>
        </div>
        
        <div className="p-6">
          {/* Tab Navigation */}
          <div className="flex space-x-1 mb-6 bg-slate-100 rounded-lg p-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 flex items-center justify-center space-x-2 px-4 py-2 rounded-md transition-all duration-200 ${
                  activeTab === tab.id
                    ? 'bg-white text-blue-600 shadow-sm'
                    : 'text-slate-600 hover:text-blue-600'
                }`}
              >
                <span>{tab.icon}</span>
                <span className="text-sm font-medium">{tab.label}</span>
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="min-h-[400px]">
            {activeTab === 'specs' && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-slate-900 mb-4">Technical Specifications</h3>
                {Object.entries(manualData.specs || {}).map(([key, value]) => (
                  <div key={key} className="flex justify-between items-center p-4 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors">
                    <span className="font-medium text-slate-700">{key}:</span>
                    <span className="text-slate-900 font-medium">{value}</span>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'troubleshooting' && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-slate-900 mb-4">Quick Troubleshooting</h3>
                {manualData.troubleshooting ? (
                  <div className="space-y-4">
                    {Object.entries(manualData.troubleshooting).map(([problem, details], index) => (
                      <div key={problem} className={`p-6 rounded-xl border-2 shadow-sm hover:shadow-md transition-all duration-200 ${
                        index % 4 === 0 ? 'bg-gradient-to-br from-red-50 to-red-100 border-red-200 hover:border-red-300' :
                        index % 4 === 1 ? 'bg-gradient-to-br from-yellow-50 to-yellow-100 border-yellow-200 hover:border-yellow-300' :
                        index % 4 === 2 ? 'bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200 hover:border-blue-300' :
                        'bg-gradient-to-br from-green-50 to-green-100 border-green-200 hover:border-green-300'
                      }`}>
                        <h4 className={`font-semibold mb-3 ${
                          index % 4 === 0 ? 'text-red-900' :
                          index % 4 === 1 ? 'text-yellow-900' :
                          index % 4 === 2 ? 'text-blue-900' :
                          'text-green-900'
                        }`}>{problem}</h4>
                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <h5 className={`text-sm font-medium mb-2 ${
                              index % 4 === 0 ? 'text-red-800' :
                              index % 4 === 1 ? 'text-yellow-800' :
                              index % 4 === 2 ? 'text-blue-800' :
                              'text-green-800'
                            }`}>Possible Causes:</h5>
                            <ul className={`text-sm space-y-1 ${
                              index % 4 === 0 ? 'text-red-700' :
                              index % 4 === 1 ? 'text-yellow-700' :
                              index % 4 === 2 ? 'text-blue-700' :
                              'text-green-700'
                            }`}>
                              {details.causes?.map((cause, i) => (
                                <li key={i} className="flex items-start">
                                  <span className="mr-2 mt-1">•</span>
                                  <span>{cause}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <h5 className={`text-sm font-medium mb-2 ${
                              index % 4 === 0 ? 'text-red-800' :
                              index % 4 === 1 ? 'text-yellow-800' :
                              index % 4 === 2 ? 'text-blue-800' :
                              'text-green-800'
                            }`}>Solutions:</h5>
                            <ul className={`text-sm space-y-1 ${
                              index % 4 === 0 ? 'text-red-700' :
                              index % 4 === 1 ? 'text-yellow-700' :
                              index % 4 === 2 ? 'text-blue-700' :
                              'text-green-700'
                            }`}>
                              {details.solutions?.map((solution, i) => (
                                <li key={i} className="flex items-start">
                                  <span className="mr-2 mt-1">•</span>
                                  <span>{solution}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <div className="text-4xl mb-4">🔧</div>
                    <p className="text-slate-600">No troubleshooting data available</p>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'maintenance' && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-slate-900 mb-4">Maintenance Schedule</h3>
                {manualData.maintenance ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {Object.entries(manualData.maintenance).map(([frequency, tasks]) => (
                      <div key={frequency} className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-xl p-4 border border-slate-200 hover:shadow-md transition-all duration-200">
                        <h4 className="font-semibold text-slate-900 mb-3 flex items-center">
                          <span className={`w-3 h-3 rounded-full mr-2 ${
                            frequency === 'Daily' ? 'bg-green-500' :
                            frequency === 'Weekly' ? 'bg-blue-500' :
                            frequency === 'Monthly' ? 'bg-yellow-500' :
                            frequency === 'Quarterly' ? 'bg-orange-500' :
                            'bg-purple-500'
                          }`}></span>
                          {frequency}
                        </h4>
                        <ul className="space-y-2">
                          {tasks.map((task, index) => (
                            <li key={index} className="text-sm text-slate-700 flex items-start">
                              <span className="text-slate-400 mr-2 mt-1">•</span>
                              <span>{task}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <div className="text-4xl mb-4">📅</div>
                    <p className="text-slate-600">No maintenance schedule available</p>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'sections' && (
              <div className="space-y-4">
                <div className="flex items-center space-x-4 mb-4">
                  <h3 className="text-lg font-semibold text-slate-900">Manual Sections</h3>
                  <div className="flex-1 max-w-md">
                    <input
                      type="text"
                      placeholder="Search sections..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {filteredSections.map((section, index) => (
                    <div key={index} className="group flex items-center p-4 bg-gradient-to-r from-slate-50 to-slate-100 rounded-xl hover:from-blue-50 hover:to-indigo-50 transition-all duration-200 border border-slate-200 hover:border-blue-300 hover:shadow-md">
                      <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 text-white rounded-lg flex items-center justify-center text-sm font-bold mr-4 group-hover:scale-110 transition-transform">
                        {index + 1}
                      </div>
                      <span className="text-sm font-medium text-slate-800 group-hover:text-blue-900 transition-colors">{section}</span>
                    </div>
                  ))}
                </div>
                {filteredSections.length === 0 && searchTerm && (
                  <div className="text-center py-8">
                    <p className="text-slate-600">No sections found matching "{searchTerm}"</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Download Button */}
      <div className="flex justify-center">
        <button
          onClick={handleDownloadPDF}
          disabled={isLoading}
          className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8 py-3 rounded-xl font-semibold transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
        >
          {isLoading ? (
            <span className="flex items-center space-x-2">
              <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
              </svg>
              <span>Downloading...</span>
            </span>
          ) : (
            <span className="flex items-center space-x-2">
              <span>📄</span>
              <span>Download PDF Manual</span>
            </span>
          )}
        </button>
      </div>
    </div>
  );
};

export default InteractiveManual;
