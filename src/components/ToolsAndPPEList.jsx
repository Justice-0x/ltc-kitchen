import React, { useState } from 'react';
import { toolsAndPPE, procedures, getToolsByCategory, getProcedureById } from '../data/toolsAndPPE.js';

export default function ToolsAndPPEList() {
  const [selectedCategory, setSelectedCategory] = useState('electrical');
  const [selectedProcedure, setSelectedProcedure] = useState('');
  const [showRequiredOnly, setShowRequiredOnly] = useState(false);

  const categories = Object.keys(toolsAndPPE);
  const selectedTools = getToolsByCategory(selectedCategory);
  const selectedProcedureData = getProcedureById(selectedProcedure);

  const filteredTools = selectedTools?.tools.filter(tool => 
    !showRequiredOnly || tool.required
  ) || [];

  const filteredPPE = selectedTools?.ppe.filter(item => 
    !showRequiredOnly || item.required
  ) || [];

  const generateToolList = () => {
    if (!selectedTools) return '';

    const toolsList = filteredTools.map(tool => 
      `• ${tool.name} (${tool.range}) - ${tool.required ? 'REQUIRED' : 'Optional'}`
    ).join('\n');

    const ppeList = filteredPPE.map(item => 
      `• ${item.name} - ${item.required ? 'REQUIRED' : 'Optional'}`
    ).join('\n');

    return `TOOLS & PPE CHECKLIST - ${selectedTools.name.toUpperCase()}

TOOLS:
${toolsList}

PPE:
${ppeList}

Generated: ${new Date().toLocaleString()}`;
  };

  const printToolList = () => {
    const content = generateToolList();
    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
      <html>
        <head><title>Tools & PPE Checklist</title></head>
        <body style="font-family: monospace; white-space: pre-line; padding: 20px;">
          ${content}
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.print();
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Category Selection */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Tools & PPE by Category</h2>
        
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`p-4 rounded-lg border-2 transition-colors ${
                selectedCategory === category
                  ? 'border-blue-500 bg-blue-50 text-blue-700'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="text-lg font-semibold capitalize">{category}</div>
              <div className="text-sm text-gray-600">
                {toolsAndPPE[category].tools.length} tools
              </div>
            </button>
          ))}
        </div>

        <div className="flex items-center space-x-4 mb-4">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={showRequiredOnly}
              onChange={(e) => setShowRequiredOnly(e.target.checked)}
              className="mr-2"
            />
            Show required items only
          </label>
        </div>

        {selectedTools && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Tools Section */}
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                🛠️ Tools ({filteredTools.length})
              </h3>
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {filteredTools.map((tool, index) => (
                  <div key={index} className={`p-3 rounded-lg border ${
                    tool.required ? 'border-red-200 bg-red-50' : 'border-gray-200 bg-gray-50'
                  }`}>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="font-medium text-gray-900">{tool.name}</div>
                        <div className="text-sm text-gray-600">Range: {tool.range}</div>
                        <div className="text-sm text-gray-500">{tool.description}</div>
                      </div>
                      <div className="ml-4">
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          tool.required 
                            ? 'bg-red-100 text-red-800' 
                            : 'bg-gray-100 text-gray-800'
                        }`}>
                          {tool.required ? 'Required' : 'Optional'}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* PPE Section */}
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                🦺 PPE ({filteredPPE.length})
              </h3>
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {filteredPPE.map((item, index) => (
                  <div key={index} className={`p-3 rounded-lg border ${
                    item.required ? 'border-red-200 bg-red-50' : 'border-gray-200 bg-gray-50'
                  }`}>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="font-medium text-gray-900">{item.name}</div>
                        <div className="text-sm text-gray-500">{item.description}</div>
                      </div>
                      <div className="ml-4">
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          item.required 
                            ? 'bg-red-100 text-red-800' 
                            : 'bg-gray-100 text-gray-800'
                        }`}>
                          {item.required ? 'Required' : 'Optional'}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        <div className="mt-6 flex justify-center">
          <button
            onClick={printToolList}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Print Checklist
          </button>
        </div>
      </div>

      {/* Procedure-Based Tools */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Tools by Procedure</h2>
        
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">Select Procedure</label>
          <select
            value={selectedProcedure}
            onChange={(e) => setSelectedProcedure(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Choose a procedure...</option>
            {procedures.map(procedure => (
              <option key={procedure.id} value={procedure.id}>
                {procedure.name} ({procedure.estimatedTime})
              </option>
            ))}
          </select>
        </div>

        {selectedProcedureData && (
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              {selectedProcedureData.name}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div>
                <span className="text-sm font-medium text-gray-600">Category:</span>
                <span className="ml-2 capitalize">{selectedProcedureData.category}</span>
              </div>
              <div>
                <span className="text-sm font-medium text-gray-600">Time:</span>
                <span className="ml-2">{selectedProcedureData.estimatedTime}</span>
              </div>
              <div>
                <span className="text-sm font-medium text-gray-600">Difficulty:</span>
                <span className={`ml-2 px-2 py-1 text-xs rounded-full ${
                  selectedProcedureData.difficulty === 'beginner' ? 'bg-green-100 text-green-800' :
                  selectedProcedureData.difficulty === 'intermediate' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {selectedProcedureData.difficulty}
                </span>
              </div>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Required Tools:</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  {selectedProcedureData.tools.map((tool, index) => (
                    <li key={index}>• {tool}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Required PPE:</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  {selectedProcedureData.ppe.map((item, index) => (
                    <li key={index}>• {item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Quick Reference */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Quick Reference</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="bg-blue-50 p-4 rounded-lg">
            <h3 className="font-semibold text-blue-900 mb-2">Essential Meters</h3>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• Multimeter (0-1000V)</li>
              <li>• Clamp Meter (0-1000A)</li>
              <li>• Digital Thermometer</li>
              <li>• Pressure Gauge (0-500 PSI)</li>
            </ul>
          </div>
          <div className="bg-green-50 p-4 rounded-lg">
            <h3 className="font-semibold text-green-900 mb-2">Safety First</h3>
            <ul className="text-sm text-green-800 space-y-1">
              <li>• Safety Glasses (ANSI Z87.1)</li>
              <li>• Work Gloves</li>
              <li>• Insulated Gloves (500V)</li>
              <li>• Steel Toe Boots</li>
            </ul>
          </div>
          <div className="bg-yellow-50 p-4 rounded-lg">
            <h3 className="font-semibold text-yellow-900 mb-2">Common Procedures</h3>
            <ul className="text-sm text-yellow-800 space-y-1">
              <li>• Sensor Replacement</li>
              <li>• Commissioning</li>
              <li>• Leak Detection</li>
              <li>• Pressure Testing</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
