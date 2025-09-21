import React, { useState } from 'react';
import { 
  partsCrossReference, 
  stockingPriorities, 
  qualityLevels, 
  getCrossReferenceByBrand, 
  getAllBrands, 
  searchParts 
} from '../data/partsCrossReference.js';

export default function PartsCrossReference() {
  const [selectedBrand, setSelectedBrand] = useState('hoshizaki');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [showSearchResults, setShowSearchResults] = useState(false);

  const brands = getAllBrands();
  const selectedData = getCrossReferenceByBrand(selectedBrand);

  const handleSearch = (query) => {
    setSearchQuery(query);
    if (query.trim()) {
      const results = searchParts(query);
      setSearchResults(results);
      setShowSearchResults(true);
    } else {
      setShowSearchResults(false);
    }
  };

  const getPriorityColor = (priority) => {
    const colorMap = {
      'High': 'red',
      'Medium': 'yellow', 
      'Low': 'green',
      'Critical': 'purple'
    };
    return colorMap[priority] || 'gray';
  };

  const getQualityColor = (quality) => {
    const colorMap = {
      'Premium': 'blue',
      'Standard': 'green',
      'Economy': 'yellow',
      'OEM': 'purple'
    };
    return colorMap[quality] || 'gray';
  };

  const generateStockingReport = () => {
    if (!selectedData) return;

    const report = {
      brand: selectedData.name,
      generated: new Date().toISOString(),
      parts: []
    };

    selectedData.parts.forEach(part => {
      const oemStocking = stockingPriorities['High']; // Default for OEM
      const aftermarketStocking = part.aftermarket.map(am => ({
        partNumber: am.partNumber,
        priority: am.stockingPriority,
        minQuantity: stockingPriorities[am.stockingPriority]?.minQuantity || 0
      }));

      report.parts.push({
        oemPartNumber: part.oemPartNumber,
        oemName: part.oemName,
        oemPrice: part.oemPrice,
        oemMinQuantity: oemStocking.minQuantity,
        aftermarket: aftermarketStocking
      });
    });

    const blob = new Blob([JSON.stringify(report, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `stocking-report-${selectedBrand}-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Search Section */}
      <div className="bg-white/10 dark:bg-white/10 light:bg-white/80 spooky:bg-gray-800/80 backdrop-blur-md border border-white/20 light:border-gray-200/50 spooky:border-orange-500/30 rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold text-white light:text-gray-800 spooky:text-orange-300 mb-4">Parts Cross-Reference Search</h2>
        <div className="flex gap-4">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
            placeholder="Search by part name or number..."
            className="flex-1 px-4 py-2 border border-white/20 light:border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white/10 light:bg-white text-white light:text-gray-800 placeholder-gray-300 light:placeholder-gray-500"
          />
          <button
            onClick={() => setShowSearchResults(false)}
            className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
          >
            Clear Search
          </button>
        </div>
      </div>

      {/* Search Results */}
      {showSearchResults && (
        <div className="bg-white/10 dark:bg-white/10 light:bg-white/80 spooky:bg-gray-800/80 backdrop-blur-md border border-white/20 light:border-gray-200/50 spooky:border-orange-500/30 rounded-lg shadow-lg p-6">
          <h3 className="text-xl font-semibold text-white light:text-gray-800 spooky:text-orange-300 mb-4">
            Search Results ({searchResults.length})
          </h3>
          <div className="space-y-4">
            {searchResults.map((result, index) => (
              <div key={index} className="border border-white/20 light:border-gray-200 rounded-lg p-4 bg-white/5 light:bg-white">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h4 className="font-semibold text-white light:text-gray-900">
                      {result.type === 'OEM' ? result.part.oemName : result.aftermarket.name}
                    </h4>
                    <p className="text-sm text-gray-300 light:text-gray-600">
                      {result.type === 'OEM' ? result.part.oemPartNumber : result.aftermarket.partNumber}
                    </p>
                  </div>
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    result.type === 'OEM' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'
                  }`}>
                    {result.type}
                  </span>
                </div>
                {result.type === 'Aftermarket' && (
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-300 light:text-gray-600">
                    <div>
                      <span className="font-medium text-white light:text-gray-900">Price:</span> {result.aftermarket.price}
                    </div>
                    <div>
                      <span className="font-medium text-white light:text-gray-900">Quality:</span> 
                      <span className={`ml-1 px-1 py-0.5 rounded text-xs ${
                        result.aftermarket.quality === 'Premium' ? 'bg-blue-100 text-blue-800' :
                        result.aftermarket.quality === 'Standard' ? 'bg-green-100 text-green-800' :
                        result.aftermarket.quality === 'Economy' ? 'bg-yellow-100 text-yellow-800' :
                        result.aftermarket.quality === 'OEM' ? 'bg-purple-100 text-purple-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {result.aftermarket.quality}
                      </span>
                    </div>
                    <div>
                      <span className="font-medium text-white light:text-gray-900">Compatibility:</span> {result.aftermarket.compatibility}
                    </div>
                    <div>
                      <span className="font-medium text-white light:text-gray-900">Priority:</span>
                      <span className={`ml-1 px-1 py-0.5 rounded text-xs ${
                        result.aftermarket.stockingPriority === 'High' ? 'bg-red-100 text-red-800' :
                        result.aftermarket.stockingPriority === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                        result.aftermarket.stockingPriority === 'Low' ? 'bg-green-100 text-green-800' :
                        result.aftermarket.stockingPriority === 'Critical' ? 'bg-purple-100 text-purple-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {result.aftermarket.stockingPriority}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Brand Selection */}
      <div className="bg-white/10 dark:bg-white/10 light:bg-white/80 spooky:bg-gray-800/80 backdrop-blur-md border border-white/20 light:border-gray-200/50 spooky:border-orange-500/30 rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold text-white light:text-gray-800 spooky:text-orange-300 mb-4">Parts Cross-Reference by Brand</h2>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {brands.map(brand => (
            <button
              key={brand}
              onClick={() => setSelectedBrand(brand)}
              className={`p-4 rounded-lg border-2 transition-colors ${
                selectedBrand === brand
                  ? 'border-blue-500 bg-blue-500/20 text-blue-300'
                  : 'border-white/20 hover:border-white/40 text-white light:text-gray-800'
              }`}
            >
              <div className="text-lg font-semibold capitalize">{brand}</div>
              <div className="text-sm text-gray-300 light:text-gray-600">
                {partsCrossReference[brand].parts.length} parts
              </div>
            </button>
          ))}
        </div>

        {selectedData && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-semibold text-white light:text-gray-800 spooky:text-orange-300">
                {selectedData.name} - Parts Cross-Reference
              </h3>
              <button
                onClick={generateStockingReport}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
              >
                Generate Stocking Report
              </button>
            </div>

            {selectedData.parts.map((part, index) => (
              <div key={index} className="border border-white/20 light:border-gray-200 rounded-lg p-6 bg-white/5 light:bg-white">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* OEM Part */}
                  <div className="bg-blue-500/20 light:bg-blue-50 p-4 rounded-lg">
                    <h4 className="text-lg font-semibold text-blue-300 light:text-blue-900 mb-2">OEM Part</h4>
                    <div className="space-y-2 text-white light:text-gray-800">
                      <div><span className="font-medium">Part Number:</span> {part.oemPartNumber}</div>
                      <div><span className="font-medium">Name:</span> {part.oemName}</div>
                      <div><span className="font-medium">Price:</span> {part.oemPrice}</div>
                      <div><span className="font-medium">Supplier:</span> {part.oemSupplier}</div>
                    </div>
                  </div>

                  {/* Aftermarket Parts */}
                  <div className="space-y-4">
                    <h4 className="text-lg font-semibold text-white light:text-gray-800 spooky:text-orange-300">Aftermarket Alternatives</h4>
                    {part.aftermarket.map((am, amIndex) => (
                      <div key={amIndex} className="bg-white/10 light:bg-gray-50 p-4 rounded-lg">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <div className="font-medium text-white light:text-gray-900">{am.name}</div>
                            <div className="text-sm text-gray-300 light:text-gray-600">{am.partNumber}</div>
                          </div>
                          <div className="text-right">
                            <div className="font-semibold text-green-400">{am.price}</div>
                            <div className="text-sm text-gray-300 light:text-gray-500">{am.supplier}</div>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-2 text-sm text-gray-300 light:text-gray-600">
                          <div>
                            <span className="font-medium text-white light:text-gray-900">Compatibility:</span> {am.compatibility}
                          </div>
                          <div>
                            <span className="font-medium text-white light:text-gray-900">Quality:</span>
                            <span className={`ml-1 px-1 py-0.5 rounded text-xs ${
                              am.quality === 'Premium' ? 'bg-blue-100 text-blue-800' :
                              am.quality === 'Standard' ? 'bg-green-100 text-green-800' :
                              am.quality === 'Economy' ? 'bg-yellow-100 text-yellow-800' :
                              am.quality === 'OEM' ? 'bg-purple-100 text-purple-800' :
                              'bg-gray-100 text-gray-800'
                            }`}>
                              {am.quality}
                            </span>
                          </div>
                          <div>
                            <span className="font-medium text-white light:text-gray-900">Availability:</span> {am.availability}
                          </div>
                          <div>
                            <span className="font-medium text-white light:text-gray-900">Stocking Priority:</span>
                            <span className={`ml-1 px-1 py-0.5 rounded text-xs ${
                              am.stockingPriority === 'High' ? 'bg-red-100 text-red-800' :
                              am.stockingPriority === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                              am.stockingPriority === 'Low' ? 'bg-green-100 text-green-800' :
                              am.stockingPriority === 'Critical' ? 'bg-purple-100 text-purple-800' :
                              'bg-gray-100 text-gray-800'
                            }`}>
                              {am.stockingPriority}
                            </span>
                          </div>
                        </div>
                        
                        {am.notes && (
                          <div className="mt-2 text-sm text-gray-300 light:text-gray-600">
                            <span className="font-medium text-white light:text-gray-900">Notes:</span> {am.notes}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Legend */}
      <div className="bg-white/10 dark:bg-white/10 light:bg-white/80 spooky:bg-gray-800/80 backdrop-blur-md border border-white/20 light:border-gray-200/50 spooky:border-orange-500/30 rounded-lg shadow-lg p-6">
        <h3 className="text-lg font-semibold text-white light:text-gray-800 spooky:text-orange-300 mb-4">Legend</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-medium text-white light:text-gray-900 mb-2">Stocking Priority</h4>
            <div className="space-y-1">
              <div className="flex items-center">
                <span className="w-4 h-4 rounded mr-2 bg-red-500"></span>
                <span className="text-sm text-gray-300 light:text-gray-600">High: Critical for operations</span>
              </div>
              <div className="flex items-center">
                <span className="w-4 h-4 rounded mr-2 bg-yellow-500"></span>
                <span className="text-sm text-gray-300 light:text-gray-600">Medium: Important for maintenance</span>
              </div>
              <div className="flex items-center">
                <span className="w-4 h-4 rounded mr-2 bg-green-500"></span>
                <span className="text-sm text-gray-300 light:text-gray-600">Low: Nice to have</span>
              </div>
              <div className="flex items-center">
                <span className="w-4 h-4 rounded mr-2 bg-purple-500"></span>
                <span className="text-sm text-gray-300 light:text-gray-600">Critical: Emergency replacement</span>
              </div>
            </div>
          </div>
          <div>
            <h4 className="font-medium text-white light:text-gray-900 mb-2">Quality Levels</h4>
            <div className="space-y-1">
              <div className="flex items-center">
                <span className="w-4 h-4 rounded mr-2 bg-blue-500"></span>
                <span className="text-sm text-gray-300 light:text-gray-600">Premium: Highest quality, longest lifespan</span>
              </div>
              <div className="flex items-center">
                <span className="w-4 h-4 rounded mr-2 bg-green-500"></span>
                <span className="text-sm text-gray-300 light:text-gray-600">Standard: Good quality, reliable performance</span>
              </div>
              <div className="flex items-center">
                <span className="w-4 h-4 rounded mr-2 bg-yellow-500"></span>
                <span className="text-sm text-gray-300 light:text-gray-600">Economy: Basic quality, cost-effective</span>
              </div>
              <div className="flex items-center">
                <span className="w-4 h-4 rounded mr-2 bg-purple-500"></span>
                <span className="text-sm text-gray-300 light:text-gray-600">OEM: Original equipment manufacturer</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
