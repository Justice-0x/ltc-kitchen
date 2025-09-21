import React, { useState } from 'react';
import { getFlowchartByBrand, getFlowchartById } from '../data/troubleshootingFlowcharts.js';

export default function TroubleshootingFlowchart({ brandId, flowchartId = null }) {
  const [currentStepId, setCurrentStepId] = useState(null);
  const [readings, setReadings] = useState({});
  const [completedSteps, setCompletedSteps] = useState(new Set());
  
  const brand = getFlowchartByBrand(brandId);
  const flowchart = flowchartId ? getFlowchartById(brandId, flowchartId) : brand?.flowcharts[0];
  
  if (!brand || !flowchart) {
    return (
      <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
        <p className="text-yellow-800">No troubleshooting flowchart available for this equipment.</p>
      </div>
    );
  }

  const currentStep = flowchart.steps.find(s => s.id === currentStepId) || flowchart.steps[0];
  
  if (!currentStep) {
    return (
      <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
        <p className="text-red-800">No steps available for this flowchart.</p>
      </div>
    );
  }
  
  const handleAnswer = (answer) => {
    setCompletedSteps(prev => new Set([...prev, currentStepId]));
    
    if (answer === 'yes' && currentStep.yes) {
      setCurrentStepId(currentStep.yes);
    } else if (answer === 'no' && currentStep.no) {
      setCurrentStepId(currentStep.no);
    }
  };

  const handleReadingChange = (stepId, value) => {
    setReadings(prev => ({ ...prev, [stepId]: value }));
  };

  const resetFlowchart = () => {
    setCurrentStepId(null);
    setReadings({});
    setCompletedSteps(new Set());
  };

  const renderStep = (step) => {
    if (!step || typeof step !== 'object') {
      return (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-800">Invalid step data.</p>
        </div>
      );
    }
    
    switch (step.type) {
      case 'check':
        return (
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">{step.question}</h3>
            <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded">
              <p className="text-sm text-blue-800">
                <strong>Expected:</strong> {step.expected}
              </p>
            </div>
            <div className="flex space-x-4">
              <button
                onClick={() => handleAnswer('yes')}
                className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
              >
                Yes ✓
              </button>
              <button
                onClick={() => handleAnswer('no')}
                className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
              >
                No ✗
              </button>
            </div>
          </div>
        );

      case 'measure':
        return (
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">{step.question}</h3>
            <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded">
              <p className="text-sm text-blue-800">
                <strong>Expected:</strong> {step.expected}
              </p>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Reading {step.reading ? `(${step.reading})` : ''}:
              </label>
              <input
                type="number"
                value={readings[step.id] || ''}
                onChange={(e) => handleReadingChange(step.id, e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter reading"
              />
            </div>
            <div className="flex space-x-4">
              <button
                onClick={() => handleAnswer('yes')}
                className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
              >
                Within Range ✓
              </button>
              <button
                onClick={() => handleAnswer('no')}
                className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
              >
                Out of Range ✗
              </button>
            </div>
          </div>
        );

      case 'test':
        return (
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">{step.question}</h3>
            <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded">
              <p className="text-sm text-blue-800">
                <strong>Expected:</strong> {step.expected}
              </p>
            </div>
            <div className="flex space-x-4">
              <button
                onClick={() => handleAnswer('yes')}
                className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
              >
                Test Passed ✓
              </button>
              <button
                onClick={() => handleAnswer('no')}
                className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
              >
                Test Failed ✗
              </button>
            </div>
          </div>
        );

      case 'action':
        return (
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">{step.title}</h3>
            <div className="mb-4">
              <h4 className="text-md font-medium text-gray-700 mb-2">Actions Required:</h4>
              <ul className="list-disc pl-6 space-y-1">
                {step.actions.map((action, index) => (
                  <li key={index} className="text-gray-600">{action}</li>
                ))}
              </ul>
            </div>
            {step.parts && step.parts.length > 0 && (
              <div className="mb-4">
                <h4 className="text-md font-medium text-gray-700 mb-2">Parts Needed:</h4>
                <ul className="list-disc pl-6 space-y-1">
                  {step.parts.map((part, index) => (
                    <li key={index} className="text-gray-600">{part}</li>
                  ))}
                </ul>
              </div>
            )}
            <button
              onClick={resetFlowchart}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Start New Troubleshooting
            </button>
          </div>
        );

      case 'success':
        return (
          <div className="bg-green-50 border border-green-200 rounded-lg p-6">
            <div className="flex items-center mb-4">
              <div className="text-2xl mr-3">✅</div>
              <h3 className="text-lg font-semibold text-green-900">{step.title}</h3>
            </div>
            <p className="text-green-800 mb-4">{step.message}</p>
            <button
              onClick={resetFlowchart}
              className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
            >
              Troubleshoot Another Issue
            </button>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-gray-900">{flowchart.title}</h2>
        <button
          onClick={resetFlowchart}
          className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
        >
          Reset
        </button>
      </div>
      
      {renderStep(currentStep)}
      
      {completedSteps.size > 0 && (
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
          <h4 className="text-sm font-medium text-gray-700 mb-2">Completed Steps:</h4>
          <div className="text-xs text-gray-600">
            {Array.from(completedSteps).map(stepId => {
              const step = flowchart.steps.find(s => s.id === stepId);
              return step ? (
                <div key={stepId} className="flex items-center mb-1">
                  <span className="text-green-600 mr-2">✓</span>
                  {step.question || step.title || 'Step completed'}
                </div>
              ) : null;
            })}
          </div>
        </div>
      )}
    </div>
  );
}
