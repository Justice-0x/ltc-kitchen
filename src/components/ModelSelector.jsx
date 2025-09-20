import React, { useState, useEffect } from 'react';
import { getModelsByBrand, getModelById } from '../data/equipmentModels.js';

export default function ModelSelector({ brandId, onModelChange, selectedModelId = null }) {
  const [models, setModels] = useState([]);
  const [selectedModel, setSelectedModel] = useState(null);

  useEffect(() => {
    const brandModels = getModelsByBrand(brandId);
    setModels(brandModels);
    
    if (selectedModelId) {
      const model = getModelById(brandId, selectedModelId);
      setSelectedModel(model);
    } else if (brandModels.length > 0) {
      setSelectedModel(brandModels[0]);
    }
  }, [brandId, selectedModelId]);

  const handleModelChange = (modelId) => {
    const model = getModelById(brandId, modelId);
    setSelectedModel(model);
    if (onModelChange) {
      onModelChange(model);
    }
  };

  if (models.length === 0) {
    return (
      <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
        <p className="text-yellow-800">No models available for this brand.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Model Selector */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Select Model
        </label>
        <select
          value={selectedModel?.id || ''}
          onChange={(e) => handleModelChange(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {models.map((model) => (
            <option key={model.id} value={model.id}>
              {model.name} - {model.description}
            </option>
          ))}
        </select>
      </div>

      {/* Selected Model Details */}
      {selectedModel && (
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">
            {selectedModel.name} Specifications
          </h3>
          
          {/* Specifications */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            {Object.entries(selectedModel.specs || {}).map(([key, value]) => (
              <div key={key} className="flex justify-between">
                <span className="text-sm text-gray-600 capitalize">
                  {key.replace(/([A-Z])/g, ' $1').trim()}:
                </span>
                <span className="text-sm font-medium text-gray-900">{value}</span>
              </div>
            ))}
          </div>

          {/* Parts List */}
          {selectedModel.parts && selectedModel.parts.length > 0 && (
            <div>
              <h4 className="text-md font-semibold text-gray-900 mb-2">Common Parts</h4>
              <div className="space-y-2">
                {selectedModel.parts.map((part, index) => (
                  <div key={index} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                    <div>
                      <span className="text-sm font-medium text-gray-900">{part.name}</span>
                      <span className="text-xs text-gray-500 ml-2">({part.partNumber})</span>
                    </div>
                    <span className="text-sm font-semibold text-green-600">{part.price}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
